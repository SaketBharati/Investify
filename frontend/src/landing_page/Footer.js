import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Link to="/" aria-label="Investify home"><img src="/media/images/logo.svg" alt="Investify" /></Link>
            <p>A clearer view of your investing workflow.</p>
          </div>
          <nav className="site-footer-nav" aria-label="Footer navigation">
            <div><h2>Explore</h2><Link to="/about">About Investify</Link><Link to="/products">The platform</Link><Link to="/pricing">Pricing information</Link></div>
            <div><h2>Help</h2><Link to="/support">Support portal</Link><Link to="/support#topics">Browse help topics</Link></div>
            <div><h2>Your account</h2><Link to="/signup">Create an account</Link><Link to="/login">Log in</Link></div>
          </nav>
        </div>
        <div className="site-footer-bottom">
          <p>© 2026 Investify</p>
          <p>Investing involves risk. Review relevant information carefully and make decisions that suit your circumstances.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
