// APNF — ported from MASSIF structure, content replaced
const DISC = [
  { no: "01", tag: "/ HB", spec: ["RUND UM DIE UHR", "AUCH AN FEIERTAGEN"], img: "disc-hausbesuch.jpg", name: "DER HAUSBESUCH", desc: "Wir kommen zu Ihnen — ob Wohnung, Pflegeheim oder Hotel. Untersuchen, behandeln, beruhigen: alles am Ort Ihres Aufenthalts.", from: "NACH", price: "Vereinbarung", unit: "/ EINSATZ", link: "#tariff", linktxt: "MEHR ERFAHREN" },
  { no: "02", tag: "/ BT", spec: ["NACH LEBENSBEDROHLICHEN", "ERKRANKUNGEN"], img: "disc-betreuung.jpg", name: "NACHSORGE", desc: "Ärztliche Betreuung nach lebensbedrohlichen Erkrankungen — damit der Weg zurück in den Alltag sicher begleitet wird.", from: "AUF", price: "Anfrage", unit: "/ PLAN", link: "#contact", linktxt: "ANFRAGEN" },
  { no: "03", tag: "/ AT", spec: ["STAND DER TECHNIK", "REGELMÄSSIG ERNEUERT"], img: "disc-ausstattung.jpg", name: "MODERNE AUSSTATTUNG", desc: "Mobile Diagnostik nach neuestem Stand der Technik — vom EKG bis Ultraschall. Die Praxis kommt mit ins Haus.", from: "INBEGRIFFEN", price: "Immer", unit: "", link: "#book", linktxt: "LEISTUNGEN" },
];
export default function Disciplines() {
  return (
    <>
    <section id="disciplines" className="disciplines sec--light" data-bg="#F5F1EA" data-alt="1360">
      <div className="slate mono">
        <span>◮ WP 06 / 22:40</span>
        <span>(DIE VERSORGUNG)</span>
        <span>22:40 UHR</span>
      </div>
      {DISC.map((d) => (
        <div className="disc" data-disc="" key={d.no}>
          <p className="disc__no mono">
            <span className="disc__dot" aria-hidden="true" />
            {d.no}
            <em>{d.tag}</em>
          </p>
          <p className="disc__spec mono">
            {d.spec[0]}
            <br />
            {d.spec[1]}
          </p>
          <figure className="disc__media reveal-img" aria-hidden="true">
            <img src={`/assets/apnf/${d.img}`} alt="" width="1536" height="1024" decoding="async" />
          </figure>
          <div className="disc__text">
            <h3 className="disc__name display">{d.name}</h3>
            <p className="disc__desc">{d.desc}</p>
          </div>
          <div className="disc__offer">
            <p className="disc__from mono">{d.from}</p>
            <p className="disc__price display">
              {d.price}
              {d.unit ? <span className="disc__unit mono">{d.unit}</span> : null}
            </p>
            <a className="disc__link mono" href={d.link}>
              {d.linktxt}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      ))}
    </section>
    </>
  );
}
