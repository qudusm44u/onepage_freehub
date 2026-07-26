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
| `js/lenis.min.js` | Self-hosted smooth-scroll library (vendored, CSP-safe) |
| `_headers`, `_redirects` | Cloudflare config (security headers, CSP, caching, clean URLs) |
| `robots.txt`, `sitemap.xml` | SEO |
| `MEDIA.md` | Image sources, licensing, and the Canary Wharf photo links |

## Interactive / "stand-out" pieces

- **Self-contained Canary Wharf skyline** — a hand-built SVG/CSS dusk skyline (One Canada Square + towers, lit windows, water reflection). It renders instantly, is 100% copyright-free, and needs zero network. A real aerial photo layers on top and takes over when it loads; if the photo ever fails, the skyline is the fallback — so the hero is **never** broken.
- **Animated stat counters** that count up when scrolled into view (£4.2B, 180+, 99.99%, 12,000+).
- **Product dashboard mock** — a fake Worthwhile treasury UI (balance, sparkline, transactions, a floating "payment sent" toast) built purely in HTML/CSS.
- **Live treasury calculator** — drag the balance/term sliders, watch the projected interest recalculate instantly.
- **Momentum smooth-scroll (Lenis)** + parallax on the hero, plus an **FX ticker**, scroll reveals, rotating announcement bar, mobile menu, newsletter validation and back-to-top.
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

## Getting your Canary Wharf drone photo in

The hero already works without any photo (the SVG skyline). To drop in a real
aerial, edit the `src` of `<img class="hero__photo" …>` in `index.html`. Free,
commercial-use, no-attribution Canary Wharf photos (Unsplash License):

- https://unsplash.com/photos/canary-wharf-with-tall-buildings-XwHr1F89Pb0
- https://unsplash.com/photos/RASkhp-x3wA
- https://unsplash.com/photos/6G1AGm8NXBg  (night, over water)
- https://unsplash.com/s/photos/canary-wharf-aerial  (full collection)

On the photo page click **Download**, then either host the file yourself in an
`assets/` folder (best — see `MEDIA.md`) or copy its `images.unsplash.com/…`
URL into the `src`. See `MEDIA.md` for the full rationale.

## Limitations — read this

- **This is a marketing front-end, not a bank.** There's no real onboarding,
  KYC, ledger, or payments engine. "Open an account", "Log in" and the sliders
  are demonstrations. A real product needs a backend (your own, or a BaaS
  provider) and regulatory authorisation.
- **All content is placeholder** — brand, copy, stats, rates, testimonials and
  the 4.10% AER figure are invented. The footer carries a disclaimer to that
  effect; replace everything before any public/commercial use. Do not present
  fictional regulatory claims (FCA, PCI DSS, etc.) as real.
- **The hero photo is hotlinked from Unsplash** until you self-host it. Your
  build sandbox may block image CDNs, but real visitors on Cloudflare load them
  fine; the skyline fallback covers any failure.
- A leftover `mortgage.html` from the original project remains in the repo,
  unlinked. Delete it if you don't want it deployed.
