# ÉCLAT LONDON — luxury fashion storefront

A hand-built, quiet-luxury fashion storefront in the spirit of high-end British
labels (Candy London, Toteme, The Row). Pure static front-end — HTML, CSS and
vanilla JavaScript, **no build step, no framework, no dependencies** — designed
to be hosted on **Cloudflare Pages**.

> The brand name "Éclat London" is fictional and original. It is *inspired by*
> the aesthetic of luxury fashion sites, not a copy of any real brand's name,
> logo, or content — so you can use it freely or rename it to your own label.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, new-season grid, atelier story, lookbook, categories, press, Instagram, newsletter |
| `collection.html` | Ready-to-wear grid with **live category filtering** |
| `about.html` | The Atelier / brand story |
| `styles.css` | Complete design system (tokens, components, responsive, reduced-motion) |
| `js/app.js` | All interactivity (see below) |
| `_headers`, `_redirects` | Cloudflare Pages config (security headers, caching, redirects) |
| `robots.txt`, `sitemap.xml` | SEO |
| `MEDIA.md` | Image sources & licensing |

## The "dynamic" bits (client-side)

- **Shopping bag** — add to bag, change quantity, remove, live subtotal, **persisted to `localStorage`** so it survives a refresh. Slide-out drawer.
- **Live collection filtering** by category, with a running item count.
- Transparent-over-hero navigation that turns solid on scroll.
- Rotating announcement bar, scroll-reveal animations, wishlist toggles, mobile menu, newsletter validation, toast notifications, back-to-top.
- **Graceful image fallback**: every photo sits over a hand-designed, art-directed gradient panel with film-grain. If an image ever fails to load, the section still looks intentional — it never shows a broken-image icon.

## Deploy to Cloudflare Pages

**Option A — Git (recommended):**
1. Push this repo to GitHub (already done on your branch).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. Build settings: **Framework preset: None**, **Build command: (leave empty)**, **Output directory: `/`**.
4. Deploy. You get a `*.pages.dev` URL in ~30s. Add your custom domain under **Custom domains**.

**Option B — Wrangler CLI:**
```bash
npm install -g wrangler
wrangler pages deploy . --project-name=eclat-london
```

**Option C — Drag & drop:** zip the folder and drop it into Pages → Upload assets.

No build is required because this is plain static HTML/CSS/JS.

## Swapping in your own photos

Every image is a normal `<img>` inside a `.ph` placeholder. To use your own:
1. Drop files into an `assets/` folder and change the `src` (best for performance and to remove the external dependency — see limitations).
2. Or replace the Unsplash URLs. See `MEDIA.md` for the licensing details.
The gradient fallback colours are set with `--g1` / `--g2` (and `data-g1`/`data-g2` on product cards for the cart thumbnail).

## Limitations — read this

See the "Limitations & honest caveats" section below and in the chat summary.
Short version: this is a **front-end**. The cart and checkout are demo-only —
taking real payments needs a commerce backend (Shopify/Stripe or Cloudflare
Workers). Images are currently hotlinked from Unsplash; host them yourself for
production. The copy, prices and "press" quotes are placeholder content.
