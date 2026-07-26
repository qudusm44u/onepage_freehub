# Media & licensing

## The hero — Canary Wharf

The hero background is a **hand-built SVG/CSS skyline** authored for this project.
It is fully original and copyright-free, renders instantly, and needs no network.

A real **aerial/drone photo** of Canary Wharf layers on top (`<img class="hero__photo">`)
and takes over when it loads. If it fails, the SVG skyline shows — so the hero is
never broken.

### Free, commercial-use Canary Wharf photos (Unsplash License)
No attribution required, free for commercial use:

- https://unsplash.com/photos/canary-wharf-with-tall-buildings-XwHr1F89Pb0
- https://unsplash.com/photos/RASkhp-x3wA  (Tom Juggins)
- https://unsplash.com/photos/6G1AGm8NXBg  (night skyline over water)
- https://unsplash.com/photos/O-J600qm45U  (daytime skyline)
- Full collection: https://unsplash.com/s/photos/canary-wharf-aerial

**To use one:** open the page → **Download** → then either
1. **Self-host (recommended):** save it into an `assets/` folder and set
   `src="assets/hero.jpg"`. This removes the third-party dependency, guarantees
   it loads, and lets Cloudflare optimise/cache it; or
2. Copy the resulting `images.unsplash.com/photo-…` CDN URL into the `src`.

Other equally-free sources: **Pexels** (pexels.com) and **Pixabay** (pixabay.com)
— same "free for commercial use, no attribution" terms.

> Why not baked-in already? This project's build sandbox blocks image CDNs, so a
> specific Unsplash CDN URL couldn't be verified here. The placeholder `src` in
> `index.html` points at an Unsplash London aerial; swap it for your chosen shot
> above. Real visitors on Cloudflare are not affected by the sandbox limitation.

## Fonts — Google Fonts
- **Cormorant Garamond** (display serif) + **Jost** (UI sans).
- SIL Open Font License, free for commercial use. Loaded from `fonts.googleapis.com`.
- For best privacy/performance, self-host them and drop the `fonts.*` entries
  from the `_headers` CSP.

## Icons & illustrations
All icons (features, security, social, dashboard) and the skyline are inline,
hand-written SVG. No icon library, no license concerns.

## Placeholder content
Brand name, copy, statistics, the 4.10% AER rate, pricing and testimonials are
**fictional placeholders**. Replace them — and never present the compliance
badges (FCA, PCI DSS, etc.) as real until they genuinely apply to your entity.
