// PORTED 1:1 from MASSIF choreography (source script #4).
// GSAP + ScrollTrigger + Lenis now come from npm instead of inline bundles.
// Module top-level is SSR-safe; everything DOM-touching runs inside boot().
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const cleanups = [];

const ASSETS = '/assets/massif/';

/* ============================================================
   MASSIF — choreography
   One motion personality: expo.out, heavy weighted scroll.
   One pinned signature: THE LINE (route draws itself, dawn breaks).
   Static mode (?static or prefers-reduced-motion): everything is
   shown in its final state, no smooth scroll, no pin.
   ============================================================ */


const EASE = 'expo.out';      // the single easing — mirror of --ease in styles.css
const REVEAL = 1.1;           // one reveal duration everywhere

/* number formatting: "6 140" (thin-space thousands, alpine style) */
const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmtTime = (m) => { const mm = Math.round(m); const h = Math.floor(mm / 60) % 24; return String(h).padStart(2, '0') + ':' + String(mm % 60).padStart(2, '0'); };

/* ---------------------------------------------------------------
   STATIC PATH — final states only, then stop.
   --------------------------------------------------------------- */


/* ---------------------------------------------------------------
   FAQ answers open into space that is already reserved.

   Native <details> pushes layout when it opens. In the refuge that
   is expensive: the panel is centred inside a min-height:100vh
   section, so opening one question re-centres every row (the row
   slides out from under the pointer), moves the headline, and grows
   the section — which makes the object-fit:cover plate rescale.

   So: measure the tallest answer on an offscreen clone (the real
   <details> are never touched, so no toggle events and no flash),
   hold that much room open underneath the list permanently, and
   allow only one answer at a time so the reservation always holds.
   Runs in both paths — static mode has the same jump.
   --------------------------------------------------------------- */
function stabiliseFaq() {
  const faq = document.querySelector('.faq');
  if (!faq) return;
  const items = Array.from(faq.querySelectorAll('details'));
  if (!items.length) return;

  const reserve = () => {
    faq.style.minHeight = '';
    const clone = faq.cloneNode(true);
    clone.style.cssText =
      `position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;width:${faq.offsetWidth}px`;
    faq.parentElement.appendChild(clone);
    /* closed list first — measuring the live element would fold in
       whichever answer happens to be open and over-reserve by it */
    const shut = Array.from(clone.querySelectorAll('details'));
    shut.forEach((d) => { d.open = false; });
    const closed = clone.offsetHeight;
    shut.forEach((d) => { d.open = true; });
    const tallest = Math.max(
      ...Array.from(clone.querySelectorAll('details p'), (p) => p.offsetHeight),
    );
    clone.remove();
    faq.style.minHeight = `${closed + tallest}px`;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  };

  reserve();
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(reserve, 220); });

  /* Close the open answer in the click's capture phase — before the
     browser performs the default open. `toggle` fires a task later,
     which would leave one frame with two answers open, i.e. exactly
     the layout jump this is here to prevent. Keyboard activation of
     a <summary> dispatches a click too, so this covers both. */
  faq.addEventListener('click', (e) => {
    const summary = e.target.closest('summary');
    if (!summary) return;
    const target = summary.parentElement;
    if (target.open) return;
    items.forEach((d) => { if (d !== target) d.open = false; });
  }, true);
}

/* ---------------------------------------------------------------
   The nav retires at WP 12. The page bottom is a rest position, so
   the footer's slate rule would otherwise sit under the fixed nav
   for as long as you stay there — and the footer carries its own
   links. Runs in both paths; no GSAP, so static mode gets it too.
   --------------------------------------------------------------- */
function retireNav() {
  const nav = document.querySelector('.nav');
  const footer = document.querySelector('.footer');
  if (!nav || !footer || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(
    ([e]) => nav.classList.toggle('is-retired', e.isIntersecting),
    { rootMargin: '0px 0px -98% 0px' },   /* a band at the very top of the viewport */
  ).observe(footer);
}

/* ---------------------------------------------------------------
   A scrubbed film sequence on a canvas — the same approach as
   001 Vacance. Frames are drawn cover-fit and preloaded coarse-to-
   fine (every 8th → 2nd → all) so scrubbing works almost at once,
   with the nearest already-loaded frame standing in until the exact
   one arrives. Seeking a decoded image is instant; seeking a video
   is at the mercy of the decoder, which is what makes this smooth.
   --------------------------------------------------------------- */
function makeFilm({ canvas, count, path }) {
  const ctx = canvas.getContext('2d');
  const imgs = new Array(count).fill(null);
  let current = 0;

  function resize() {
    /* the canvas is fixed at viewport size in CSS; match its backing store
       to that box, capped so huge DPRs don't cost fill rate for nothing */
    const dpr = Math.min(devicePixelRatio || 1, 1.75);
    const r = canvas.getBoundingClientRect();
    const w = r.width || innerWidth, h = r.height || innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    draw();
  }

  function nearestLoaded(i) {
    for (let d = 0; d < count; d++) {
      if (imgs[i - d]) return imgs[i - d];
      if (imgs[i + d]) return imgs[i + d];
    }
    return null;
  }

  function draw() {
    const img = nearestLoaded(current);
    if (!img) return;
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  function load(pass) {
    const step = [8, 2, 1][pass];
    if (step === undefined) return;
    let pending = 0;
    for (let i = 0; i < count; i += step) {
      if (imgs[i]) continue;
      pending++;
      const im = new Image();
      im.onload = () => {
        imgs[i] = im;
        if (Math.abs(i - current) < step * 2) draw();
        if (--pending === 0) load(pass + 1);
      };
      im.onerror = () => { if (--pending === 0) load(pass + 1); };
      im.src = path(i);
    }
    if (pending === 0) load(pass + 1);
  }

  const first = new Image();
  first.onload = () => { imgs[0] = first; draw(); load(0); };
  first.onerror = () => load(0);
  first.src = path(0);

  addEventListener('resize', resize);
  resize();

  return {
    seek(t) {                                   /* t is 0..1 along the sequence */
      const i = Math.round(Math.min(1, Math.max(0, t)) * (count - 1));
      if (i !== current) { current = i; draw(); }
    },
    resize,
  };
}

function init() {
  /* -------------------------------------------------------------
     1) Lenis ↔ ScrollTrigger sync — ONE scroll position, ONE loop.
        Lenis is driven from GSAP's ticker; never add a second rAF.
     ------------------------------------------------------------- */
  const lenis = new Lenis({
    duration: 1.35,                                             // heavy, mountain-paced
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),   // expo-out, matches EASE
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const lenisRaf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => { gsap.ticker.remove(lenisRaf); lenis.destroy(); window.__lenis = null; });
  window.__lenis = lenis;   // debug handle: drive scroll from the console
  lenis.stop();                                                 // locked until the altimeter initialises

  /* anchor links scroll through Lenis so the weight is consistent */
  const anchorEls = document.querySelectorAll('a[href^="#"]');
  const anchorScroll = (e) => {
    const a = e.currentTarget;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.6 });
  };
  anchorEls.forEach((a) => a.addEventListener('click', anchorScroll));
  cleanups.push(() => anchorEls.forEach((a) => a.removeEventListener('click', anchorScroll)));

  /* -------------------------------------------------------------
     2) Survey-reticle cursor (fine pointers only)
     ------------------------------------------------------------- */
  if (matchMedia('(pointer: fine)').matches) {
    /* 1:1 tracking, no lerp. The reticle IS the cursor — the native one is
       hidden — so any smoothing splits reality in two: hover states fire
       from the real pointer while the visible reticle is still en route.
       Sweeping the FAQ, the question under the (invisible) pointer lit up
       while the reticle trailed a row behind — read as the cursor being
       pushed off the row. Atmosphere belongs on things that aren't the
       pointer; the pointer itself has to be where the hand is. */
    const cursor = document.querySelector('.cursor');
    cursor.style.opacity = 0;                        // parked until first move
    const moveCursor = (e) => {
      cursor.style.opacity = 1;
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    addEventListener('pointermove', moveCursor, { passive: true });
    cleanups.push(() => removeEventListener('pointermove', moveCursor));
    document.querySelectorAll('a, button, summary, [data-magnetic]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* -------------------------------------------------------------
     3) Masked line reveals — every [data-lines] child .l gets an
        overflow-hidden wrapper; inner lines rise from behind it.
     ------------------------------------------------------------- */
  document.querySelectorAll('[data-lines] .l').forEach((line) => {
    const inner = document.createElement('span');
    inner.className = 'l-inner';
    inner.style.display = 'block';
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    line.style.overflow = 'hidden';
    line.style.display = 'block';
  });
  gsap.set('.hero [data-lines] .l-inner', { yPercent: 115 });

  /* the hero masthead is split per letter, each in its own clip box, so
     MASSIF climbs out from behind the bottom edge one letter at a time */
  const mast = document.querySelector('.hero .wordmark');
  mast.innerHTML = [...mast.textContent.trim()]
    .map((ch) => `<span class="ltr"><span>${ch}</span></span>`).join('');
  const mastLetters = mast.querySelectorAll('.ltr > span');
  gsap.set(mastLetters, { yPercent: 100 });

  document.querySelectorAll('[data-lines]:not(.hero [data-lines])').forEach((el) => {
    gsap.fromTo(el.querySelectorAll('.l-inner'),
      { yPercent: 115 },
      { yPercent: 0, duration: REVEAL, ease: EASE, stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
  });

  /* -------------------------------------------------------------
     4) Loader — the altimeter initialises to the valley floor
        (0 → 1 035 M), the orange line fills, then scroll releases
        and the hero tagline climbs out of its masks.
     ------------------------------------------------------------- */
  const counter = document.querySelector('[data-count]');
  const loader = document.querySelector('.loader');
  /* The hero's reveals are held back and driven by the loader's exit. Left
     in the scroll batch they fire while the loader still covers the screen,
     so the hero was already fully settled by the time it was uncovered —
     which is why the handover felt like a cut. */
  const heroReveals = gsap.utils.toArray('.hero [data-reveal]');
  const altObj = { n: 1140 }; /* 19:00 */
  gsap.to(altObj, {
    n: 1172, duration: 2, ease: 'power1.inOut', /* bis 19:32 */
    onUpdate: () => { counter.textContent = fmtTime(altObj.n); },
    /* The loader doesn't fade — it LIFTS, like a curtain, and the hero
       arrives underneath it from below. Everything overlaps: the type is
       already climbing while the panel is still clearing the frame, so the
       page feels handed over rather than switched.
       (No transform on .hero__photo here — the parallax scrub owns it.) */
    onComplete: () => {
      const exit = gsap.timeline();
      exit
        .to(loader, {
          yPercent: -100, duration: 1.25, ease: EASE,
          onComplete: () => loader.remove(),
        }, 0)
        /* the loader's own type leaves a little faster than its panel */
        .to([loader.querySelector('.loader__brand'), loader.querySelector('.loader__alt'), loader.querySelector('.loader__line')], {
          y: -70, autoAlpha: 0, duration: 0.9, ease: EASE, stagger: 0.05,
        }, 0)
        /* hero tagline climbs out of its masks as the curtain clears */
        .to('.hero [data-lines] .l-inner', {
          yPercent: 0, duration: 1.4, ease: EASE, stagger: 0.14,
        }, 0.42)
        /* MASSIF rises letter by letter — the page's opening statement */
        .to(mastLetters, {
          yPercent: 0, duration: 1.8, ease: EASE, stagger: 0.15,
        }, 0.58)
        /* meta row, conditions and scroll cue rise last */
        .to(heroReveals, {
          y: 0, opacity: 1, duration: 1.2, ease: EASE, stagger: 0.12,
        }, 0.72)
        .add(() => lenis.start(), 0.95);
    },
  });

  /* -------------------------------------------------------------
     5) Workhorse reveals + parallax depth
     ------------------------------------------------------------- */
  gsap.set('[data-reveal]', { y: 44, opacity: 0 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 86%',
    once: true,
    onEnter: (els) => {
      const targets = els.filter((el) => !heroReveals.includes(el));
      if (!targets.length) return;
      gsap.to(targets, {
        y: 0, opacity: 1, duration: REVEAL, ease: EASE, stagger: 0.09, overwrite: true,
      });
    },
  });

  gsap.utils.toArray('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    gsap.to(el, {
      yPercent: (1 - speed) * 26, ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* -------------------------------------------------------------
     6a) HERO HOLD — the page is pinned while night becomes day, so
     the sunrise isn't competing with the section leaving. Nothing
     translates here: only the crossfade and the shade deepening
     under it. The last stretch of the pin is deliberately empty —
     a beat at full daylight before anything moves.
     ------------------------------------------------------------- */
  const heroHold = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero', start: 'top top', end: '+=110%',
      pin: true, pinSpacing: true, scrub: 0.6, anticipatePin: 1,
      /* first pin on the page, so it must measure before every trigger
         below it — priorities descend in document order (see the two
         pins further down at 2 and 1) */
      refreshPriority: 3,
    },
  });
  heroHold
    .to('.hero__photo--day', { opacity: 1, ease: 'none', duration: 0.62 }, 0)
    .to('.hero__shade', { opacity: 1, ease: 'none', duration: 0.62 }, 0)
    /* empty tail: holds the lit frame so it can actually be looked at */
    .to({}, { duration: 0.38 }, 0.62);

  /* -------------------------------------------------------------
     6b) Hero exit — four planes leaving at different rates, starting
     only once the hold releases. The photo lags (drifts DOWN), the
     type outruns it, the masthead sits between them.
     Tune the yPercent values to deepen or flatten the depth.
     ------------------------------------------------------------- */
  const heldST = heroHold.scrollTrigger;
  gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      /* function form + invalidateOnRefresh so these follow the pin's
         end wherever it lands after a resize */
      start: () => heldST.end,
      end: () => heldST.end + innerHeight,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  })
    .to('.hero__photo', { yPercent: 16, ease: 'none' }, 0)     // furthest: lags behind
    .to('.hero .wordmark', { yPercent: -12, ease: 'none' }, 0) // mid plane
    .to('.hero__copy', { yPercent: -62, ease: 'none' }, 0)     // nearest: leaves fastest
    .to('.hero__cue', { autoAlpha: 0, ease: 'none' }, 0);

  /* -------------------------------------------------------------
     5a) STICKY PITCHES (The Bureau) — as each pitch is covered by
         the next, it settles back and dims, so the stack reads as
         depth rather than as three cards that happen to overlap.
         Tune `scale`/`brightness` for a shallower or deeper deck.
     ------------------------------------------------------------- */
  const pitches = gsap.utils.toArray('[data-pitch]');
  const stack = document.querySelector('.pitches');

  /* Cards 02 and 03 wait below the frame. `y` is each card's resting
     offset in the deck, so a placed card shows a sliver of the one under
     it; `yPercent` is the travel. Once a card lands it is never tweened
     again — that is the "locked and stays locked" the sticky version
     could not deliver. */
  gsap.set(pitches, {
    yPercent: (i) => (i === 0 ? 0 : 100),
    y: (i) => i * 22,
  });

  const deck = gsap.timeline({
    scrollTrigger: {
      trigger: stack,
      start: 'center center',
      end: '+=200%',        // ~1 viewport per incoming card; raise to slow the deal
      pin: true,
      pinSpacing: true,
      scrub: 1,
      /* Pins must be measured BEFORE anything below them, or every trigger
         further down the page resolves without this section's spacer and
         lands thousands of pixels early. Higher = refreshed sooner; these
         two are numbered in page order. */
      refreshPriority: 2,
    },
  });

  /* beat 1 — card 02 climbs over card 01 */
  deck.to(pitches[1], { yPercent: 0, ease: 'none', duration: 1 }, 0)
      .to(pitches[0], { scale: 0.95, filter: 'brightness(0.5)', ease: 'none', duration: 1 }, 0)
      .to(pitches[0].querySelector('.pitch__label'), { opacity: 0.4, ease: 'none', duration: 1 }, 0)
  /* beat 2 — card 03 climbs over both; 01 recedes a step further */
      .to(pitches[2], { yPercent: 0, ease: 'none', duration: 1 }, 1)
      .to(pitches[1], { scale: 0.95, filter: 'brightness(0.5)', ease: 'none', duration: 1 }, 1)
      .to(pitches[1].querySelector('.pitch__label'), { opacity: 0.4, ease: 'none', duration: 1 }, 1)
      .to(pitches[0], { scale: 0.9, filter: 'brightness(0.32)', ease: 'none', duration: 1 }, 1);

  /* -------------------------------------------------------------
     5a-ii) THE ROPE TEAM — sticky roster. Each name owns a band of
     scroll; as it passes the read-line the roster lights that name,
     the marker finds it, and the plate + spec block behind it swap.
     No pin: the plate is sticky, so the section never takes the
     scroll away from the reader.
     ------------------------------------------------------------- */
  const guideRows = gsap.utils.toArray('[data-guide]');
  const guidePlates = gsap.utils.toArray('[data-plate]');
  const guideSpecs = gsap.utils.toArray('[data-spec]');

  if (guideRows.length) {
    let liveGuide = -1;
    const showGuide = (i) => {
      if (i === liveGuide) return;               // don't re-fire on every tick
      liveGuide = i;
      guideRows.forEach((row, n) => row.classList.toggle('is-active', n === i));
      guidePlates.forEach((p, n) => gsap.to(p, {
        autoAlpha: n === i ? 1 : 0, duration: 0.65, ease: EASE, overwrite: true,
      }));
      guideSpecs.forEach((s, n) => gsap.to(s, {
        autoAlpha: n === i ? 1 : 0, y: n === i ? 0 : 10,
        duration: 0.55, ease: EASE, overwrite: true,
      }));
    };

    gsap.set(guideSpecs, { y: 10 });
    showGuide(0);                                 // first guide is lit on arrival

    /* scroll owns the roster; hover borrows it and hands it straight back */
    let scrollGuide = 0;
    guideRows.forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row, start: 'top 58%', end: 'bottom 58%',
        onEnter: () => { scrollGuide = i; showGuide(i); },
        onEnterBack: () => { scrollGuide = i; showGuide(i); },
      });
      if (matchMedia('(pointer: fine)').matches) {
        row.addEventListener('pointerenter', () => showGuide(i));
        row.addEventListener('pointerleave', () => showGuide(scrollGuide));
      }
    });
  }

  /* -------------------------------------------------------------
     5a-iii) DISCIPLINES — the three rows arrive in sequence and only
     one is lit at a time. Entry is a staggered rise with the hairline
     drawing under each row; after that, whichever row holds the
     read-line takes the accent (number, diamond, name) and its photo
     comes back into colour while the others sit in grayscale.
     ------------------------------------------------------------- */
  const discRows = gsap.utils.toArray('[data-disc]');
  if (discRows.length) {
    /* entry: rows rise and their rules draw, one after another */
    gsap.set(discRows, { y: 46, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: '.disciplines', start: 'top 72%', once: true,
      onEnter: () => {
        gsap.to(discRows, {
          y: 0, autoAlpha: 1, duration: REVEAL, ease: EASE, stagger: 0.16,
          /* hand opacity back to CSS afterwards, or the inline 1 left here
             would outrank the dim/lit rule and every row would stay lit */
          onComplete: () => gsap.set(discRows, { clearProps: 'opacity,visibility' }),
        });
        gsap.to(discRows, {
          '--rule': 1, duration: 1.1, ease: EASE, stagger: 0.16, delay: 0.12,
        });
      },
    });

    /* then the live row follows the scroll */
    let liveDisc = -1;
    const lightDisc = (i) => {
      if (i === liveDisc) return;
      liveDisc = i;
      discRows.forEach((row, n) => row.classList.toggle('is-live', n === i));
    };
    discRows.forEach((row, i) => {
      ScrollTrigger.create({
        trigger: row, start: 'top 62%', end: 'bottom 62%',
        onEnter: () => lightDisc(i),
        onEnterBack: () => lightDisc(i),
      });
      if (matchMedia('(pointer: fine)').matches) {
        row.addEventListener('pointerenter', () => lightDisc(i));
      }
    });
  }

  /* -------------------------------------------------------------
     5a-iv) TARIFF — the three boards deal in from the bottom, left to
     right, each one a beat behind the last. They are excluded from the
     generic reveal batch so the order is guaranteed rather than
     depending on which happens to cross the trigger line first.
     ------------------------------------------------------------- */
  const boards = gsap.utils.toArray('[data-board]');
  if (boards.length) {
    gsap.set(boards, { y: 90, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: '.tariff', start: 'top 68%', once: true,
      onEnter: () => gsap.to(boards, {
        y: 0, autoAlpha: 1, duration: 1.1, ease: EASE,
        /* wide enough to actually read as one-then-two-then-three: expo.out
           settles each card in ~300ms, so a tighter stagger reads as one move */
        stagger: 0.22,
        clearProps: 'transform',      /* release y so the CSS offsets own it */
      }),
    });
  }

  /* -------------------------------------------------------------
     5b) Section slates draw themselves in: hairline sweeps across,
         then the three labels rise. Runs once per slate.
     ------------------------------------------------------------- */
  gsap.utils.toArray('.slate').forEach((slate) => {
    slate.style.setProperty('--rule', 0);
    const spans = slate.querySelectorAll('span');
    gsap.set(spans, { y: 14, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: slate, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.to(slate, { '--rule': 1, duration: 1.2, ease: EASE });
        gsap.to(spans, { y: 0, autoAlpha: 1, duration: REVEAL, ease: EASE, stagger: 0.08, delay: 0.15 });
      },
    });
  });

  /* -------------------------------------------------------------
     5c) Image wipe-reveals: clip rises, image settles from a slight
         zoom. transform is cleared afterwards so CSS hovers work.
     ------------------------------------------------------------- */
  gsap.utils.toArray('.reveal-img').forEach((frame) => {
    const img = frame.querySelector('img');
    /* A frame that counter-scrolls owns its photo's transform for the whole
       page life, so it gets the clip wipe only — the scale settle here ends
       in clearProps:'transform', which would wipe the parallax with it. */
    const counterScrolls = frame.hasAttribute('data-parallax');
    gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' });
    if (!counterScrolls) gsap.set(img, { scale: 1.15 });
    ScrollTrigger.create({
      trigger: frame, start: 'top 84%', once: true,
      onEnter: () => {
        gsap.to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: EASE });
        if (!counterScrolls) {
          gsap.to(img, { scale: 1, duration: 1.6, ease: EASE, clearProps: 'transform' });
        }
      },
    });
  });

  /* -------------------------------------------------------------
     5c-ii) Route plates — the photo holds still while the card
     travels. The image sits oversized in its frame (see CSS) and is
     scrubbed against the scroll, so it reads as fixed in space
     behind a window that slides up over it. Replaces the hover zoom.
     ------------------------------------------------------------- */
  gsap.utils.toArray('[data-parallax]').forEach((frame) => {
    gsap.fromTo(frame.querySelector('img'),
      { yPercent: -11 },
      { yPercent: 11, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* -------------------------------------------------------------
     5d) The Vista — the window over the held view. The image is
         position:fixed (clipped by the section); only the caption
         needs choreography: it resolves from fog-blur mid-window.
     ------------------------------------------------------------- */
  /* The film finishes before the section does. Past VISTA_HOLD the frame
     index is pinned to the last frame and the remaining travel is a freeze
     — a held summit you can sit in — which is where the closing line
     arrives. Beats are positioned on the section's own scroll, and both the
     frames and the text are driven from that one value. */
  const VISTA_HOLD = 0.71;

  const vistaBeats = gsap.timeline({ paused: true });
  gsap.utils.toArray('[data-vista]').forEach((line) => {
    const at = parseFloat(line.dataset.vista);

    if (line.hasAttribute('data-vista-lines')) {
      /* line by line: the box stays, its lines resolve out of blur in turn */
      const parts = line.querySelectorAll('.vista__l');
      gsap.set(line, { autoAlpha: 1 });
      gsap.set(parts, { autoAlpha: 0, y: 30, filter: 'blur(16px)' });
      vistaBeats.to(parts, {
        autoAlpha: 1, y: 0, filter: 'blur(0px)',
        ease: 'none', duration: 0.07, stagger: 0.07,
      }, at);
    } else {
      gsap.set(line, { autoAlpha: 0, y: 24, filter: 'blur(12px)' });
      vistaBeats.to(line, { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'none', duration: 0.06 }, at - 0.06);
    }

    /* everything except the closing line clears before the next arrives —
       that one holds, and the section's own clip wipes it away */
    if (!line.hasAttribute('data-vista-hold')) {
      vistaBeats.to(line, { autoAlpha: 0, y: -20, filter: 'blur(10px)', ease: 'none', duration: 0.06 }, at + 0.16);
    }
  });
  /* progress() is normalised to the timeline's own duration, and the last
     beat now ends before 1 — without this spacer the scroll would map onto
     a short timeline and every beat would fire early. */
  vistaBeats.to({}, { duration: 0 }, 1);
  /* -------------------------------------------------------------
     5d-ii) The Vista clip is scrubbed, never played. Scroll position
     maps straight onto currentTime, so the crest happens exactly as
     fast as the reader moves.

     The file is encoded all-intra (every one of its 193 frames is a
     keyframe), so any seek decodes a single frame instead of walking
     a GOP from the last keyframe — that is what keeps the scrub
     smooth. Because seeks are now cheap and exact, the target time is
     quantised to the frame grid and only issued when the frame index
     actually changes: one decode per frame, none wasted.
     ------------------------------------------------------------- */
  const vistaCanvas = document.querySelector('[data-vista-canvas]');
  /* APNF: ohne Frame-Canvas treibt der Scroll-Scrub Text-Beats UND das
     MiniMax-Video: currentTime folgt dem Fortschritt wie frueher die 193
     Frames. Seeks werden auf 30ms quantisiert, damit der Browser nicht
     jeden Tick neu dekodiert — ein Decode pro Frame, keiner verschwendet. */
  if (!vistaCanvas) {
    const vistaFilm = document.querySelector('.vista__film');
    const seekStill = { t: 0 };
    const scrubFilm = () => {
      vistaBeats.progress(seekStill.t);
      if (vistaFilm && vistaFilm.duration) {
        const target = Math.min(seekStill.t / VISTA_HOLD, 1) * vistaFilm.duration;
        if (Math.abs(vistaFilm.currentTime - target) > 0.033) {
          try { vistaFilm.currentTime = target; } catch (e) { /* seek zu frueh */ }
        }
      }
    };
    if (vistaFilm) {
      const isMobile = matchMedia('(pointer: coarse)').matches
        || matchMedia('(orientation: portrait)').matches;
      if (isMobile) {
        /* MOBILE - robustester Modus: Autoplay-Loop (muted+playsInline laeuft
           auf iOS/Android fast immer). Kein Scrub-Fighting auf Touch. */
        if (vistaFilm.dataset.portrait) vistaFilm.src = vistaFilm.dataset.portrait;
        vistaFilm.loop = true;
        vistaFilm.muted = true;
        const tryPlay = () => { const p = vistaFilm.play(); if (p && p.catch) p.catch(() => {}); };
        if (vistaFilm.readyState >= 2) tryPlay();
        else vistaFilm.addEventListener('canplay', tryPlay, { once: true });
        document.addEventListener('touchstart', tryPlay, { passive: true, once: true });
      } else {
        /* DESKTOP - Kino-Scrub: play()+pause() entlockt das Video, danach
           steuert der Scroll currentTime wie frueher die 193 Frames. */
        let unlocked = false;
        const unlock = () => {
          if (unlocked) return;
          unlocked = true;
          const p = vistaFilm.play();
          if (p && p.then) p.then(() => { vistaFilm.pause(); }).catch(() => {});
        };
        if (vistaFilm.readyState >= 1) unlock();
        else vistaFilm.addEventListener('loadedmetadata', unlock, { once: true });
        const gest = () => { unlock(); document.removeEventListener('pointerdown', gest); };
        document.addEventListener('pointerdown', gest, { passive: true });
      }
      vistaFilm.classList.add('is-live');
    }
    gsap.to(seekStill, {
      t: 1, ease: 'none',
      scrollTrigger: { trigger: '.vista', start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      onUpdate: scrubFilm,
    });
  }
  if (vistaCanvas) {
    const film = makeFilm({
      canvas: vistaCanvas,
      count: 193,
      path: (i) => ASSETS + `vista/f_${String(i + 1).padStart(3, '0')}.jpg`,
    });
    const seek = { t: 0 };
    gsap.to(seek, {
      t: 1, ease: 'none',
      scrollTrigger: { trigger: '.vista', start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      onUpdate: () => {
        /* frames run out at VISTA_HOLD and stay on the last one after it */
        film.seek(Math.min(seek.t / VISTA_HOLD, 1));
        vistaBeats.progress(seek.t);   /* text and frames read one clock */
      },
    });
  }

  gsap.set('.vista__cross', { scale: 0, transformOrigin: '50% 50%' });
  ScrollTrigger.create({
    trigger: '.vista', start: 'top 60%', once: true,
    onEnter: () => gsap.to('.vista__cross', { scale: 1, duration: 0.9, ease: EASE, stagger: 0.15 }),
  });

  /* -------------------------------------------------------------
     6) Counters — stats tick up once, formatted alpine-style
     ------------------------------------------------------------- */
  gsap.utils.toArray('[data-count-to]').forEach((el) => {
    const target = parseFloat(el.dataset.countTo);
    const obj = { n: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(obj, {
        n: target, duration: 2, ease: 'power2.out',
        onUpdate: () => { el.textContent = fmt(obj.n); },
      }),
    });
  });

  /* -------------------------------------------------------------
     7) THE LINE — the signature. One pin for the whole page.
        Scroll scrubs: the route profile draws, waypoints pop as the
        line passes them, dawn breaks (night→dawn→day crossfade),
        the altimeter climbs 1 035 → 4 810 M, clock runs 06:10→11:20,
        oversized sentences counter-drift, the rope-progress fills.
     ------------------------------------------------------------- */
  const reveal = document.querySelector('.profile__reveal');
  const PATH_END_X = 1400;              // the route's last vertex, in viewBox units
  gsap.set('.wp-marker', { scale: 0, transformOrigin: '50% 50%' });

  const lineAltEl = document.querySelector('[data-line-alt]');
  const lineTimeEl = document.querySelector('[data-line-time]');
  const climb = { alt: 1172, min: 1172 };                       // 19:32, Einsatzbeginn

  const lineTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.line-sec',
      start: 'top top',
      end: '+=520%',                                            // one beat per stage, plus a hold at the top
      pin: true,
      scrub: 1,
      refreshPriority: 1,                                       // see the deck pin above

    },
  });

  /* The draw finishes at DRAW_END, not at 1 — the remaining scroll is a
     deliberate hold on the summit so the top is actually arrived at
     before the pin releases. That gap is what was missing: previously
     the section unpinned while the line was still short of the summit. */
  const DRAW_END = 0.88;

  /* The reveal travels linearly in x, and every marker is positioned by x
     too — so a dot's moment is simply its own x as a fraction of the route.
     The last marker sits on the route's end point, so it resolves to
     DRAW_END exactly and the line cannot finish anywhere but on it. */
  const markers = gsap.utils.toArray('.wp-marker');
  const VB_W = 1440;                                    // profile viewBox width
  const AT = markers.map(
    (m) => (parseFloat(m.style.left) / 100 * VB_W) / PATH_END_X * DRAW_END
  );

  /* inside a scrub, sub-tweens use ease:'none' — the scroll IS the timing */
  lineTl
    .to(reveal, { attr: { width: PATH_END_X }, ease: 'none', duration: DRAW_END }, 0)
    .to(climb, {
      alt: 1335, min: 1335, ease: 'none', duration: DRAW_END,
      onUpdate: () => {
        lineAltEl.textContent = fmtTime(climb.alt);
        const e = Math.max(0, Math.round(climb.min) - 1172);
        lineTimeEl.textContent = `SEIT ANRUF ${String(Math.floor(e / 60)).padStart(2, '0')}:${String(e % 60).padStart(2, '0')}`;
      },
    }, 0)
    .to('.line-progress', { '--rope': 1, ease: 'none', duration: DRAW_END }, 0)
    /* counter-drifting sentences — different rates, opposite directions.
       Modest ranges: enough parallax to feel alive, never so far that the
       first or last words leave the frame. */
    .fromTo('.drift--a', { xPercent: 5 }, { xPercent: -16, ease: 'none', duration: 1 }, 0)
    .fromTo('.drift--b', { xPercent: -14 }, { xPercent: 10, ease: 'none', duration: 1 }, 0);

  /* The two lines are a sequence, not a pair. "Out in the dark" resolves
     out of a heavy blur at the start and dissolves again once the light
     arrives; "Up with the light" resolves in its place, between the col
     and the arête, and holds to the summit. Blur values are set explicitly
     so GSAP interpolates from a real number rather than `none`. */
  const driftA = document.querySelector('.drift--a');
  const driftB = document.querySelector('.drift--b');
  gsap.set([driftA, driftB], { autoAlpha: 0, filter: 'blur(26px)' });

  lineTl
    .to(driftA, { autoAlpha: 1, filter: 'blur(0px)', ease: 'none', duration: 0.16 }, 0.02)
    .to(driftA, { autoAlpha: 0, filter: 'blur(20px)', ease: 'none', duration: 0.12 }, 0.40)
    .to(driftB, { autoAlpha: 1, filter: 'blur(0px)', ease: 'none', duration: 0.18 }, 0.52);

  /* each stage slides in from the right and lands exactly on its waypoint.
     The offset is re-declared through GSAP: the CSS `translateX(100%)`
     fallback parses into a pixel `x`, which would fight `xPercent` and
     leave the frames stranded off-screen. */
  const SLIDE = 0.09;                                   // travel time of a stage
  const stages = gsap.utils.toArray('.line-img[data-stage]');
  gsap.set(stages, { xPercent: 100, x: 0 });
  stages.forEach((frame, i) => {
    const at = Math.max(0, AT[i] - SLIDE);              // lands exactly on its dot
    const photo = frame.querySelector('img');
    /* the frame carries the photo in, but the photo trails behind it and
       catches up — the depth cue that stops the slide reading as one flat
       card. It rides in slightly oversized so the lag never exposes an
       edge, settling to 1 as it lands. */
    lineTl
      .to(frame, { xPercent: 0, ease: 'none', duration: SLIDE }, at)
      .fromTo(photo,
        { xPercent: -16, scale: 1.18 },
        { xPercent: 0, scale: 1, ease: 'none', duration: SLIDE }, at);
  });

  /* waypoints pop at the measured moment the line touches them */
  AT.forEach((at, i) => lineTl.to(markers[i], { scale: 1, duration: 0.04 }, at));

  /* -------------------------------------------------------------
     8) Per-section background crossfade — the day changing color.
        Text color is per-section (CSS); body carries the sky.
     ------------------------------------------------------------- */
  gsap.utils.toArray('[data-bg]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onEnter: () => gsap.to('body', { backgroundColor: sec.dataset.bg, duration: 0.9, ease: EASE }),
      onEnterBack: () => gsap.to('body', { backgroundColor: sec.dataset.bg, duration: 0.9, ease: EASE }),
    });
  });

  /* -------------------------------------------------------------
     9) Whiteout — the near-white blank beat. The line resolves from
        fog-blur. This is the turnaround; it stays quiet.
     ------------------------------------------------------------- */
  gsap.fromTo('[data-whiteout]',
    { autoAlpha: 0, filter: 'blur(14px)' },
    { autoAlpha: 1, filter: 'blur(0px)', ease: 'none',
      scrollTrigger: { trigger: '.whiteout', start: 'top 45%', end: 'center 45%', scrub: 1 } });

  /* The descent plate unclips from the bottom edge upward — zero height as
     the section arrives, full bleed by the time the line is centred. */
  const whiteBg = document.querySelector('.whiteout__bg');
  if (whiteBg) {
    gsap.fromTo(whiteBg,
      { '--rev': 100 },
      { '--rev': 0, ease: 'none',
        scrollTrigger: { trigger: '.whiteout', start: 'top 92%', end: 'center 58%', scrub: 1 } });
    /* No parallax on this plate. Drifting it up uncovered a strip of the
       section at the bottom edge, and this boundary is exactly where the
       page crossfades light to dark — so that strip showed the body
       mid-transition as a grey band above the log. The reveal is the
       motion here; the photograph stays put. */
  }

  /* -------------------------------------------------------------
     10) Summit register — the quote reveals word by word on scrub
     ------------------------------------------------------------- */
  const quote = document.querySelector('[data-words]');
  quote.innerHTML = quote.textContent.trim().split(/\s+/)
    .map((w) => `<span class="w">${w}</span>`).join(' ');
  gsap.to(quote.querySelectorAll('.w'), {
    opacity: 1, ease: 'none', stagger: 0.6,
    scrollTrigger: { trigger: quote, start: 'top 78%', end: 'bottom 45%', scrub: 1 },
  });

  /* The print drifts up slightly slower than the column beside it — the
     rotation lives on .register__print so hover can straighten it
     without GSAP and the drift fighting over one transform. */
  const drift = document.querySelector('.register__drift');
  if (drift) {
    gsap.fromTo(drift, { y: 46 }, {
      y: -46, ease: 'none',
      scrollTrigger: {
        trigger: '.register', start: 'top bottom', end: 'bottom top', scrub: 1,
      },
    });
  }

  /* -------------------------------------------------------------
     9b) Live ropes — each track runs out to the rope's station as its
         row arrives, so the board reads as four ascents in progress
         rather than four bars that were already drawn.
     ------------------------------------------------------------- */
  gsap.utils.toArray('.live__row').forEach((row, i) => {
    const track = row.querySelector('.track');
    if (!track) return;
    gsap.fromTo(track, { '--p': 0 }, {
      '--p': parseFloat(row.dataset.p) || 0,
      duration: 1.5, ease: EASE, delay: i * 0.12,
      scrollTrigger: { trigger: row, start: 'top 88%', once: true },
    });
  });

  /* -------------------------------------------------------------
     10b) Refuge plate — the photograph drifts against the questions,
          and the lamps come up as the section arrives.
     ------------------------------------------------------------- */
  const refugeImg = document.querySelector('.refuge__img');
  if (refugeImg) {
    gsap.fromTo(refugeImg, { yPercent: -5, scale: 1.14 }, {
      yPercent: 5, scale: 1.06, ease: 'none',
      scrollTrigger: { trigger: '.refuge', start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
    /* base brightness is declared in CSS — GSAP interpolating a filter
       from `none` starts at brightness(0) and flashes the plate black. */
    gsap.fromTo(refugeImg, { filter: 'brightness(0.62)' }, {
      filter: 'brightness(1)', ease: 'none',
      scrollTrigger: { trigger: '.refuge', start: 'top 88%', end: 'top 32%', scrub: 1 },
    });
  }

  /* -------------------------------------------------------------
     11) Fixed altimeter HUD — interpolates between the data-alt of
         consecutive sections as you scroll. The page altimeter:
         1 035 up to 4 810 and back down to the valley.
     ------------------------------------------------------------- */
  const hudEl = document.querySelector('[data-hud-alt]');
  let anchors = [];
  const buildAnchors = () => {
    anchors = gsap.utils.toArray('[data-alt]').map((el) => ({
      y: el.getBoundingClientRect().top + window.scrollY,
      alt: parseFloat(el.dataset.alt),
    })).sort((a, b) => a.y - b.y);
  };
  const updateHud = () => {
    if (!anchors.length) return;
    const y = window.scrollY + innerHeight * 0.5;
    let a = anchors[0], b = anchors[anchors.length - 1];
    for (let i = 0; i < anchors.length - 1; i++) {
      if (y >= anchors[i].y && y < anchors[i + 1].y) { a = anchors[i]; b = anchors[i + 1]; break; }
    }
    const t = a === b ? 0 : gsap.utils.clamp(0, 1, (y - a.y) / (b.y - a.y));
    hudEl.textContent = fmtTime(a.alt + (b.alt - a.alt) * t);
  };
  /* driven from the ticker below, not from lenis.on('scroll'), so the
     readouts stay correct for anchor jumps and programmatic scrolls too */

  /* -------------------------------------------------------------
     11b) THE ROPE RAIL — the custom scroll indicator.
          Diamonds sit at each waypoint's true scroll position, the
          accent rope pays out behind the marker, and clicking a
          diamond scrolls the rope to that waypoint.
     ------------------------------------------------------------- */
  const rail = document.querySelector('[data-rail]');
  const railMarker = rail.querySelector('.rail__marker');
  const railLabel = rail.querySelector('[data-rail-label]');
  /* sections that carry no slate still deserve a waypoint */
  const RAIL_FALLBACK = { hero: 'DER ANRUF', vista: 'DER BLICK', whiteout: 'NACH DEM EINSATZ' };
  let railPoints = [];

  const scrollMax = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);

  const buildRail = () => {
    rail.querySelectorAll('.rail__wp').forEach((n) => n.remove());
    railPoints = gsap.utils.toArray('[data-alt]').map((sec) => {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const p = gsap.utils.clamp(0, 1, top / scrollMax());
      const slateSpan = sec.querySelector('.slate span');
      const wp = slateSpan && slateSpan.textContent.match(/WP\s*(\d+)/);
      const label = wp ? `WP ${wp[1]}` : (RAIL_FALLBACK[sec.classList[0]] || '');
      const btn = document.createElement('button');
      btn.className = 'rail__wp';
      btn.style.top = `${p * 100}%`;
      btn.setAttribute('aria-label', `Scroll to ${label || 'section'}`);
      btn.addEventListener('click', () => lenis.scrollTo(sec, { duration: 1.6 }));
      rail.appendChild(btn);
      return { p, btn, label };
    });
  };

  let railHideT;
  const updateRail = () => {
    if (!railPoints.length) return;
    const p = gsap.utils.clamp(0, 1, window.scrollY / scrollMax());
    rail.style.setProperty('--paid', p);
    railMarker.style.top = `${p * 100}%`;

    let active = railPoints[0];
    railPoints.forEach((pt) => {
      const passed = p >= pt.p - 0.004;
      pt.btn.classList.toggle('is-passed', passed);
      pt.btn.classList.remove('is-active');
      if (passed) active = pt;
    });
    active.btn.classList.add('is-active');
    if (active.label) railLabel.textContent = active.label;

    /* show the label while moving, fade it out once you settle */
    rail.classList.add('is-scrolling');
    clearTimeout(railHideT);
    railHideT = setTimeout(() => rail.classList.remove('is-scrolling'), 900);
  };

  /* -------------------------------------------------------------
     11c) Entry snap for The Bureau. Deliberately NOT css scroll-snap
          and NOT ScrollTrigger's snap — both fight Lenis for the
          scroll position. Instead: once scrolling goes quiet, if the
          section is sitting just off its mark, Lenis itself settles
          it. Capture zone is intentionally narrow so a deliberate
          scroll past is never hijacked.
     ------------------------------------------------------------- */
  const snapTargets = ['#bureau', '#guides']
    .map((sel) => document.querySelector(sel)).filter(Boolean);
  const SNAP_ZONE = 0.3;        // fraction of the viewport that counts as "close"
  let snapTimer, snapping = false;

  const maybeSnap = () => {
    if (snapping) return;
    for (const target of snapTargets) {
      const off = target.getBoundingClientRect().top;
      if (Math.abs(off) < 6 || Math.abs(off) > innerHeight * SNAP_ZONE) continue;
      snapping = true;
      lenis.scrollTo(target, {
        duration: 0.7,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => setTimeout(() => { snapping = false; }, 600),
      });
      return;
    }
  };

  /* one per-frame readout pass, and only when the page actually moved */
  let lastY = -1;
  const readout = () => {
    const y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    updateHud();
    updateRail();
    clearTimeout(snapTimer);
    snapTimer = setTimeout(maybeSnap, 160);   // fires only once scrolling stops
  };
  gsap.ticker.add(readout);
  cleanups.push(() => { gsap.ticker.remove(readout); clearTimeout(snapTimer); });

  /* -------------------------------------------------------------
     12) Magnetic CTAs (fine pointers only)
     ------------------------------------------------------------- */
  if (matchMedia('(pointer: fine)').matches) {
    const PULL = 0.22;     // how hard the button leans toward the pointer
    const MAX = 9;         // px — MUST stay small enough that the button can
                           // never travel out from under the cursor. Past that
                           // it slips off the pointer, fires pointerleave,
                           // springs back, re-enters, and oscillates — which
                           // feels like the button shoving your cursor away.
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      let base = null;
      /* the button's centre with its own offset removed, so the reading is
         the RESTING centre and successive moves can't compound */
      const capture = () => {
        const r = btn.getBoundingClientRect();
        base = {
          cx: r.left + r.width / 2 - (+gsap.getProperty(btn, 'x') || 0),
          cy: r.top + r.height / 2 - (+gsap.getProperty(btn, 'y') || 0),
        };
      };
      btn.addEventListener('pointerenter', capture);
      btn.addEventListener('pointermove', (e) => {
        if (!base) capture();
        gsap.to(btn, {
          x: gsap.utils.clamp(-MAX, MAX, (e.clientX - base.cx) * PULL),
          y: gsap.utils.clamp(-MAX, MAX, (e.clientY - base.cy) * PULL),
          duration: 0.4, ease: EASE,
        });
      });
      btn.addEventListener('pointerleave', () => {
        base = null;
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
      });
    });
  }

  /* -------------------------------------------------------------
     Housekeeping: accordion height changes + font load + resize all
     invalidate pin math; refresh and rebuild the HUD anchors.
     ------------------------------------------------------------- */
  document.querySelectorAll('details').forEach((d) =>
    d.addEventListener('toggle', () => { ScrollTrigger.refresh(); buildAnchors(); buildRail(); }));

  const settle = () => {
    ScrollTrigger.refresh(); buildAnchors(); updateHud();
    buildRail(); updateRail(); rail.classList.remove('is-scrolling');
  };
  document.fonts?.ready.then(settle);
  settle();

  let resizeT;
  const onResize = () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(settle, 200);
  };
  addEventListener('resize', onResize);
  cleanups.push(() => { removeEventListener('resize', onResize); clearTimeout(resizeT); });
  cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
}

/* -------------------------------------------------------------
   boot() — called once from the client component after mount.
   Returns a destroy fn that tears down everything (StrictMode-safe).
   ------------------------------------------------------------- */
export function boot() {
  const STATIC =
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    new URLSearchParams(location.search).has('static');

  if (document.fonts) document.fonts.ready.then(stabiliseFaq);
  retireNav();

  if (STATIC) {
    document.documentElement.classList.add('is-static');
      document.querySelector('.loader')?.remove();
      /* no bg-crossfade in static mode — each section paints its own theme
         (except the hero, whose sky layer would be covered) */
      document.querySelectorAll('[data-bg]').forEach((sec) => {
        if (!sec.classList.contains('hero')) sec.style.backgroundColor = sec.dataset.bg;
      });
      document.querySelectorAll('[data-count-to]').forEach((el) => {
        el.textContent = fmt(parseFloat(el.dataset.countTo));
      });
      document.querySelectorAll('.live__row').forEach((row) => {
        row.querySelector('.track')?.style.setProperty('--p', row.dataset.p || 0);
      });
      document.querySelector('.profile__reveal')?.setAttribute('width', 1400);
      document.querySelectorAll('.wp-marker').forEach((m) => { m.style.transform = 'translate(-50%, -50%) scale(1)'; });
      const alt = document.querySelector('[data-line-alt]');
      const time = document.querySelector('[data-line-time]');
      if (alt) alt.textContent = fmtTime(1335);
      if (time) time.textContent = '11:20';
  } else {
    if (document.readyState === 'complete') {
      init();
    } else {
      const onLoad = () => init();
      window.addEventListener('load', onLoad, { once: true });
      cleanups.push(() => window.removeEventListener('load', onLoad));
    }
  }

  return () => {
    cleanups.splice(0).forEach((fn) => { try { fn(); } catch {} });
  };
}
