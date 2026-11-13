import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="iv-pricing-teaser">
      <div className="container iv-pricing-teaser-inner">
        <div><p className="iv-section-label">Know what to expect</p><h2>Clear information belongs at every step.</h2></div>
        <div><p>Review the pricing information currently shown for the platform, including the charges and terms that may apply.</p><Link to="/pricing" className="iv-text-link">View pricing information <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

export default Pricing;
