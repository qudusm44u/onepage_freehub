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

  // Smooth-scroll instance (assigned in section 11) + motion preference
  let lenis = null;
  const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lockScroll   = () => { lenis ? lenis.stop()  : (document.body.style.overflow = "hidden"); };
  const unlockScroll = () => { lenis ? lenis.start() : (document.body.style.overflow = ""); };

  /* ---------------------------------------------------------------
     1. Image fallback — mark art-directed placeholders that failed
     --------------------------------------------------------------- */
  $$(".ph img").forEach((img) => {
    const done = () => { if (!img.complete || img.naturalWidth === 0) img.closest(".ph")?.classList.add("ph--fail"); };
    img.addEventListener("error", () => img.closest(".ph")?.classList.add("ph--fail"));
    if (img.complete) done();
    else img.addEventListener("load", () => {});
  });

  // Hero aerial photo: if it fails to load, reveal the self-contained skyline behind it
  const heroPhoto = $(".hero__photo");
  if (heroPhoto) {
    const hide = () => { heroPhoto.style.display = "none"; };
    heroPhoto.addEventListener("error", hide);
    if (heroPhoto.complete && heroPhoto.naturalWidth === 0) hide();
  }

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
  const openMenu  = () => { mMenu?.classList.add("is-open");  overlay?.classList.add("is-open"); lockScroll(); };
  const closeAll  = () => {
    mMenu?.classList.remove("is-open");
    $(".drawer")?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
    unlockScroll();
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

  const openCart  = () => { drawer?.classList.add("is-open"); overlay?.classList.add("is-open"); lockScroll(); };
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
     9. Forms — newsletter + "open account" lead capture
     -------------------------------------------------------------------
     To collect real submissions, create a free form at https://formspree.io
     (or Tally), then paste your endpoint below, e.g.
       const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
     Until you do, the forms run in friendly demo mode.
     --------------------------------------------------------------- */
  const FORM_ENDPOINT = "https://formspree.io/f/mykrleke"; // ← replace XXXXXXXX with your Formspree form ID
  const FORM_LIVE = !/XXXXXXXX/.test(FORM_ENDPOINT);
  const emailOk = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((v || "").trim());

  function wireForm(form, msgEl, successText) {
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email && !emailOk(email.value)) { if (msgEl) msgEl.textContent = "Please enter a valid email address."; return; }
      if (!FORM_LIVE) {
        if (msgEl) msgEl.textContent = "Demo mode — add your form ID (see README) to collect this.";
        form.reset(); return;
      }
      if (msgEl) msgEl.textContent = "Sending…";
      try {
        const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (msgEl) msgEl.textContent = res.ok ? successText : "Something went wrong — please try again.";
        if (res.ok) form.reset();
      } catch (_) {
        if (msgEl) msgEl.textContent = "Network error — please try again.";
      }
    });
  }
  wireForm($(".news__form"), $(".news__msg"), "Thank you — you're subscribed.");
  wireForm($("[data-lead]"), $("[data-lead-msg]"), "Thank you — we'll be in touch shortly.");

  /* Theme toggle (light / dark) */
  const root = document.documentElement;
  $$(".theme-toggle").forEach((btn) => btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("ww.theme", next); } catch (_) {}
  }));

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

  /* ---------------------------------------------------------------
     10b. Animated stat counters
     --------------------------------------------------------------- */
  const counters = $$("[data-count]");
  function animateCount(el) {
    const target  = parseFloat(el.dataset.count);
    const dec     = parseInt(el.dataset.decimals || "0", 10);
    const suffix  = el.dataset.suffix || "";
    const fmt = (n) => dec > 0 ? n.toFixed(dec) : Math.round(n).toLocaleString("en-GB");
    if (REDUCE) { el.textContent = fmt(target) + suffix; return; }
    const dur = 1600, start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target) + suffix;
    };
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { cio.unobserve(en.target); animateCount(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------------------------------------------------------------
     10c. Treasury yield calculator
     --------------------------------------------------------------- */
  const calcBal = $("#calcBalance"), calcTerm = $("#calcTerm");
  if (calcBal && calcTerm) {
    const RATE = 0.085; // 8.5% target annual growth (placeholder)
    const balOut  = $("[data-calc-balance]");
    const termOut = $("[data-calc-term]");
    const earnOut = $("[data-calc-earn]");   // projected value
    const subOut  = $("[data-calc-sub]");
    const gbp = (n) => Math.round(n).toLocaleString("en-GB");
    const years = (y) => y + (y === 1 ? " year" : " years");
    const runCalc = () => {
      const bal = +calcBal.value, term = +calcTerm.value;
      const value = bal * Math.pow(1 + RATE, term);   // compound growth
      const gain = value - bal;
      if (balOut)  balOut.textContent  = "£" + gbp(bal);
      if (termOut) termOut.textContent = years(term);
      if (earnOut) earnOut.textContent = gbp(value);
      if (subOut)  subOut.textContent  = `a gain of £${gbp(gain)} over ${years(term)}`;
    };
    calcBal.addEventListener("input", runCalc);
    calcTerm.addEventListener("input", runCalc);
    runCalc();
  }

  /* ---------------------------------------------------------------
     11. Smooth momentum scroll (Lenis) + parallax
     This is what gives the site its weighted, "designer" motion.
     --------------------------------------------------------------- */
  const parallaxEls = $$("[data-parallax]");
  function updateParallax() {
    if (!parallaxEls.length) return;
    const vh = window.innerHeight;
    for (const el of parallaxEls) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;      // skip off-screen
      const centre = box.top + box.height / 2 - vh / 2;           // distance from viewport centre
      const speed = parseFloat(el.dataset.parallax) || 0.08;
      el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(2)}px, 0) scale(1.22)`;
    }
  }

  const canSmooth = !REDUCE && typeof window.Lenis === "function" && window.innerWidth > 768;
  if (canSmooth) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo — long, weighted glide
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    lenis.on("scroll", () => { setHeader(); updateParallax(); });
  } else {
    // No smooth scroll — still drive parallax (unless reduced motion) from native scroll
    if (!REDUCE) window.addEventListener("scroll", updateParallax, { passive: true });
  }
  window.addEventListener("resize", updateParallax, { passive: true });
  if (!REDUCE) updateParallax();

  /* Smooth-scroll anchor links (nav, scroll cue, "view the lookbook") */
  $$('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    a.addEventListener("click", (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeAll();
      if (lenis) lenis.scrollTo(target, { offset: -74, duration: 1.4 });
      else target.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" });
    });
  });
})();
