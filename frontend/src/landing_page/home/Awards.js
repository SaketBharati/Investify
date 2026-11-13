import React from "react";

const workflows = [
  { title: "Watchlists", description: "Keep the instruments you follow easy to find." },
  { title: "Holdings & positions", description: "Review what you own and the positions you are managing." },
  { title: "Orders & funds", description: "Keep track of order activity and the funds connected to your account." },
];

function Awards() {
  return (
    <section className="iv-workflows-section" aria-labelledby="workflow-title">
      <div className="container iv-section-grid">
        <div className="iv-section-intro">
          <p className="iv-section-label">A place for the moving parts</p>
          <h2 id="workflow-title">Everything you follow, in context.</h2>
          <p>Investing has enough to keep up with. Investify brings everyday portfolio and trading workflows into one clear view.</p>
        </div>
        <div className="iv-workflow-list">
          {workflows.map((item, index) => (
            <article className="iv-workflow-row" key={item.title}>
              <span className="iv-workflow-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
              <span className="iv-row-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
