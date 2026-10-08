import "../legal.css";

export const metadata = { title: "Datenschutz — APNF Notdienst Frankfurt" };

export default function Datenschutz() {
  return (
    <main className="legal sec--dark">
      <a className="legal__back" href="/">← ZURÜCK ZUR STARTSEITE</a>
      <h1>Datenschutzerklärung</h1>
      <h2>1. Datenschutz auf einen Blick</h2>
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir behandeln Ihre
        Daten vertraulich und entsprechend der gesetzlichen
        Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.
      </p>
      <h2>2. Erhebung von Daten beim Besuch der Website</h2>
      <p>
        Beim Aufruf unserer Website werden durch den Browser automatisch
        Informationen an den Server gesendet (Server-Logfiles). Dies umfasst
        IP-Adresse, Datum und Uhrzeit der Anfrage sowie Browsertyp. Diese Daten
        dienen der technischen Bereitstellung der Seite und werden nicht mit
        anderen Datenquellen zusammengeführt.
      </p>
      <h2>3. Ärztliche Schweigepflicht &amp; Patientendaten</h2>
      <p>
        Gesundheitsdaten fallen unter den besonderen Schutz der DSGVO (Art. 9)
        und der ärztlichen Schweigepflicht. Patientendaten werden ausschließlich
        im Rahmen der Behandlung und Abrechnung verarbeitet und niemals über
        diese Website erhoben oder gespeichert.
      </p>
      <h2>4. Ihre Rechte</h2>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <h2>5. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung.
        Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der
        Browserzeile.
      </p>
      <h2>6. Kontakt</h2>
      <p>
        Fragen zum Datenschutz? Rufen Sie uns an:{" "}
        <a href="tel:018022744">0180 – 22 7 44</a>.
      </p>
    </main>
  );
}
