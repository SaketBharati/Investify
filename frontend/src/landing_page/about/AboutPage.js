import React from 'react';
import Hero from './Hero';
import Team from './Team';

function AboutPage() {
    return ( 
        <main className="iv-about-page">
          <Hero />
          <section className="iv-about-mission" aria-labelledby="mission-heading">
            <div className="container iv-about-mission-layout">
              <div>
                <p className="iv-section-label">Our mission</p>
                <h2 id="mission-heading">Make the moving parts of investing easier to understand.</h2>
              </div>
              <div className="iv-about-mission-copy">
                <p>Investify is a demonstration platform built around the everyday work of investing: keeping a watchlist, reviewing a portfolio, understanding an order and seeing the funds connected to an account.</p>
                <p>Our vision is an experience that feels capable without feeling complicated, so people can build familiarity with each step at their own pace.</p>
              </div>
            </div>
          </section>

          <section className="iv-about-journey" aria-labelledby="journey-heading">
            <div className="container">
              <div className="iv-about-section-intro">
                <p className="iv-section-label">An illustrative investor journey</p>
                <h2 id="journey-heading">Clarity builds one useful moment at a time.</h2>
              </div>
              <div className="iv-journey-steps">
                <article><span>Discover</span><h3>Notice what matters</h3><p>Use a watchlist to keep an eye on the instruments you want to follow.</p></article>
                <article><span>Understand</span><h3>See your portfolio</h3><p>Bring holdings and positions into view alongside your account activity.</p></article>
                <article><span>Act with context</span><h3>Review each order</h3><p>Keep order details and funds close as you move through an investing workflow.</p></article>
              </div>
              <p className="iv-demo-caption">This is a conceptual journey through demo workflows, not a record of company milestones.</p>
            </div>
          </section>

          <Team />

          <section className="iv-about-scenarios" aria-labelledby="scenarios-heading">
            <div className="container">
              <div className="iv-about-section-intro">
                <p className="iv-section-label">Fictional investor scenarios</p>
                <h2 id="scenarios-heading">Different starting points. Room to find your own pace.</h2>
              </div>
              <div className="iv-scenario-grid">
                <article><span className="iv-scenario-symbol" aria-hidden="true">A</span><h3>New to investing</h3><p>Start by learning what a watchlist, holding and order each represents.</p></article>
                <article><span className="iv-scenario-symbol" aria-hidden="true">B</span><h3>Building a routine</h3><p>Return to portfolio views and order history to understand your activity.</p></article>
                <article><span className="iv-scenario-symbol" aria-hidden="true">C</span><h3>Keeping perspective</h3><p>Use the overview to see several parts of an investing workflow together.</p></article>
              </div>
              <p className="iv-demo-caption">These are fictional situations created to explain the product experience. They are not customer stories or endorsements.</p>
            </div>
          </section>
        </main>
     );
}

export default AboutPage;
