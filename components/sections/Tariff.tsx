// APNF — ported from MASSIF structure, content replaced (Kosten)
export default function Tariff() {
  return (
    <>
    <section id="tariff" className="tariff sec--light" data-bg="#F5F1EA" data-alt="1370">
      <div className="slate mono">
        <span>◮ WP 07 / 22:50</span>
        <span>(KOSTEN & ABRECHNUNG)</span>
        <span>22:50 UHR</span>
      </div>
      <div className="tariff__boards">
        <article className="board" data-board="">
          <header className="board__head">
            <p className="board__code mono">K — 01</p>
            <h3 className="board__name display">Selbstzahler</h3>
            <p className="board__blurb">Transparent und unkompliziert: Wir behandeln Sie direkt vor Ort, ganz ohne bürokratische Hürden.</p>
          </header>
          <p className="board__price display">
            Individuell
            <span className="board__unit mono">/ EINSATZ</span>
          </p>
          <p className="board__per mono">NACH ART & UMFANG DES EINSATZES</p>
          <p className="board__label mono">SO FUNKTIONIERT ES</p>
          <ul className="board__list mono">
            <li>Anruf & kurze Schilderung der Beschwerden</li>
            <li>Terminabsprache oder direkter Hausbesuch</li>
            <li>Behandlung bei Ihnen vor Ort</li>
            <li>Kostenvoranschlag auf Anfrage</li>
          </ul>
          <dl className="board__terms mono">
            <div>
              <dt>ZAHLUNG</dt>
              <dd>VOR ORT</dd>
            </div>
            <div>
              <dt>RECHNUNG</dt>
              <dd>ERHALTEN SIE SOFORT</dd>
            </div>
            <div>
              <dt>TERMIN</dt>
              <dd>NACH ABSPRACHE</dd>
            </div>
          </dl>
          <a className="cta mono" data-magnetic="" href="tel:018022744">
            ANRUFEN
            <span aria-hidden="true">↗</span>
          </a>
        </article>
        <article className="board board--flag" data-board="">
          <p className="board__flagtag mono">HÄUFIG GEFRAGT</p>
          <header className="board__head">
            <p className="board__code mono">K — 02</p>
            <h3 className="board__name display">Privatpatienten</h3>
            <p className="board__blurb">Als privatärztlicher Notdienst rechnen wir direkt mit Ihrer privaten Krankenversicherung ab — GOÄ-konform.</p>
          </header>
          <p className="board__price display">
            GOÄ
            <span className="board__unit mono">/ ABRECHNUNG</span>
          </p>
          <p className="board__per mono">NACH GEBÜHRENORDNUNG FÜR ÄRZTE</p>
          <p className="board__label mono">SO FUNKTIONIERT ES</p>
          <ul className="board__list mono">
            <li>Behandlung nach neuestem medizinischem Standard</li>
            <li>Rechnung direkt an Sie oder Ihre Versicherung</li>
            <li>Übernahme der Kostenerstattung je nach Tarif</li>
            <li>Wir beraten Sie gern zu Ihrer Deckung</li>
          </ul>
          <dl className="board__terms mono">
            <div>
              <dt>ABRECHNUNG</dt>
              <dd>GOÄ</dd>
            </div>
            <div>
              <dt>ZAHLUNG</dt>
              <dd>ÜBER VERSICHERUNG</dd>
            </div>
            <div>
              <dt>AUSWEIS</dt>
              <dd>BITTE BEREITLEGEN</dd>
            </div>
          </dl>
          <a className="cta mono" data-magnetic="" href="tel:018022744">
            ANRUFEN
            <span aria-hidden="true">↗</span>
          </a>
        </article>
        <article className="board" data-board="">
          <header className="board__head">
            <p className="board__code mono">K — 03</p>
            <h3 className="board__name display">Notfall? Immer.</h3>
            <p className="board__blurb">Bei akuten, möglicherweise lebensbedrohlichen Situationen zählt jede Minute — die Kosten klären wir später.</p>
          </header>
          <p className="board__price display">
            Sofort
            <span className="board__unit mono">/ HILFE</span>
          </p>
          <p className="board__per mono">BEI NOTFÄLLEN JEDERZEIT ERREICHBAR</p>
          <p className="board__label mono">WICHTIG ZU WISSEN</p>
          <ul className="board__list mono">
            <li>Lebensbedrohlicher Notfall? Zuerst die 112</li>
            <li>Akut, aber nicht lebensbedrohlich? Wir kommen</li>
            <li>Einsatzgebiet: Frankfurt & das gesamte Rhein-Main-Gebiet</li>
            <li>Auch nachts, Wochenenden & Feiertage</li>
          </ul>
          <dl className="board__terms mono">
            <div>
              <dt>NOTRUF</dt>
              <dd>112</dd>
            </div>
            <div>
              <dt>APNF</dt>
              <dd>0180 22 7 44</dd>
            </div>
            <div>
              <dt>ERREICHBAR</dt>
              <dd>24 / 7</dd>
            </div>
          </dl>
          <a className="cta mono" data-magnetic="" href="tel:018022744">
            JETZT ANRUFEN
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </section>
    </>
  );
}
