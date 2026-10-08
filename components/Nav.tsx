// APNF — ported from MASSIF structure, content replaced
export default function Nav() {
  return (
    <>
    <header className="nav">
      <a className="nav__brand" href="#top">APNF</a>
      <nav className="nav__links mono" aria-label="Sections">
        <a href="#bureau">
          DER DIENST
          <sup>02</sup>
        </a>
        <a href="#guides">
          ÄRZTE
          <sup>03</sup>
        </a>
        <a href="#line">
          DER EINSATZ
          <sup>04</sup>
        </a>
        <a href="#book">
          LEISTUNGEN
          <sup>05</sup>
        </a>
        <a href="#disciplines">
          VERSORGUNG
          <sup>06</sup>
        </a>
        <a href="#tariff">
          KOSTEN
          <sup>07</sup>
        </a>
        <a href="#contact">
          KONTAKT
          <sup>12</sup>
        </a>
      </nav>
    </header>
    </>
  );
}
