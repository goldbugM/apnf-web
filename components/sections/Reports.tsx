// APNF — ported from MASSIF structure, content replaced (Live-Einsatzboard)
export default function Reports() {
  return (
    <>
    <section className="reports sec--dark" data-bg="#171210" data-alt="1425">
      <div className="slate mono">
        <span>◮ WP 10 / 23:45</span>
        <span>(AKTUELLE EINSÄTZE)</span>
        <span>23:45 UHR</span>
      </div>
      <div className="live">
        <div className="live__head">
          <p className="live__title mono">
      JETZT IM EINSATZ
            <span className="live__count">— 3 TEAMS</span>
          </p>
          <p className="live__ping mono">
            <span className="live__dot" aria-hidden="true" />
      LETZTE MELDUNG 23:41
          </p>
        </div>
        <div className="live__cols mono" aria-hidden="true">
          <span>EINSATZ</span>
          <span>ARZT</span>
          <span>PATIENT</span>
          <span>FORTSCHRITT</span>
          <span>STATUS</span>
          <span>UHR</span>
        </div>
        <div className="live__row" data-reveal="" data-p=".62">
          <span className="live__route display">Frankfurt — Sachsenhausen</span>
          <span className="live__guide mono">DR. WEBER</span>
          <span className="live__party mono">×1</span>
          <span className="track" aria-hidden="true">
            <span className="track__fill" />
            <span className="track__pin" />
          </span>
          <span className="live__state mono is-push">UNTERSUCHUNG</span>
          <span className="live__alt mono">23:32</span>
          <span className="live__note">Hautnotfall. Patient stabil, Behandlung läuft.</span>
        </div>
        <div className="live__row" data-reveal="" data-p=".80">
          <span className="live__route display">Offenbach — Tempelsee</span>
          <span className="live__guide mono">DR. ROTHMANN</span>
          <span className="live__party mono">×1</span>
          <span className="track" aria-hidden="true">
            <span className="track__fill" />
            <span className="track__pin" />
          </span>
          <span className="live__state mono is-top">ABGESCHLOSSEN</span>
          <span className="live__alt mono">23:20</span>
          <span className="live__note">Schmerz gelindert. Patient kann schlafen.</span>
        </div>
        <div className="live__row" data-reveal="" data-p=".91">
          <span className="live__route display">Wiesbaden — Westend</span>
          <span className="live__guide mono">DR. AL-SAYED</span>
          <span className="live__party mono">×2</span>
          <span className="track" aria-hidden="true">
            <span className="track__fill" />
            <span className="track__pin" />
          </span>
          <span className="live__state mono is-down">RÜCKKEHR</span>
          <span className="live__alt mono">23:05</span>
          <span className="live__note">Infekt behandelt, Fieber gesenkt. Team unterwegs zurück.</span>
        </div>
        <p className="live__scale mono">STATIONEN — ANRUF / BERATUNG / UNTERWEGS / BEHANDLUNG / ABGESCHLOSSEN</p>
      </div>
      <p className="board__label mono" data-reveal="">ZULETZT</p>
      <div className="bulletin">
        <div className="bulletin__head mono">
          <span>DATUM</span>
          <span>EINSATZ</span>
          <span>STATUS</span>
          <span>ANMERKUNG</span>
        </div>
        <div className="bulletin__row" data-reveal="">
          <span className="bulletin__date mono">06 OKT</span>
          <span className="bulletin__route display">Bornheim</span>
          <span className="bulletin__status mono is-good">VERSORGT</span>
          <span className="bulletin__note">Akuter Infekt, Fieber 39,2 °C. Nach 90 Minuten entfiebert.</span>
        </div>
        <div className="bulletin__row" data-reveal="">
          <span className="bulletin__date mono">05 OKT</span>
          <span className="bulletin__route display">Bad Homburg</span>
          <span className="bulletin__status mono is-good">VERSORGT</span>
          <span className="bulletin__note">Nachsorge nach Klinikaufenthalt. Patientin wohlauf.</span>
        </div>
        <div className="bulletin__row" data-reveal="">
          <span className="bulletin__date mono">04 OKT</span>
          <span className="bulletin__route display">Frankfurt — Westend</span>
          <span className="bulletin__status mono is-warn">KLINIK EMPFOHLEN</span>
          <span className="bulletin__note">Kreislaufbeschwerden. Zur Sicherheit stationäre Abklärung — Patient zugestimmt.</span>
        </div>
        <div className="bulletin__row" data-reveal="">
          <span className="bulletin__date mono">02 OKT</span>
          <span className="bulletin__route display">Hanau</span>
          <span className="bulletin__status mono is-good">VERSORGT</span>
          <span className="bulletin__note">Schwindel abgeklärt, harmlose Ursache. Patient beruhigt.</span>
        </div>
        <div className="bulletin__row" data-reveal="">
          <span className="bulletin__date mono">01 OKT</span>
          <span className="bulletin__route display">Frankfurt — Nordend</span>
          <span className="bulletin__status mono is-good">VERSORGT</span>
          <span className="bulletin__note">Hohes Fieber bei Nacht. Einsatzdauer 75 Minuten.</span>
        </div>
      </div>
      <p className="bulletin__foot mono" data-reveal="">DISKRETION: ORTE ANONYMISIERT — ERGEBNISSE EHRLICH</p>
    </section>
    </>
  );
}
