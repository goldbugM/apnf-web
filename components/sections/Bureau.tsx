// APNF — ported from MASSIF structure, content replaced
type Stat = { n: number; label: string; note: string; unit?: string };
const STATS: Stat[] = [
  { n: 30, label: "JAHRE ERFAHRUNG", note: "Fachärztliche Versorgung im Rhein-Main-Gebiet seit über drei Jahrzehnten." },
  { n: 9, label: "EINSATZGEBIETE", note: "Von Frankfurt über Wiesbaden bis Wetterau — wir kommen zu Ihnen." },
  { n: 24, label: "STUNDEN ERREICHBAR", note: "Rund um die Uhr — auch nachts, am Wochenende und an Feiertagen." },
  { n: 100, label: "% HAUSBESUCH", note: "Wir kommen an Ihren Aufenthaltsort — mit moderner Apparatur.", unit: "%" },
];
export default function Bureau() {
  return (
    <>
    <section id="bureau" className="bureau sec--dark" data-bg="#171210" data-alt="1190">
      <div className="slate mono">
        <span>◮ WP 02 / 19:50</span>
        <span>(DER DIENST)</span>
        <span>19:50 UHR</span>
      </div>
      <h2 className="manifesto display" data-lines="">
        <span className="l">Nah dran, wenn es zählt.</span>
        <span className="l">
          Der Notfall ist unser
          <em className="acc"> Normalfall.</em>
        </span>
      </h2>
      <div className="pitches">
        <article className="pitch" data-pitch="">
          <figure className="pitch__media">
            <img src="/assets/apnf/bureau-hausruf.jpg" width="1536" height="1024" loading="lazy" decoding="async" alt="Ärztin mit Aktenkoffer vor einer Wohnungstür am Abend" />
          </figure>
          <div className="pitch__body">
            <p className="pitch__label mono">
              <span>(DER ANRUF)</span>
              <span className="pitch__n">SCHRITT 01 / 03</span>
            </p>
            <h3 className="pitch__title display">
              Ein Anruf.
              <br />
              Wir übernehmen.
            </h3>
            <p className="pitch__text">
              Sie schildern Ihre Beschwerden — wir entscheiden gemeinsam, wie schnell wir kommen. Ohne Wartezimmer, ohne Anfahrt, ohne Stress.
            </p>
            <p className="pitch__spec mono">ERREICHBAR — RUND UM DIE UHR</p>
          </div>
        </article>
        <article className="pitch" data-pitch="">
          <figure className="pitch__media">
            <img src="/assets/apnf/bureau-diagnose.jpg" width="1536" height="1024" loading="lazy" decoding="async" alt="Ärztin untersucht eine ältere Patientin zu Hause beim Hausbesuch" />
          </figure>
          <div className="pitch__body">
            <p className="pitch__label mono">
              <span>(DER HAUSBESUCH)</span>
              <span className="pitch__n">SCHRITT 02 / 03</span>
            </p>
            <h3 className="pitch__title display">
              Diagnose
              <br />
              bei Ihnen zu Hause.
            </h3>
            <p className="pitch__text">
              Ob Entzündung, Schmerz oder akute Erkrankung: Wir untersuchen und behandeln Sie am Ort Ihres Aufenthalts — mit professioneller Apparatur nach neuestem Stand.
            </p>
            <p className="pitch__spec mono">AUSSTATTUNG — MODERN & MOBIL</p>
          </div>
        </article>
        <article className="pitch" data-pitch="">
          <figure className="pitch__media">
            <img src="/assets/apnf/bureau-technik.jpg" width="1536" height="1024" loading="lazy" decoding="async" alt="Moderne mobile Diagnostik-Geräte in warmem Licht" />
          </figure>
          <div className="pitch__body">
            <p className="pitch__label mono">
              <span>(DIE WEITERBILDUNG)</span>
              <span className="pitch__n">SCHRITT 03 / 03</span>
            </p>
            <h3 className="pitch__title display">
              Erfahrung,
              <br />
              nie fertig.
            </h3>
            <p className="pitch__text">
              Jede Ärztin, jeder Arzt in unserem Team wird fortwährend geschult. Regelmäßige Weiterbildungen sichern den aktuellsten Wissensstand — für Ihre bestmögliche Versorgung.
            </p>
            <p className="pitch__spec mono">FORTBILDUNG — FORTLAUFEND, FÜR ALLE</p>
          </div>
        </article>
      </div>
      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" data-reveal="" key={s.label}>
            <p className="stat__n display">
              <span data-count-to={s.n}>0</span>
              {s.unit ? <span className="stat__unit">{s.unit}</span> : null}
            </p>
            <p className="stat__label mono">{s.label}</p>
            <p className="stat__note">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
