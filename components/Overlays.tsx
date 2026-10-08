// APNF — ported from MASSIF structure; altitude HUD became the evening clock
export default function Overlays() {
  return (
    <>
    <div className="grain" aria-hidden="true" />
    <div className="cursor" aria-hidden="true" />
    <div className="hud mono" aria-hidden="true">
      UHR
      <span data-hud-alt="">19:32</span>
    </div>
    <div className="rail" data-rail="">
      <span className="rail__line" aria-hidden="true" />
      <span className="rail__paid" aria-hidden="true" />
      <span className="rail__marker" aria-hidden="true">
        <span className="rail__label mono" data-rail-label="">WP 01</span>
      </span>
    </div>
    <div className="loader" role="status" aria-label="Loading">
      <p className="loader__brand mono">APNF — NOTDIENST FRANKFURT</p>
      <p className="loader__alt mono">
        <span data-count="">19:00</span>
      </p>
      <span className="loader__line" aria-hidden="true" />
    </div>
    </>
  );
}
