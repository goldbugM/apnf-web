// APNF — ported from MASSIF structure, content replaced
// The evening mission replaces the ascent: call → advice → en route →
// treatment → relief. Waypoints keep the original path geometry.
export default function LineSec() {
  return (
    <>
    <section id="line" className="line-sec" data-alt="1215">
      <div className="line-stage">
        <div className="line-imgs" aria-hidden="true">
          <figure className="line-img">
            <img src="/assets/apnf/line-anruf.jpg" alt="" width="1672" height="941" decoding="async" />
          </figure>
          <figure className="line-img" data-stage="1">
            <img src="/assets/apnf/line-unterwegs.jpg" alt="" width="1672" height="941" decoding="async" />
          </figure>
          <figure className="line-img" data-stage="2">
            <img src="/assets/apnf/line-ankunft.jpg" alt="" width="1535" height="1024" decoding="async" />
          </figure>
          <figure className="line-img" data-stage="3">
            <img src="/assets/apnf/line-behandlung.jpg" alt="" width="1536" height="1024" decoding="async" />
          </figure>
          <figure className="line-img" data-stage="4">
            <img src="/assets/apnf/line-entlastung.jpg" alt="" width="1536" height="1024" decoding="async" />
          </figure>
        </div>
        <div className="line-scrim" aria-hidden="true" />
        <div className="line-slate slate mono line-ui">
          <span>◮ WP 04 / 20:15 → 22:15</span>
          <span>(DER EINSATZ)</span>
          <span>20:15 → 22:15 UHR</span>
        </div>
        <svg className="profile" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <clipPath id="lineClip" clipPathUnits="userSpaceOnUse">
              <rect className="profile__reveal" x="0" y="0" width="0" height="600" />
            </clipPath>
          </defs>
          <g clipPath="url(#lineClip)">
            <path className="profile__path" d="M0,560 L110,538 L200,548 L320,472 L410,486 L520,398 L610,414 L740,308 L830,326 L950,238 L1050,254 L1180,150 L1270,172 L1400,62" fill="none" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        <div className="wp-marker line-ui" style={{ left: "22.2%", top: "78.6%" }}>
          <span className="wp-marker__dot" />
          <span className="wp-marker__label mono">ANRUF — 20:15</span>
        </div>
        <div className="wp-marker line-ui" style={{ left: "51.4%", top: "51.3%" }}>
          <span className="wp-marker__dot" />
          <span className="wp-marker__label mono">UNTERWEGS — 20:48</span>
        </div>
        <div className="wp-marker line-ui" style={{ left: "81.9%", top: "25.0%" }}>
          <span className="wp-marker__dot" />
          <span className="wp-marker__label mono">BEHANDLUNG — 21:30</span>
        </div>
        <div className="wp-marker wp-marker--summit line-ui" style={{ left: "97.2%", top: "10.3%" }}>
          <span className="wp-marker__dot" />
          <span className="wp-marker__label mono">ENTLASTET — 22:15</span>
        </div>
        <p className="drift drift--a display line-ui" aria-hidden="true">DIE SORGE AM ABEND</p>
        <p className="drift drift--b display line-ui" aria-hidden="true">DIE HILFE KOMMT AN</p>
        <div className="line-alt mono line-ui" aria-hidden="true">
          <p className="line-alt__n">
            <span data-line-alt="">19:32</span>
          </p>
          <p className="line-alt__t">
            <span data-line-time="">20:15</span>
          </p>
        </div>
        <div className="line-ticker mono line-ui" aria-hidden="true">
          <span>TEMP 36,7 °C</span>
          <span>PULS 78 /MIN</span>
          <span>RR 128/82</span>
          <span>SAO₂ 97 %</span>
        </div>
        <span className="line-progress" aria-hidden="true" />
      </div>
    </section>
    </>
  );
}
