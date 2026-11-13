import React from "react";
import { Link } from "react-router-dom";

function Hero({ query, onSearch, onSubmit }) {
  return (
    <section className="iv-support-hero iv-support-hero-complete">
      <div className="container iv-support-hero-inner">
        <div className="iv-support-copy">
          <p className="iv-section-label">Investify support centre</p>
          <h1>Good answers make the next step clearer.</h1>
          <p>Search quick guidance for your account, portfolio, watchlists, orders and funds.</p>
          <form className="iv-support-search" role="search" onSubmit={onSubmit}>
            <label htmlFor="support-search">What can we help you find?</label>
            <div><i className="fa-solid fa-magnifying-glass" aria-hidden="true"/><input id="support-search" type="search" value={query} onChange={(event) => onSearch(event.target.value)} placeholder="Try “orders” or “watchlist”" aria-controls="support-faqs"/><button type="submit" aria-label="Search help topics">Search</button></div>
            <span>Search this demo help centre. No ticket will be submitted.</span>
          </form>
        </div>
        <aside className="iv-support-contact iv-support-contact-complete">
          <span className="iv-support-mark" aria-hidden="true"><i/><i/></span>
          <p>Account question?</p>
          <Link to="/login" className="iv-text-link">Sign in to your account <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link>
          <small>Public demo support does not access account data.</small>
        </aside>
      </div>
    </section>
  );
}

export default Hero;
