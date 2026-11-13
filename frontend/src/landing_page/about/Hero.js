import React from "react";

function Hero() {
  return (
    <div className="iv-editorial-page">
      <section className="container iv-page-hero iv-about-hero">
        <div className="iv-page-hero-mark" aria-hidden="true"><span>IV</span><i /></div>
        <p className="iv-section-label">About Investify</p>
        <h1>Investing feels clearer when the details are easier to see.</h1>
        <div className="iv-about-intro">
          <p>Investify brings everyday investment workflows into a considered, approachable experience.</p>
          <p>Follow a watchlist, review holdings and positions, and keep track of orders and funds in one place. The goal is a calmer way to understand the pieces of your investing activity.</p>
        </div>
      </section>
      <section className="iv-about-principle">
        <div className="container iv-about-principle-inner">
          <p className="iv-section-label">The idea</p>
          <blockquote>Make the work of investing easier to follow, one decision at a time.</blockquote>
          <p>Investify is designed to make room for questions and clarity, without promising outcomes or making decisions for you.</p>
        </div>
      </section>
    </div>
  );
}

export default Hero;
