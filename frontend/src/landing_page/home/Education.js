import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <section className="iv-learning-section">
      <div className="container iv-learning-layout">
        <div className="iv-learning-emblem" aria-hidden="true"><span>Learn</span><span>at</span><span>your</span><span>pace</span></div>
        <div className="iv-learning-copy">
          <p className="iv-section-label">For the curious investor</p>
          <h2>Start with the parts you can understand.</h2>
          <p>A watchlist helps you follow instruments. Holdings show what is in your portfolio. Orders show activity you have placed. Learn the language, then decide what matters to you.</p>
          <Link to="/support" className="iv-text-link">Visit the support portal <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

export default Education;
