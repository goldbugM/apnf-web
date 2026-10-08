// APNF — ported from MASSIF structure, content replaced (do not rename classes/ids/data-attrs)
export default function Hero() {
  return (
    <>
    <section className="hero sec--dark" data-bg="#171210" data-alt="1172">
      <div className="hero__sky" aria-hidden="true">
        {/* Same frame, two moods: evening is what loads; the warm daylight
             replica fades up over the first stretch of scroll — night becomes
             day, worry becomes relief. */}
        <img className="hero__photo hero__photo--night" src="/assets/apnf/hero-frankfurt.jpg" width="2400" height="1340" fetchPriority="high" decoding="async" alt="" />
        <img className="hero__photo hero__photo--day" src="/assets/apnf/hero-frankfurt.jpg" width="2400" height="1340" decoding="async" alt="" />
        <div className="hero__shade" />
      </div>
      <div className="hero__copy">
        <h1 className="visually-hidden">APNF — Ambulanter privatärztlicher Notdienst Frankfurt e.V.</h1>
        <p className="hero__tag" data-lines="">
          <span className="l">Sie anrufen. Wir kommen.</span>
          <span className="l">Auch nachts. Auch am Wochenende.</span>
          <span className="l">Der Arzt kommt zu Ihnen nach Hause.</span>
        </p>
        <a className="cta mono" data-magnetic="" href="tel:018022744">
          JETZT ANRUFEN — 0180 22 7 44
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="hero__cue mono" data-reveal="">BEGINNEN SIE DEN SCROLL ↓</p>
      <img className="wordmark wordmark--logo" src="/assets/apnf/logo-banner-transparent.png" alt="APNF — Ambulanter privatärztlicher Notdienst Frankfurt e.V." aria-hidden="true" decoding="async" />
    </section>
    </>
  );
}
