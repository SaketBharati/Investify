import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import MarketIllustration from "../MarketIllustration";

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container iv-home-hero">
      <div className="iv-hero-copy">
        <motion.p
          className="iv-hero-brandline"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Investify <span aria-hidden="true">/</span> Investing, made clearer
        </motion.p>
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.08 }}
        >
          A clearer view of your investments.
        </motion.h1>
        <motion.p
          className="iv-hero-description"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.16 }}
        >
          Follow the markets, review your holdings and keep your investing workflow in one considered place.
        </motion.p>
        <div className="iv-hero-actions">
          <Link to="/signup" className="btn btn-primary iv-button-primary">Open an account</Link>
          <Link to="/products" className="iv-text-link">Explore the platform <i className="fa-solid fa-arrow-right-long" aria-hidden="true" /></Link>
        </div>
        <p className="iv-hero-footnote">Investing involves risk. Take time to understand each decision.</p>
      </div>
      <MarketIllustration />
    </section>
  );
}

export default Hero;
