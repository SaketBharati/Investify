import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const demoHoldings = [
  ["Northstar Energy", "NSE", "₹ 2,84,400", "+8.4%"],
  ["Cedar Consumer", "CDC", "₹ 2,18,250", "+12.6%"],
  ["Meridian Mobility", "MDM", "₹ 1,63,000", "−1.3%"],
];

function DemoPortfolioPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="iv-demo-portfolio" aria-labelledby="demo-portfolio-caption">
      <div className="iv-demo-window-head">
        <span className="iv-demo-window-brand"><i aria-hidden="true" /> Investify</span>
        <span className="iv-demo-flag">Simulated demo</span>
      </div>
      <div className="iv-demo-account-heading">
        <div><p>Portfolio overview</p><h2>₹ 8,42,650</h2><span className="iv-demo-account-caption">Sample account value</span></div>
        <div className="iv-demo-return"><strong>+12.4%</strong><span>Illustrative return</span></div>
      </div>
      <div className="iv-demo-chart-label"><span>Portfolio movement</span><span>Sample 6 month view</span></div>
      <svg className="iv-demo-line-chart" viewBox="0 0 620 190" role="img" aria-label="Illustrative portfolio chart showing simulated movement">
        <defs><linearGradient id="demo-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#899a62" stopOpacity=".2"/><stop offset="1" stopColor="#899a62" stopOpacity="0"/></linearGradient></defs>
        <path d="M10 155 L68 141 L121 148 L172 105 L222 118 L276 87 L329 102 L382 57 L435 74 L486 41 L540 56 L610 20 L610 180 L10 180 Z" fill="url(#demo-fill)" />
        <path d="M10 155H610 M10 110H610 M10 65H610 M10 20H610" fill="none" stroke="rgba(41,55,43,.14)" strokeDasharray="3 8" />
        <motion.path d="M10 155 L68 141 L121 148 L172 105 L222 118 L276 87 L329 102 L382 57 L435 74 L486 41 L540 56 L610 20" fill="none" stroke="#748552" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }} />
        <circle cx="610" cy="20" r="6" fill="#29372b" />
      </svg>
      <div className="iv-demo-chart-scale"><span>Earlier</span><span>Now</span></div>
      <div className="iv-demo-summary-row"><div><span>Holdings</span><strong>8</strong></div><div><span>Open positions</span><strong>3</strong></div><div><span>Available funds</span><strong>₹ 73,000</strong></div></div>
      <figcaption id="demo-portfolio-caption">Fictional sample values for design demonstration. Not live prices, a real account, or actual performance.</figcaption>
    </figure>
  );
}

function WatchlistPanel() {
  const rows = [
    ["Northstar Energy", "₹ 1,284.25", "+1.8%"],
    ["Cedar Consumer", "₹ 742.10", "+0.6%"],
    ["Meridian Mobility", "₹ 1,122.40", "−0.4%"],
  ];
  return (
    <div className="iv-product-panel iv-watchlist-panel" role="img" aria-label="Illustrative watchlist with fictional instruments and prices">
      <div className="iv-panel-heading"><div><span>Watchlist</span><strong>Market ideas</strong></div><span className="iv-demo-flag">SIMULATED</span></div>
      <div className="iv-market-table-head"><span>Instrument</span><span>Sample price</span><span>Move</span></div>
      {rows.map(([company, price, change]) => <div className="iv-market-row" key={company}><span><i aria-hidden="true" /> <strong>{company}</strong></span><span>{price}</span><span className={change.startsWith("+") ? "iv-demo-positive" : "iv-demo-negative"}>{change}</span></div>)}
      <p className="iv-panel-footnote">A watchlist keeps the instruments you follow together.</p>
    </div>
  );
}

function HoldingsPanel() {
  return (
    <div className="iv-product-panel iv-holdings-panel" role="img" aria-label="Illustrative holdings table with fictional values and returns">
      <div className="iv-panel-heading"><div><span>Portfolio</span><strong>Holdings at a glance</strong></div><span className="iv-demo-flag">SAMPLE</span></div>
      <div className="iv-holdings-overview"><div className="iv-donut-demo" aria-hidden="true"><span /></div><div><strong>₹ 8,42,650</strong><span>Fictional sample value</span><small>Illustrative return +12.4%</small></div></div>
      <div className="iv-holdings-table-head"><span>Holding</span><span>Value</span><span>Return</span></div>
      {demoHoldings.map(([name, symbol, value, change]) => <div className="iv-holding-row" key={symbol}><span><b>{name}</b><small>{symbol} · Demo instrument</small></span><span>{value}</span><span className={change.startsWith("+") ? "iv-demo-positive" : "iv-demo-negative"}>{change}</span></div>)}
    </div>
  );
}

function OrderAndHistoryPanel() {
  return (
    <div className="iv-product-panel iv-orders-panel" role="img" aria-label="Illustrative order activity and trade history">
      <div className="iv-panel-heading"><div><span>Trading workflow</span><strong>Orders &amp; trade history</strong></div><span className="iv-demo-flag">DEMO</span></div>
      <div className="iv-sample-order"><span className="iv-sample-order-type">BUY</span><div><b>Northstar Energy</b><small>10 shares · Sample order</small></div><span className="iv-order-state">Filled</span></div>
      <div className="iv-sample-order"><span className="iv-sample-order-type iv-sell">SELL</span><div><b>Meridian Mobility</b><small>4 shares · Sample order</small></div><span className="iv-order-state iv-order-review">Review</span></div>
      <div className="iv-history-block"><span className="iv-history-rule" aria-hidden="true"/><div><p>Trade history</p><strong>Review past activity in one place.</strong><small>All instruments and activity shown here are fictional.</small></div><span className="iv-history-count">2 sample trades</span></div>
      <div className="iv-funds-strip"><span>Available funds <b>₹ 73,000</b></span><span>Utilised <b>₹ 18,400</b></span><small>Simulated account figures</small></div>
    </div>
  );
}

function ProductPage() {
  return (
    <main className="iv-editorial-page iv-products-page iv-products-complete">
      <section className="container iv-product-demo-hero">
        <div className="iv-product-demo-copy">
          <p className="iv-section-label">The Investify platform</p>
          <h1>A clearer view of every part of your investing day.</h1>
          <p>From the instruments you follow to the orders you place, Investify brings portfolio workflows into one considered experience.</p>
          <Link to="/signup" className="btn btn-primary iv-button-primary">Explore the demo</Link>
          <span className="iv-demo-note-inline">Demo screens use simulated values and fictional instruments.</span>
        </div>
        <DemoPortfolioPreview />
      </section>

      <section className="iv-products-overview" aria-label="Investify product workflows">
        <div className="container iv-product-feature-row iv-watchlist-feature">
          <div className="iv-product-feature-copy"><p className="iv-section-label">Keep an eye on what matters</p><h2>Watchlists for the names you want to follow.</h2><p>Gather instruments in a focused list, so it is easier to return to the market ideas you are tracking.</p><span className="iv-feature-index">WATCHLISTS · FOLLOW · REVIEW</span></div>
          <WatchlistPanel />
        </div>
        <div className="iv-product-feature-band">
          <div className="container iv-product-feature-row iv-holdings-feature">
            <HoldingsPanel />
            <div className="iv-product-feature-copy"><p className="iv-section-label">See the portfolio in context</p><h2>Holdings and positions, brought into view.</h2><p>Get a clearer read on the investments you hold and the positions you are currently managing.</p><span className="iv-feature-index">HOLDINGS · POSITIONS · OVERVIEW</span></div>
          </div>
        </div>
        <div className="container iv-product-feature-row iv-orders-feature">
          <div className="iv-product-feature-copy"><p className="iv-section-label">Follow the workflow through</p><h2>Orders, trade history and funds, connected.</h2><p>Review order activity, look back at trade history and keep the funds connected to your account close at hand.</p><span className="iv-feature-index">ORDERS · HISTORY · FUNDS</span></div>
          <OrderAndHistoryPanel />
        </div>
      </section>

      <section className="container iv-products-close"><p className="iv-section-label">One step at a time</p><h2>Start with the workflow you need today.</h2><Link to="/signup" className="btn btn-primary iv-button-primary">Create your account</Link></section>
    </main>
  );
}

export default ProductPage;
