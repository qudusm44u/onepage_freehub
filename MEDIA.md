# Media & licensing

## Photography — Unsplash

All photographs are referenced from **Unsplash** (`images.unsplash.com`).

**Unsplash License** (https://unsplash.com/license) — free to use, including
**commercially**, **no attribution required**, no permission needed. You may not
sell unmodified copies or build a competing stock-photo service, but using them
on your storefront is fully allowed. This is one of the most permissive free
licenses available, which is why it's used here for "copyright-free" imagery.

Other equally-safe free sources you can mix in: **Pexels** (pexels.com) and
**Pixabay** (pixabay.com) — same "free for commercial use, no attribution"
terms. **Wikimedia Commons** has public-domain (CC0) imagery too.

### Important production note
The images are currently **hotlinked** directly from Unsplash's CDN. That's fine
for a demo and loads fast for visitors, but for a real luxury brand you should:

1. **Download the photos** you want and commit them to an `assets/` folder, then
   point each `<img src>` at the local file. This removes the third-party
   dependency, guarantees the images never disappear, and lets Cloudflare cache
   and optimise them (enable **Polish** / **Image Resizing** in the dashboard).
2. Even better for a genuine $40k-tier site: commission or shoot **original
   editorial photography**. Stock imagery — however good — is the single biggest
   "tell" that separates a template from a bespoke brand.

## Fonts — Google Fonts
- **Cormorant Garamond** (display serif) and **Jost** (UI sans).
- Open source (SIL Open Font License), free for commercial use.
- Loaded from `fonts.googleapis.com`. For best privacy/performance, self-host
  them (e.g. via `google-webfonts-helper`) and drop the `fonts.*` entries from
  `_headers` CSP.

## Icons
All icons are inline hand-written SVG (search, account, bag, heart, socials).
No icon library, no license to worry about.

## Placeholder content
Product names, prices, the "press" quotes and body copy are **fictional
placeholders**. Replace them with your real catalogue before going live.
