# Worthwhile — fintech marketing site

A premium, quiet-luxury marketing site for **Worthwhile**, a (fictional) modern
financial platform headquartered in Canary Wharf, London. Pure static
front-end — HTML, CSS and vanilla JavaScript, **no build step, no framework,
no dependencies** — designed to be hosted on **Cloudflare Pages**.

> "Worthwhile" is a fictional, original brand created for this project. It is
> not a real financial institution. Rename it and replace all figures/claims
> with your own before going live.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Landing — Canary Wharf hero, FX ticker, trust bar, animated stats, feature grid, product dashboard mock, **live treasury calculator**, security, steps, testimonials, CTA |
| `platform.html` | Platform capabilities + calculator + **pricing plans** |
| `company.html` | About, values, **security & compliance**, careers |
| `styles.css` | Complete design system + fintech components |
| `js/app.js` | All interactivity (below) |
| `js/theme.js` | Tiny early script that applies the saved dark/light theme with no flash |
| `js/lenis.min.js` | Self-hosted smooth-scroll library (vendored, CSP-safe) |
| `_headers`, `_redirects` | Cloudflare config (security headers, CSP, caching, clean URLs) |
| `robots.txt`, `sitemap.xml` | SEO |
| `MEDIA.md` | Image sources, licensing, and the Canary Wharf photo links |

## Interactive / "stand-out" pieces

- **Self-contained Canary Wharf skyline** — a hand-built SVG/CSS dusk skyline (One Canada Square + towers, lit windows, water reflection) used on every hero. It renders instantly, is 100% copyright-free, and needs **zero network** — there are no external images anywhere on the site.
- **Dark / light mode** — a toggle in the nav, remembered per visitor (and it follows the visitor's system preference on first visit).
- **Working sign-up forms** — the "Open account" and newsletter forms submit real leads once you connect a form service (see "Turn on the forms" below).
- **Animated stat counters** that count up when scrolled into view (£4.2B, 180+, 99.99%, 12,000+).
- **Product dashboard mock** — a fake Worthwhile treasury UI (balance, sparkline, transactions, a floating "payment sent" chip) built purely in HTML/CSS.
- **Live treasury calculator** — drag the balance/term sliders, watch the projected interest recalculate instantly.
- **Momentum smooth-scroll (Lenis)** + parallax, an **FX ticker**, scroll reveals, rotating announcement bar, mobile menu and back-to-top.
- Fully respects `prefers-reduced-motion` and degrades gracefully with JS off.

## Deploy to Cloudflare Pages

**Option A — Git (recommended):**
1. Push this repo to GitHub (already done on your branch).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings: **Framework preset: None**, **Build command: (leave empty)**, **Build output directory: `/`**.
4. **Deploy.** You get a `*.pages.dev` URL in ~30s. Add your domain under **Custom domains**.

**Option B — Wrangler CLI:**
```bash
npm install -g wrangler
wrangler pages deploy . --project-name=worthwhile
```

**Option C — Drag & drop:** Pages → *Upload assets* → drop the folder.

No build is required — this is plain static HTML/CSS/JS. After deploying,
turn on Cloudflare **Speed → Optimization** (Auto Minify, Brotli) and, if you
self-host images, **Polish/Image Resizing**.

## Turn on the forms (≈ 5 minutes, no coding)

The "Open account" and newsletter forms currently run in **demo mode** (they
show a message but don't send anywhere). To receive real submissions by email:

1. Go to **https://formspree.io** and sign up (free plan is fine).
2. Create a new form. It gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Open **`js/app.js`**, find this line near the top of section 9:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/XXXXXXXX";
   ```
   Replace `XXXXXXXX` with your form's ID (keep the quotes). Save.
4. Deploy again. Done — every "Open account" and newsletter submission now
   lands in your inbox.

(Prefer **Tally** or another tool? Any service that accepts a form POST works —
just paste its endpoint on the same line.)

## Want a real Canary Wharf photo instead of the skyline?

The skyline is permanent and needs nothing. If you'd rather use a real aerial
later, save a free photo into an `assets/` folder and set an `<img>` as the hero
background — free, no-attribution Canary Wharf photos are listed in `MEDIA.md`.

## Limitations — read this

- **This is a marketing front-end, not a bank.** There's no real onboarding,
  KYC, ledger, or payments engine. "Open account", "Log in" and the sliders are
  demonstrations. A real product needs a backend (your own, or a BaaS provider)
  and regulatory authorisation.
- **All content is placeholder** — brand, copy, stats, rates, testimonials and
  the 4.10% AER figure are invented. The footer carries a disclaimer to that
  effect; replace everything before any public/commercial use. Do not present
  fictional regulatory claims (FCA, PCI DSS, etc.) as real.
- **Forms are demo-only until you connect Formspree** (see above).
- A leftover `mortgage.html` from the original project remains in the repo,
  unlinked. Delete it if you don't want it deployed.
