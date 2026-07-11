export default function Footer() {
  return (
    <>
      <div className="marquee-bar">
        <div className="marquee-track">
          {Array(8).fill(null).map((_, i) => (
            <span key={i}>
            PIDA-LAB · AI Identity · Decision Structure · Human Autonomy · Long-Term Human–AI Relations · Responsibility &amp; Governance ·&nbsp;
            </span>
          ))}
        </div>
      </div>
      <div className="footer-wrap">
        <div className="footer-brand"><em>PIDA</em>-LAB &nbsp;·&nbsp; Rethinking AI Systems, Decision &amp; Responsibility</div>
        <div className="footer-copy">© {new Date().getFullYear()} PIDA-LAB. All rights reserved.</div>
      </div>
    </>
  )
}
