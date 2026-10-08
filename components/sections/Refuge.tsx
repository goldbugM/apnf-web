// APNF — ported from MASSIF structure, content replaced (FAQ)
export default function Refuge() {
  return (
    <>
    <section className="refuge sec--dark" data-bg="#171210" data-alt="1430">
      <div className="refuge__bg" aria-hidden="true">
        <img className="refuge__img" src="/assets/apnf/refuge-abend.jpg" alt="" decoding="async" />
        <div className="refuge__scrim" />
      </div>
      <div className="slate mono">
        <span>◮ WP 11 / 23:50</span>
        <span>(HÄUFIGE FRAGEN)</span>
        <span>23:50 UHR</span>
      </div>
      <div className="refuge__grid">
        <div className="refuge__side">
          <p className="refuge__place mono" data-reveal="">
      AUCH UM MITTERNACHT
            <br />
      TELEFON BESetzt? WIR RUFEN ZURÜCK.
          </p>
        </div>
        <div className="refuge__panel">
          <h2 className="refuge__title display" data-reveal="">
      Alles, was Sie
            <br />
      wissen wollten
            <em className="acc"> vor dem Anruf.</em>
          </h2>
          <div className="faq">
            <details data-reveal="" open={true}>
              <summary>
        Wer kann den Notdienst rufen?
                <span className="faq__mark mono" aria-hidden="true">+</span>
              </summary>
              <p>
        Privatpatienten und Selbstzahler. Egal ob Entzündung, Schmerz, Hautproblem oder akuter Krankheitsfall — schildern Sie Ihre Beschwerden, wir kümmern uns um den Rest.
              </p>
            </details>
            <details data-reveal="">
              <summary>
        Wie schnell sind Sie bei mir?
                <span className="faq__mark mono" aria-hidden="true">+</span>
              </summary>
              <p>
        So schnell wie möglich und/oder nach Terminabsprache. Im Gespräch klären wir, wie dringend es ist — und kommen direkt zu Ihnen nach Hause.
              </p>
            </details>
            <details data-reveal="">
              <summary>
        Was kostet der Hausbesuch?
                <span className="faq__mark mono" aria-hidden="true">+</span>
              </summary>
              <p>
        Privatpatienten rechnen wir nach der GOÄ ab — meist übernimmt das Ihre Versicherung. Selbstzahler erhalten eine transparente Abrechnung direkt vor Ort.
              </p>
            </details>
            <details data-reveal="">
              <summary>
        Was ist bei lebensbedrohlichen Notfällen?
                <span className="faq__mark mono" aria-hidden="true">+</span>
              </summary>
              <p>
        Bei akuten, lebensbedrohlichen Situationen rufen Sie zuerst die 112. Wir sind die richtige Wahl, wenn es akut ist — aber nicht unmittelbar lebensbedrohlich.
              </p>
            </details>
            <details data-reveal="">
              <summary>
        Wohin kommt der Arzt?
                <span className="faq__mark mono" aria-hidden="true">+</span>
              </summary>
              <p>
        In unser komplettes Einsatzgebiet: Frankfurt, Wiesbaden, Hanau, Offenbach, Hochtaunus, Main-Taunus, Wetterau und das gesamte Rhein-Main-Gebiet.
              </p>
            </details>
          </div>
          <aside className="kit" data-reveal="">
            <p className="kit__title mono">BITTE BEREITLEGEN</p>
            <ul className="kit__list mono">
              <li>VERSICHERTENKARTE (PRIVAT)</li>
              <li>MEDIKAMENTENPLAN — AKTUELL</li>
              <li>ALLERGIEPASS</li>
              <li>IMPFAUSWEIS</li>
              <li>ENTLASSUNGSBRIEF (FALLS VORH.)</li>
              <li>PERSONALAUSWEIS</li>
            </ul>
            <a className="cta mono" data-magnetic="" href="tel:018022744">
      JETZT ANRUFEN
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
    </>
  );
}
