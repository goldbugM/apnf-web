// APNF — ported from MASSIF structure. The frame-sequence canvas is replaced
// by a still plate; choreography scrubs the text beats on plain scroll.
export default function Vista() {
  return (
    <>
    <section className="vista" data-alt="1350" aria-label="Der Blick auf Frankfurt">
      <div className="vista__clip">
        <img className="vista__img vista__still" src="/assets/apnf/vista-frankfurt.jpg" alt="Frankfurter Skyline im warmen Morgenlicht" aria-hidden="true" />
        <video className="vista__img vista__film" src="/assets/apnf/hero-video-v2.mp4" data-portrait="/assets/apnf/vista-film-portrait.mp4" muted loop playsInline preload="auto" poster="/assets/apnf/vista-frankfurt.jpg" aria-hidden="true" />
        <div className="vista__shade" aria-hidden="true" />
        <span className="vista__cross" style={{ left: "16%", top: "24%" }} aria-hidden="true" />
        <span className="vista__cross" style={{ right: "14%", bottom: "28%" }} aria-hidden="true" />
        <p className="vista__label mono">DER BLICK ÜBER FRANKFURT — 22:30 UHR</p>
        <p className="vista__line display" data-vista="0.07">
          <span>Es ist spät geworden.</span>
        </p>
        <p className="vista__line display" data-vista="0.31">
          <span>
            <span className="vista__l">Aber jemand</span>
            <span className="vista__l acc">ist da.</span>
          </span>
        </p>
        <p className="vista__line display" data-vista="0.80" data-vista-lines="" data-vista-hold="">
          <span>
            <span className="vista__l">Morgen früh</span>
            <span className="vista__l acc">geht es Ihnen besser.</span>
          </span>
        </p>
      </div>
    </section>
    </>
  );
}
