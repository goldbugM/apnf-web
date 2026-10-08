// APNF — ported from MASSIF structure, content replaced (Leistungen)
const LEISTUNGEN = [
  { n: "01", name: "NOTFÄLLE DER HAUT", desc: "Akute Hauterkrankungen, Ausschläge, Infektionen — untersucht und behandelt bei Ihnen zu Hause.", spec: "HAUSBESUCH · NACH ABSPRACHE", img: "book-haut.jpg", alt: "Ärztliche Hände untersuchen die Haut eines Patienten" },
  { n: "02", name: "SCHMERZEN", desc: "Akute Schmerzzustände — wir kommen, untersuchen und lindern. Auch nachts und am Wochenende.", spec: "AKUT · RUND UM DIE UHR", img: "book-schmerz.jpg", alt: "Tröstende Hand auf der Schulter eines Patienten" },
  { n: "03", name: "ENTZÜNDUNGEN & INFEKTE", desc: "Fieber, Atemwegs- und Harnwegsinfekte, grippale Infekte — Diagnose und Therapie am Aufenthaltsort.", spec: "DIAGNOSE & THERAPIE · MOBIL", img: "book-infekt.jpg", alt: "Thermometer und Stethoskop auf einem Tisch" },
  { n: "04", name: "AKUTE KRANKHEITSFÄLLE", desc: "Plötzliche Beschwerden aller Art — wir bringen die Praxis zu Ihnen, mit moderner Apparatur.", spec: "MODERNE AUSSTATTUNG · BEI IHNEN", img: "book-akut.jpg", alt: "Notfallkoffer mit modernen Diagnostikgeräten" },
];
export default function Book() {
  return (
    <>
    <section id="book" className="book sec--light" data-bg="#F5F1EA" data-alt="1340">
      <div className="slate mono">
        <span>◮ WP 05 / 22:20</span>
        <span>(LEISTUNGEN)</span>
        <span>22:20 UHR</span>
      </div>
      <div className="book__head">
        <h2 className="display" data-lines="">
          <span className="l">Wofür Sie uns</span>
          <span className="l">
      rufen
            <em className="acc">können.</em>
          </span>
        </h2>
        <a className="chip mono" data-magnetic="" href="#contact">ALLE LEISTUNGEN ↗</a>
      </div>
      <div className="routes">
        {LEISTUNGEN.map((l, i) => (
          <article className={`route${i % 2 === 1 ? " route--offset" : ""}`} data-reveal="" key={l.n}>
            <div className="route__scene reveal-img" data-parallax="" data-speed={i % 2 === 1 ? "1.07" : "0.96"}>
              <img src={`/assets/apnf/${l.img}`} alt={l.alt} width="1586" height="992" decoding="async" />
            </div>
            <div className="route__info">
              <p className="route__n mono">({l.n})</p>
              <h3 className="route__name display">{l.name}</h3>
              <p className="route__desc">{l.desc}</p>
              <p className="route__spec mono">{l.spec}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
    </>
  );
}
