# Worthwhile — prime London property & investment site

A premium, quiet-luxury marketing site for **Worthwhile**, a (fictional) prime
London property & investment house in Canary Wharf. Cinematic, image-led, in the
spirit of high-end property brands. Pure static front-end — HTML, CSS and vanilla
JavaScript, **no build step, no framework, no dependencies** — designed to be
hosted on **Cloudflare Pages**.

> "Worthwhile" is a fictional, original brand created for this project. It is
> not a real company. Rename it and replace all figures, credentials, imagery
> and claims with your own before going live.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Landing — Canary Wharf drone hero, featured residences, stats, services, featured development, portfolio grid, **investment calculator**, locations, assurances, testimonials, enquiry form |
| `investment.html` | Investment approach + calculator + **ways to invest** |
| `about.html` | About, values, **track record & assurances**, contact |
| `styles.css` | Complete design system + property components |
| `js/app.js` | All interactivity (below) |
| `js/theme.js` | Tiny early script that applies the saved dark/light theme with no flash |
| `js/lenis.min.js` | Self-hosted smooth-scroll library (vendored, CSP-safe) |
| `_headers`, `_redirects` | Cloudflare config (security headers, CSP, caching, clean URLs) |
| `robots.txt`, `sitemap.xml` | SEO |
| `MEDIA.md` | Image sources, licensing, and the Canary Wharf photo links |

## Interactive / "stand-out" pieces

- **Cinematic Canary Wharf drone hero** — a real aerial photo with a slow **Ken Burns** drift; behind it sits a hand-built **SVG/CSS Canary Wharf skyline** (One Canada Square + towers, lit windows) that shows instantly and is the fallback if any photo fails, so the hero is never broken.
- **Moving pictures throughout** — hover-zoom on residence and portfolio images, parallax on the featured development, clip-path "uncover" reveals, momentum smooth-scroll (Lenis).
- **Dark / light mode** — a toggle in the nav, remembered per visitor (and it follows the visitor's system preference on first visit).
- **Working enquiry + newsletter forms** — submit real leads once you connect a form service (see "Turn on the forms" below).
- **Animated stat counters** (£2.4bn, 1,200+, 8.5%, 14) that count up when scrolled into view.
- **Live investment calculator** — drag the amount/holding-period sliders, watch the projected value compound instantly.
- Scroll reveals, rotating announcement bar, credentials marquee, mobile menu and back-to-top.
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

The enquiry ("Request a consultation") and newsletter forms currently run in
**demo mode** (they show a message but don't send anywhere). To receive real
submissions by email:

1. Go to **https://formspree.io** and sign up (free plan is fine).
2. Create a new form. It gives you an endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Open **`js/app.js`**, find this line near the top of section 9:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/XXXXXXXX";
   ```
   Replace `XXXXXXXX` with your form's ID (keep the quotes). Save.
4. Deploy again. Done — every enquiry and newsletter submission now lands in
   your inbox.

(Prefer **Tally** or another tool? Any service that accepts a form POST works —
just paste its endpoint on the same line.)

## Imagery

Property photos are hotlinked from **Unsplash** (free, commercial use, no
attribution). Each photo sits over a navy fallback panel, and the hero also has
the built-in SVG skyline, so nothing ever looks broken if an image doesn't load.
For production, download the photos into an `assets/` folder and self-host them
(faster, no third-party dependency, and Cloudflare can optimise them). Swap any
image by editing its `src` in the HTML. See `MEDIA.md` for sources and the
Canary Wharf photo links.

## Limitations — read this

- **This is a marketing front-end, not a real estate agency.** There's no CRM,
  listings database, viewings scheduler or payments — the enquiry form and
  sliders are demonstrations. Wire the form to your inbox (above) or a CRM.
- **All content is placeholder** — brand, copy, prices, stats, testimonials and
  the 8.5% growth figure are invented. The footer carries a disclaimer; replace
  everything before any public/commercial use, and don't present the credentials
  (RICS, etc.) or returns as real until they genuinely apply.
- **Property photos are hotlinked from Unsplash** until you self-host them.
- **Forms are demo-only until you connect Formspree** (see above).
- A leftover `mortgage.html` from the original project remains in the repo,
  unlinked. Delete it if you don't want it deployed.
