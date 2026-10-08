// APNF — ported from MASSIF structure, content replaced (Patientenstimme)
export default function Register() {
  return (
    <>
    <section className="register sec--light" data-bg="#F5F1EA" data-alt="1410">
      <div className="slate mono">
        <span>◮ WP 09 / 23:30</span>
        <span>(PATIENTENSTIMMEN)</span>
        <span>23:30 UHR</span>
      </div>
      <div className="register__grid">
        <div className="register__col">
          <blockquote className="register__quote display" data-words="">
      „Sonntagnacht, hohes Fieber, die Angst groß. Ein Anruf — und eine Stunde später saß die Ärztin am Bett meiner Mutter. Ruhig, freundlich, gründlich. Dafür gibt es kein Danke, das groß genug ist."
          </blockquote>
          <div className="register__foot" data-reveal="">
            <div className="register__sig">
              <p className="register__siglabel mono">GESCHRIEBEN NACH DEM EINSATZ</p>
              <p className="register__name display">Familie K.</p>
            </div>
            <dl className="register__meta mono">
              <div>
                <dt>EINSATZ</dt>
                <dd>SO., 02:10 UHR</dd>
              </div>
              <div>
                <dt>ORT</dt>
                <dd>FRANKFURT — NORDEND</dd>
              </div>
              <div>
                <dt>ANLASS</dt>
                <dd>HOHES FIEBER</dd>
              </div>
              <div>
                <dt>DAUER</dt>
                <dd>75 MINUTEN</dd>
              </div>
              <div>
                <dt>ÄRZTIN</dt>
                <dd>DR. K. WEBER</dd>
              </div>
              <div>
                <dt>ERGEBNIS</dt>
                <dd>PATIENTIN STABIL</dd>
              </div>
            </dl>
          </div>
        </div>
        <figure className="register__card" data-reveal="">
          <div className="register__drift">
            <div className="register__print">
              <div className="register__photo">
                <img src="/assets/apnf/register-handshake.jpg" alt="Dankbarer Händedruck zwischen Ärztin und Patientin" loading="lazy" decoding="async" />
              </div>
              <figcaption className="register__cap mono">
                <span>FRANKFURT — NORDEND</span>
                <span>02:10 UHR</span>
              </figcaption>
            </div>
          </div>
          <span className="register__stamp mono">EINSATZ GESCHLOSSEN — PATIENT STABIL</span>
        </figure>
      </div>
    </section>
    </>
  );
}
