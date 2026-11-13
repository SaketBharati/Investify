import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <section className="iv-clarity-section">
      <div className="container iv-clarity-layout">
        <div className="iv-clarity-heading">
          <p className="iv-section-label">Designed for understanding</p>
          <h2>More perspective.<br /><em>Less noise.</em></h2>
          <p>Markets move quickly. Your tools should make it easier to see what is happening across your own investing activity.</p>
          <Link to="/products" className="iv-text-link">See how the platform works <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link>
        </div>
        <div className="iv-clarity-notes">
          <div className="iv-clarity-note"><span className="iv-note-mark" aria-hidden="true">A</span><div><h3>See the whole picture</h3><p>Move between the watchlists, holdings, positions, orders and funds that make up your investing workflow.</p></div></div>
          <div className="iv-clarity-note"><span className="iv-note-mark" aria-hidden="true">B</span><div><h3>Follow your own priorities</h3><p>Use watchlists to keep the instruments you care about close at hand.</p></div></div>
          <div className="iv-clarity-note"><span className="iv-note-mark" aria-hidden="true">C</span><div><h3>Make room to learn</h3><p>Review each part of the process at your pace. Investing decisions remain yours.</p></div></div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
