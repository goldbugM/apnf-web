import "../legal.css";

export const metadata = { title: "Impressum — APNF Notdienst Frankfurt" };

export default function Impressum() {
  return (
    <main className="legal sec--dark">
      <a className="legal__back" href="/">← ZURÜCK ZUR STARTSEITE</a>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 TMG</h2>
      <address>
        Ambulanter Privatärztlicher Notdienst Frankfurt e.V.<br />
        Hanauer Landstraße 204<br />
        60314 Frankfurt am Main
      </address>
      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:018022744">0180 – 22 7 44</a><br />
        Fax: 069 – 90 28 38 99
      </p>
      <h2>Praxis</h2>
      <p>
        Dresdner Straße 11<br />
        63179 Obertshausen<br />
        Vorwiegend: Hausbesuche
      </p>
      <h2>Einsatzgebiet</h2>
      <p>
        Frankfurt, Wiesbaden, Hanau, Stadt Offenbach, Kreis Offenbach,
        Hochtaunus-Kreis, Main-Taunus-Kreis, Wetterau-Kreis sowie das gesamte
        Rhein-Main-Gebiet.
      </p>
      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine
        Gewähr übernommen werden. Diese Website ersetzt keine ärztliche Beratung —
        im Akutfall rufen Sie uns an, bei lebensbedrohlichen Notfällen die 112.
      </p>
    </main>
  );
}
