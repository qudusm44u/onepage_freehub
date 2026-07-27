# Media & licensing

## Photography — AI-generated (Higgsfield)

All property photography on the home page is **AI-generated** with Higgsfield
(`soul_2` model) specifically for this project: a Canary Wharf aerial at dusk,
luxury interiors (penthouse, Mayfair, Knightsbridge, City duplex) and exteriors
(a Canary Wharf tower and a riverside development).

**Why AI:** it sidesteps stock-photo licensing entirely and lets us art-direct
every shot to the brand. AI-generated images are generally cleared for
commercial use — confirm the terms of the tool/plan you generated on. For the
strictest commercial-safety guarantee, **Adobe Firefly** (trained only on
licensed/public-domain content) is the safest generator.

### How they're served (important)
The images are **hotlinked** from Higgsfield's CDN (CloudFront):
`https://d8j0ntlcm91z4.cloudfront.net/...`. This is allowed in the site's CSP
(`img-src`). Two things to know:

1. They load fine for real visitors, and every image sits over a **navy
   fallback panel** (plus the hero has the built-in SVG skyline), so nothing
   ever looks broken if an image doesn't load.
2. For long-term robustness you should **self-host** them: download each image
   from your Higgsfield gallery, drop the files into an `assets/` folder in the
   repo (GitHub web UI → *Add file → Upload files*), and change each `src` to
   `assets/….webp`. Then tighten the CSP `img-src` back to `'self'`. This
   removes the third-party dependency and lets Cloudflare cache/optimise them.

### The hero skyline (always-on fallback)
Behind the hero photo is a **hand-built SVG/CSS Canary Wharf skyline** — fully
original, copyright-free, and instant. It is the permanent fallback, so the hero
is never broken.

## Free stock alternatives (if you prefer real photos)
Free for commercial use, no attribution: **Unsplash** (unsplash.com), **Pexels**
(pexels.com), **Pixabay** (pixabay.com). Canary Wharf examples on Unsplash:
- https://unsplash.com/photos/canary-wharf-with-tall-buildings-XwHr1F89Pb0
- https://unsplash.com/s/photos/canary-wharf-aerial

## Fonts — Google Fonts
**Cormorant Garamond** + **Jost** — SIL Open Font License, free for commercial
use, loaded from `fonts.googleapis.com`. Self-host for best privacy/performance.

## Icons & skyline
All icons and the hero skyline are inline, hand-written SVG. No library, no
license concerns.

## Placeholder content
Brand name, copy, prices, statistics, testimonials and the 8.5% growth figure
are fictional placeholders. Replace them — and the RICS/credential claims —
before any public use.
