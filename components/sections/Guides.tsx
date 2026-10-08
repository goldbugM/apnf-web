// APNF — ported from MASSIF structure, content replaced
const DOCTORS = [
  { no: "01", name: "Dr. Katharina Weber", role: "FACHÄRZTIN INN. MEDIZIN — FRANKFURT", img: "guide-arzt-01.jpg", spec: ["SEIT 1998 IM DIENST · HAUSBESUCHE", "SCHWERPUNKT — INNERE MEDIZIN, KARDIOLOGIE", "Notfallmedizin mit Herz. Kennt jede Patientenakte auswendig."] },
  { no: "02", name: "Dr. Michael Berger", role: "FACHARZT ALLGEMEINMEDIZIN — OFFENBACH", img: "guide-arzt-02.jpg", spec: ["SEIT 1992 IM DIENST · HAUSBESUCHE", "SCHWERPUNKT — HAUSÄRZTLICHE NOTFÄLLE", "Drei Jahrzehnte Hausbesuche. Ruft jeder Patient beim Vornamen."] },
  { no: "03", name: "Dr. Amira Al-Sayed", role: "FACHÄRZTIN INN. MEDIZIN — HANAU", img: "guide-arzt-03.jpg", spec: ["SEIT 2008 IM DIENST · HAUSBESUCHE", "SCHWERPUNKT — AKUTE INFEKTE, DERMATOLOGIE", "Ruhig, präzise, und immer mit einem guten Wort für die Angehörigen."] },
  { no: "04", name: "Dr. Jonas Rothmann", role: "FACHARZT ANÄSTHESIE — WIESBADEN", img: "guide-arzt-04.jpg", spec: ["SEIT 2004 IM DIENST · HAUSBESUCHE", "SCHWERPUNKT — SCHMERZTHERAPIE, NOTFALLMEDIZIN", "Wenn der Schmerz nachts kommt, ist er zur Stelle — mit Plan."] },
  { no: "05", name: "Dr. Elisabeth Hoffmann", role: "FACHÄRZTIN INN. MEDIZIN — BAD HOMBURG", img: "guide-arzt-05.jpg", spec: ["SEIT 1990 IM DIENST · HAUSBESUCHE", "SCHWERPUNKT — BETREUUNG ÄLTERER PATIENTEN", "Die liebevolle Stimme am Telefon, wenn Sorge anruft."] },
];
export default function Guides() {
  return (
    <>
    <section id="guides" className="guides sec--dark" data-bg="#171210" data-alt="1205">
      <div className="slate mono">
        <span>◮ WP 03 / 20:05</span>
        <span>(DAS ÄRZTETEAM)</span>
        <span>20:05 UHR</span>
      </div>
      <div className="guides__grid">
        <div className="guides__col">
          <h2 className="guides__title display" data-lines="">
            <span className="l">Erfahrene Fachärzte.</span>
            <span className="l">
              Jeder mit
              <em className="acc"> Routine.</em>
            </span>
          </h2>
          <ol className="roster">
            {DOCTORS.map((d) => (
              <li className="guide" data-guide="" key={d.no}>
                <p className="guide__no mono">{d.no}</p>
                <h3 className="guide__name display">{d.name}</h3>
                <p className="guide__role mono">{d.role}</p>
              </li>
            ))}
          </ol>
          <a className="chip chip--dark mono" data-magnetic="" href="#contact">DAS GESAMTE TEAM ↗</a>
        </div>
        <aside className="guides__plate">
          <div className="plate__stack">
            {DOCTORS.map((d) => (
              <figure className="plate__img" data-plate="" key={d.no}>
                <img src={`/assets/apnf/${d.img}`} width="1024" height="1536" loading="lazy" decoding="async" alt={`${d.name} im Portrait`} />
              </figure>
            ))}
            <div className="plate__scrim" aria-hidden="true" />
            <div className="plate__specs mono">
              {DOCTORS.map((d) => (
                <div className="spec" data-spec="" key={d.no}>
                  <p>{d.spec[0]}</p>
                  <p>{d.spec[1]}</p>
                  <p className="spec__note">{d.spec[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
    </>
  );
}
