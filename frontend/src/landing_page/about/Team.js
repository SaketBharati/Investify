import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <section className="iv-founder-section">
      <div className="container iv-founder-layout">
        <div className="iv-founder-portrait">
          <div className="iv-portrait-frame">
            <img src="/media/images/saket.jpeg" alt="Saket Bharati" />
          </div>
          <div className="iv-founder-caption"><h2>Saket Bharati</h2><p>Founder &amp; CEO</p></div>
        </div>
        <div className="iv-founder-story">
          <p className="iv-section-label">The person behind Investify</p>
          <h3>Built around a more approachable investing experience.</h3>
          <p>Saket Bharati founded Investify in 2026 with the vision of making investing more accessible, intuitive, and technology-driven for modern investors. As a passionate software developer and finance enthusiast, he built Investify to bridge the gap between complex financial platforms and everyday users through a clean, user-friendly experience.</p>
          <p>Information Technology student at Jadavpur University and full-stack developer passionate about fintech, investing, and building scalable digital products that create real-world impact.</p>
          <p>Playing Games is his zen.</p>
          <div className="iv-founder-links"><Link to="/">Explore Investify <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link><Link to="/products">See the platform <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link></div>
        </div>
      </div>
    </section>
  );
}

export default Team;
