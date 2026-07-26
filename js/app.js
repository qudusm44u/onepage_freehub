/* =====================================================================
   ÉCLAT LONDON — front-end behaviour
   Vanilla JS, no dependencies. Handles: announcement rotation, sticky/
   transparent nav, mobile menu, scroll reveal, wishlist, and a fully
   client-side cart (persisted to localStorage).
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const money = (n) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 0 });

  /* ---------------------------------------------------------------
     1. Image fallback — mark art-directed placeholders that failed
     --------------------------------------------------------------- */
  $$(".ph img").forEach((img) => {
    const done = () => { if (!img.complete || img.naturalWidth === 0) img.closest(".ph")?.classList.add("ph--fail"); };
    img.addEventListener("error", () => img.closest(".ph")?.classList.add("ph--fail"));
    if (img.complete) done();
    else img.addEventListener("load", () => {});
  });

  /* ---------------------------------------------------------------
     2. Announcement bar rotation
     --------------------------------------------------------------- */
  const aItems = $$(".announce__item");
  if (aItems.length > 1) {
    let ai = 0;
    setInterval(() => {
      aItems[ai].classList.remove("is-active");
      ai = (ai + 1) % aItems.length;
      aItems[ai].classList.add("is-active");
    }, 4200);
  }

  /* ---------------------------------------------------------------
     3. Header: transparent over hero -> solid on scroll
     --------------------------------------------------------------- */
  const header = $(".site-header");
  const hero = $("[data-hero]");
  const setHeader = () => {
    if (!header) return;
    if (hero) {
      const past = window.scrollY > hero.offsetHeight - 120;
      header.classList.toggle("is-transparent", !past);
      header.classList.toggle("is-solid", past);
    } else {
      header.classList.add("is-solid");
    }
    $(".to-top")?.classList.toggle("is-visible", window.scrollY > 700);
  };
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  /* ---------------------------------------------------------------
     4. Mobile menu
     --------------------------------------------------------------- */
  const mMenu = $(".mobile-menu");
  const overlay = $(".overlay");
  const openMenu  = () => { mMenu?.classList.add("is-open");  overlay?.classList.add("is-open"); document.body.style.overflow = "hidden"; };
  const closeAll  = () => {
    mMenu?.classList.remove("is-open");
    $(".drawer")?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  $(".nav__toggle")?.addEventListener("click", openMenu);
  $(".mobile-menu__close")?.addEventListener("click", closeAll);
  overlay?.addEventListener("click", closeAll);
  $$(".mobile-menu__links a").forEach((a) => a.addEventListener("click", closeAll));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* ---------------------------------------------------------------
     5. Scroll reveal
     --------------------------------------------------------------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" })
    : null;
  $$(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("is-in"));

  /* ---------------------------------------------------------------
     6. Wishlist toggles
     --------------------------------------------------------------- */
  $$(".card__wish").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault(); b.classList.toggle("is-active");
    if (b.classList.contains("is-active")) toast("Saved to wishlist");
  }));

  /* ---------------------------------------------------------------
     7. Cart — the dynamic heart of the storefront
     --------------------------------------------------------------- */
  const KEY = "eclat.cart.v1";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (_) {} };

  const drawer   = $(".drawer");
  const drawerBody = $(".drawer__body");
  const subEl    = $("[data-subtotal]");
  const countEls = $$(".cart-count");

  const openCart  = () => { drawer?.classList.add("is-open"); overlay?.classList.add("is-open"); document.body.style.overflow = "hidden"; };
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); render(); openCart(); }));
  $(".drawer__close")?.addEventListener("click", closeAll);

  function add(p) {
    const found = cart.find((i) => i.id === p.id && i.variant === p.variant);
    if (found) found.qty += 1;
    else cart.push({ ...p, qty: 1 });
    save(); render(); openCart(); toast(p.name + " added");
  }
  function setQty(idx, d) {
    cart[idx].qty += d;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    save(); render();
  }
  function remove(idx) { cart.splice(idx, 1); save(); render(); }

  function render() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const sub   = cart.reduce((s, i) => s + i.price * i.qty, 0);
    countEls.forEach((el) => { el.textContent = count; el.classList.toggle("is-visible", count > 0); });
    if (subEl) subEl.textContent = money(sub);

    if (!drawerBody) return;
    if (!cart.length) {
      drawerBody.innerHTML =
        '<div class="drawer__empty"><p class="display">Your bag is empty</p>' +
        '<p>Discreet luxury awaits. Explore the new season.</p>' +
        '<p style="margin-top:1.4rem"><a class="link-underline" href="collection.html">Shop the collection</a></p></div>';
      $(".drawer__foot")?.style.setProperty("display", "none");
      return;
    }
    $(".drawer__foot")?.style.setProperty("display", "block");
    drawerBody.innerHTML = cart.map((i, idx) => `
      <div class="line-item">
        <div class="line-item__media"><div class="ph" style="--g1:${i.g1||'#c9bba7'};--g2:${i.g2||'#8d8272'}" data-label="${i.name}">
          ${i.img ? `<img src="${i.img}" alt="${i.name}" loading="lazy">` : ""}
        </div></div>
        <div>
          <div class="line-item__name">${i.name}</div>
          <div class="line-item__variant">${i.variant || "One size"}</div>
          <div class="qty">
            <button data-dec="${idx}" aria-label="Decrease">–</button>
            <span>${i.qty}</span>
            <button data-inc="${idx}" aria-label="Increase">+</button>
          </div>
        </div>
        <div>
          <div class="line-item__price">${money(i.price * i.qty)}</div>
          <button class="line-item__remove" data-rm="${idx}">Remove</button>
        </div>
      </div>`).join("");

    // re-bind image fallback for freshly injected nodes
    $$(".line-item .ph img", drawerBody).forEach((img) => {
      if (img.complete && img.naturalWidth === 0) img.closest(".ph").classList.add("ph--fail");
      img.addEventListener("error", () => img.closest(".ph").classList.add("ph--fail"));
    });
    $$("[data-inc]", drawerBody).forEach((b) => b.onclick = () => setQty(+b.dataset.inc, +1));
    $$("[data-dec]", drawerBody).forEach((b) => b.onclick = () => setQty(+b.dataset.dec, -1));
    $$("[data-rm]",  drawerBody).forEach((b) => b.onclick = () => remove(+b.dataset.rm));
  }

  // Add-to-bag buttons read product data from the closest [data-product]
  $$("[data-add]").forEach((btn) => btn.addEventListener("click", (e) => {
    e.preventDefault();
    const el = btn.closest("[data-product]") || btn;
    add({
      id:      el.dataset.id || el.dataset.product,
      name:    el.dataset.name,
      price:   parseFloat(el.dataset.price) || 0,
      variant: el.dataset.variant || "One size",
      img:     el.dataset.img || "",
      g1:      el.dataset.g1 || "",
      g2:      el.dataset.g2 || "",
    });
  }));

  $("[data-checkout]")?.addEventListener("click", () =>
    toast("Demo checkout — connect a payment provider to go live"));

  render();

  /* ---------------------------------------------------------------
     8. Collection filtering (collection.html)
     --------------------------------------------------------------- */
  const chips = $$(".chip[data-filter]");
  if (chips.length) {
    const items = $$("[data-cat]");
    const countEl = $("[data-results]");
    const apply = (f) => {
      let shown = 0;
      items.forEach((it) => {
        const ok = f === "all" || it.dataset.cat.split(" ").includes(f);
        it.style.display = ok ? "" : "none";
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? " Piece" : " Pieces");
    };
    chips.forEach((c) => c.addEventListener("click", () => {
      chips.forEach((x) => x.classList.remove("is-active"));
      c.classList.add("is-active");
      apply(c.dataset.filter);
    }));
  }

  /* ---------------------------------------------------------------
     9. Newsletter (client-side validation only)
     --------------------------------------------------------------- */
  $(".news__form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $(".news__form input");
    const msg = $(".news__msg");
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value.trim());
    if (msg) msg.textContent = ok ? "Merci — welcome to the maison." : "Please enter a valid email address.";
    if (ok) input.value = "";
  });

  /* ---------------------------------------------------------------
     10. Toast helper
     --------------------------------------------------------------- */
  let toastTimer;
  function toast(text) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = text;
    requestAnimationFrame(() => t.classList.add("is-open"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-open"), 2600);
  }
})();
