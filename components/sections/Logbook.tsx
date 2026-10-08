// APNF — ported from MASSIF structure, content replaced (Einsatz-Log)
const LOG = [
  { y: "2026", r: "HAUTNOTFALL — SACHSENHAUSEN", g: "DERM", o: "BEHANDELT 22:41", t1: "book-haut.jpg", t2: "bureau-diagnose.jpg" },
  { y: "2026", r: "AKUTER INFEKT — BORNHEIM", g: "INF", o: "FIEBER GESENKT 21:58", t1: "book-infekt.jpg", t2: "bureau-technik.jpg" },
  { y: "2026", r: "STARKER SCHMERZ — WESTEND", g: "SCHM", o: "LINDERUNG 20:37", t1: "book-schmerz.jpg", t2: "bureau-hausruf.jpg" },
  { y: "2025", r: "KREISLAUFNOTFALL — NIEDERRAD", g: "INT", o: "STABILISIERT 23:12", t1: "book-akut.jpg", t2: "line-behandlung.jpg" },
  { y: "2025", r: "NACHSORGE — BAD HOMBURG", g: "NACH", o: "BETREUT 19:45", t1: "disc-betreuung.jpg", t2: "line-entlastung.jpg" },
  { y: "2025", r: "ATEMNOT — OFFENBACH", g: "INT", o: "BEHANDELT 21:04", t1: "book-infekt.jpg", t2: "disc-ausstattung.jpg" },
  { y: "2025", r: "SCHWINDEL — HANAU", g: "INT", o: "ABGEKLÄRT 20:26", t1: "book-akut.jpg", t2: "line-ankunft.jpg" },
  { y: "2024", r: "NOTFALL — WIESBADEN", g: "INT", o: "WEITERBEHANDLUNG EINGELEITET", t1: "book-akut.jpg", t2: "bureau-technik.jpg" },
];
export default function Logbook() {
  return (
    <>
    <section id="log" className="log sec--dark" data-bg="#171210" data-alt="1395">
      <div className="slate mono">
        <span>◮ WP 08 / 23:15</span>
        <span>(DER EINSATZLOG)</span>
        <span>23:15 UHR</span>
      </div>
      <p className="log__note mono" data-reveal="">JEDER EINSATZ, JEDES ERGEBNIS. DISKRET VEREINNAHMT.</p>
      <div className="log__table">
        {LOG.map((l) => (
          <div className="row" data-reveal="" key={l.r}>
            <span className="row__y mono">{l.y}</span>
            <span className="row__r display">{l.r}</span>
            <span className="row__g mono">{l.g}</span>
            <span className={`row__o mono${l.o.includes("WEITER") ? " row__o--ret" : ""}`}>{l.o}</span>
            <span className="row__thumbs" aria-hidden="true">
              <img src={`/assets/apnf/${l.t1}`} alt="" width="960" height="640" loading="lazy" decoding="async" />
              <img src={`/assets/apnf/${l.t2}`} alt="" width="960" height="640" loading="lazy" decoding="async" />
            </span>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
