import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Start",
    price: "₹0",
    cadence: "per month · illustrative",
    description: "A simple starting point for exploring the demo workflow.",
    features: ["Watchlists", "Portfolio overview", "Orders and trade history"],
  },
  {
    name: "Everyday",
    price: "₹249",
    cadence: "per month · illustrative",
    description: "A sample bundle for a more regular investing routine.",
    features: ["Everything in Start", "Holdings and positions", "Funds overview", "Illustrative portfolio insights"],
    recommended: true,
  },
  {
    name: "Perspective",
    price: "₹699",
    cadence: "per month · illustrative",
    description: "A fictional higher tier for comparing product concepts.",
    features: ["Everything in Everyday", "Expanded demo summaries", "Additional sample views", "Conceptual priority support"],
  },
];

const comparison = [
  ["Watchlists", "Included", "Included", "Included"],
  ["Holdings and positions", "Overview", "Included", "Included"],
  ["Orders and trade history", "Included", "Included", "Included"],
  ["Illustrative portfolio views", "Basic", "Expanded", "Expanded"],
  ["Plan entitlements", "Demo only", "Demo only", "Demo only"],
];

const faqs = [
  ["Are these Investify's actual prices?", "No. These are fictional demo prices for this presentation. They are not commercial charges or an offer."],
  ["Can I buy one of these plans?", "No. The tiers are illustrative design concepts and are not connected to checkout or account entitlements."],
  ["Are the features different between tiers?", "The comparison is a fictional example. Existing account and dashboard functionality does not change based on these tiers."],
  ["Are the portfolio examples real?", "No. Any values or performance shown on this site are simulated and do not represent actual account activity."],
];

function PricingPage() {
  return (
    <main className="iv-editorial-page iv-pricing-page iv-pricing-complete">
      <section className="container iv-pricing-intro">
        <div>
          <p className="iv-section-label">Pricing concepts</p>
          <h1>Simple options for different investing routines.</h1>
          <p className="iv-page-lede">Compare three fictional demo plans, built to show how a clear pricing experience could work.</p>
        </div>
        <aside className="iv-pricing-demo-stamp" aria-label="Fictional demo pricing, not actual charges"><span>DEMO</span><strong>Fictional pricing</strong><small>Not actual charges</small></aside>
      </section>

      <section className="container iv-pricing-plans" aria-label="Illustrative demo plans">
        {plans.map((plan) => (
          <article className={`iv-plan ${plan.recommended ? "iv-plan-featured" : ""}`} key={plan.name}>
            <div className="iv-plan-heading"><div><p>{plan.recommended ? "A sample middle tier" : "Illustrative plan"}</p><h2>{plan.name}</h2></div>{plan.recommended && <span>DEMO PICK</span>}</div>
            <div className="iv-plan-price"><strong>{plan.price}</strong><span>{plan.cadence}</span></div>
            <p className="iv-plan-description">{plan.description}</p>
            <ul>{plan.features.map((feature) => <li key={feature}><i className="fa-solid fa-check" aria-hidden="true" />{feature}</li>)}</ul>
            <span className="iv-plan-footnote">Fictional tier · not purchasable</span>
          </article>
        ))}
      </section>
      <p className="container iv-demo-pricing-disclaimer">All plan names, prices and bundles on this page are fictional demonstration content. They do not represent brokerage charges, current Investify fees, or available account features.</p>

      <section className="iv-pricing-comparison">
        <div className="container">
          <div className="iv-about-section-intro"><p className="iv-section-label">A side-by-side view</p><h2>Compare the demo concepts.</h2></div>
          <div className="iv-comparison-scroll" tabIndex="0" aria-label="Scrollable illustrative plan comparison">
            <table className="iv-comparison-table">
              <thead><tr><th scope="col">Example feature</th><th scope="col">Start</th><th scope="col">Everyday</th><th scope="col">Perspective</th></tr></thead>
              <tbody>{comparison.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="iv-demo-caption">Illustrative comparison only. The demo tiers do not map to real permissions or paid services.</p>
        </div>
      </section>

      <section className="container iv-pricing-faq" aria-labelledby="pricing-faq-heading">
        <div className="iv-pricing-faq-intro"><p className="iv-section-label">Questions, answered</p><h2 id="pricing-faq-heading">A little more clarity.</h2></div>
        <div className="iv-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="iv-pricing-next-step"><div className="container"><div><p className="iv-section-label">Explore the platform</p><h2>See how the Investify account flow works.</h2></div><Link to="/signup" className="btn btn-primary iv-button-primary">Create an account</Link></div></section>
    </main>
  );
}

export default PricingPage;
