import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const points = "16,176 72,165 118,172 164,139 211,147 254,115 301,128 350,92 395,104 448,67 502,76 570,35";

function MarketIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="market-illustration" aria-labelledby="market-illustration-caption">
      <div className="market-paper">
        <div className="market-paper-head">
          <span className="market-mark" aria-hidden="true"><i /></span>
          <span>Investify <span className="market-paper-subtitle">/ Portfolio view</span></span>
          <span className="market-illustrative-label">Illustrative</span>
        </div>

        <div className="market-paper-title">
          <div>
            <p className="market-overline">YOUR INVESTMENT WORKSPACE</p>
            <h2>A clearer view,<br />all in one place.</h2>
          </div>
          <span className="market-orbit" aria-hidden="true"><span /><i /></span>
        </div>

        <div className="market-chart-wrap">
          <div className="market-chart-caption">
            <span>Market movement</span>
            <span>Illustrative - not live data</span>
          </div>
          <svg className="market-chart" viewBox="0 0 590 220" role="img" aria-label="Illustrative market movement chart">
            <defs>
              <linearGradient id="market-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#899a62" stopOpacity=".23" />
                <stop offset="1" stopColor="#899a62" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`M ${points.replaceAll(" ", " L ")} L 570 205 L 16 205 Z`} fill="url(#market-area)" />
            <path className="market-chart-grid" d="M16 55H570 M16 105H570 M16 155H570 M16 205H570" />
            <motion.polyline
              points={points}
              fill="none"
              stroke="#748552"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
            <circle cx="570" cy="35" r="7" fill="#29372b" stroke="#f6f7f0" strokeWidth="4" />
          </svg>
          <div className="market-chart-periods" aria-hidden="true"><span>Earlier</span><span>Now</span></div>
        </div>

        <div className="market-workflows" aria-label="Investify workflows">
          <span><i className="workflow-dot workflow-dot-sage" />Holdings</span>
          <span><i className="workflow-dot workflow-dot-gold" />Orders</span>
          <span><i className="workflow-dot workflow-dot-olive" />Watchlists</span>
          <span className="market-workflow-arrow" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M4 15 15 4M6 4h9v9" /></svg></span>
        </div>
      </div>
      <figcaption id="market-illustration-caption" className="market-illustration-note">
        A visual sketch of the portfolio and trading workflows available in Investify.
      </figcaption>
    </figure>
  );
}

export default MarketIllustration;

