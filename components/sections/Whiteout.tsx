// APNF — ported from MASSIF structure, content replaced
export default function Whiteout() {
  return (
    <>
    <section className="whiteout" data-bg="#F5F1EA" data-alt="1380">
      <div className="whiteout__bg" aria-hidden="true">
        <img className="whiteout__img" src="/assets/apnf/turnaround-main.jpg" alt="" decoding="async" />
        <div className="whiteout__veil" />
      </div>
      <div className="whiteout__inner">
        <p className="whiteout__tag mono">(NACH DEM EINSATZ) — 23:00</p>
        <p className="whiteout__line display" data-whiteout="">
          <em className="acc">Ruhe</em>
     ist Teil der Therapie.
        </p>
        <dl className="whiteout__stats mono">
          <div>
            <dt>EINSATZ DAUERTE</dt>
            <dd>2 STUNDEN</dd>
          </div>
          <div>
            <dt>PATIENT VERSORGT</dt>
            <dd>ZU HAUSE</dd>
          </div>
          <div>
            <dt>NÄCHSTE ERREICHBARKEIT</dt>
            <dd>RUND UM DIE UHR</dd>
          </div>
        </dl>
      </div>
    </section>
    </>
  );
}
