# MASSIF — Next.js Port

Pixel-faithful Next.js (App Router) conversion of the **MASSIF** cinematic
scroll-driven landing page (Aura.build template) — GSAP + ScrollTrigger +
Lenis choreography ported 1:1.

## Run

```bash
npm install
npm run dev     # http://localhost:3111
npm run build && npm start
```

## Structure

| Path | Purpose |
|---|---|
| `app/layout.tsx` | Root layout, fonts (Archivo + Space Mono), metadata |
| `app/globals.css` | Original template CSS, byte-identical (only CDN→local asset paths swapped) |
| `app/page.tsx` | Entry → `components/Massif.tsx` |
| `components/Massif.tsx` | Client wrapper; boots choreography once on mount |
| `components/Overlays.tsx` | grain / cursor / HUD / rope rail / loader |
| `components/Nav.tsx` | Fixed nav |
| `components/sections/*.tsx` | 14 sections (Hero → Footer), original classes/ids/data-attrs kept |
| `lib/choreography.js` | Full GSAP scroll choreography, ported from source script with npm gsap/lenis; SSR-safe module, `boot()`/cleanup API |
| `public/assets/massif/` | 42 photos + 193 vista film frames (self-hosted) |

## Conversion notes

- Inline GSAP 3.13 / ScrollTrigger / Lenis 1.1.14 bundles → npm deps.
- Choreography runs inside `boot()` called from a `useEffect`; returns a
  destroy fn (StrictMode double-mount safe, removes all listeners, kills
  ScrollTriggers, destroys Lenis).
- `?static` query param & `prefers-reduced-motion` still render final states.
- Class names, ids and `data-*` attributes are unchanged so the ported CSS
  and choreography keep working — do not rename them.
