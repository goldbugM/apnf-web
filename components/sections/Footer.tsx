// APNF — ported from MASSIF structure, content replaced; real contact data
export default function Footer() {
  return (
    <>
    <footer id="contact" className="footer sec--dark" data-bg="#100C0A" data-alt="1439">
      <div className="slate mono">
        <span>◮ WP 12 / 23:59</span>
        <span>(SIE SIND NICHT ALLEIN)</span>
        <span>24 / 7 ERREICHBAR</span>
      </div>
      <h2 className="footer__line display" data-lines="">
        <span className="l">
     Ihre Gesundheit
          <em className="acc"> hält uns wach.</em>
        </span>
      </h2>
      <a className="footer__mail display" data-magnetic="" href="tel:018022744">0180 – 22 7 44</a>
      <div className="footer__meta mono">
        <div className="footer__addr">
          <p>
      AMBULANTER PRIVATÄRZTLICHER
            <br />
      NOTDIENST FRANKFURT E.V.
            <br />
      HANAUER LANDSTR. 204
            <br />
      60314 FRANKFURT AM MAIN
          </p>
          <p className="footer__tel">
            <a href="tel:018022744">T 0180 – 22 7 44</a>
            <br />
            <span>FAX 069 – 90 28 38 99</span>
            <br />
            <span>PRAXIS: DRESDNER STR. 11, 63179 OBERTSHAUSEN</span>
          </p>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <a href="#bureau">DER DIENST</a>
          <a href="#line">DER EINSATZ</a>
          <a href="#book">LEISTUNGEN</a>
          <a href="#tariff">KOSTEN</a>
          <a href="#log">EINSATZLOG</a>
          <a href="/impressum">IMPRESSUM</a>
          <a href="/datenschutz">DATENSCHUTZ</a>
        </nav>
        <div className="footer__end">
          <video src="/assets/apnf/logo-anim-web.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="APNF — Ambulanter privatärztlicher Notdienst Frankfurt e.V." style={{ width: "clamp(96px, 11vw, 150px)", height: "auto", borderRadius: ".35rem", margin: "0 0 .9rem", display: "block" }} />
          <p className="footer__wp">
      EINSATZGEBIET — RHEIN-MAIN
            <br />
      © 2026 — SEIT ÜBER 30 JAHREN
          </p>
        </div>
      </div>
      <div className="wordmark wordmark--footer" aria-hidden="true">APNF</div>
    </footer>
    </>
  );
}
