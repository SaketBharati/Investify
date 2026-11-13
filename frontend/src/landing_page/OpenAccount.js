import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="iv-close-section">
      <div className="container iv-close-inner">
        <span className="iv-close-orbit" aria-hidden="true"><i /></span>
        <div><p className="iv-section-label">Your next step</p><h2>Build a clearer view of your investments.</h2></div>
        <Link to="/signup" className="btn btn-primary iv-button-primary">Create your account</Link>
      </div>
    </section>
  );
}

export default OpenAccount;
