import React from "react";

const topics = [
  { title: "Account access", icon: "fa-solid fa-user", questions: [
    ["How do I create an Investify account?", "Use the existing sign-up page to create an account with a username, email address and password."],
    ["How do I sign in?", "Use the Login page with the email address and password associated with your account."],
  ]},
  { title: "Watchlists", icon: "fa-regular fa-bookmark", questions: [
    ["What is a watchlist?", "A watchlist keeps selected instruments together so you can return to them while reviewing the market."],
    ["Are the public watchlist prices live?", "No. Any prices shown on this public site are simulated examples. They are not live market quotes."],
  ]},
  { title: "Portfolio and holdings", icon: "fa-solid fa-chart-pie", questions: [
    ["Where can I review holdings and positions?", "The logged-in dashboard has separate views for holdings and positions. Public-page portfolio figures are illustrative."],
    ["Are the portfolio returns real?", "No. All portfolio values and returns used in this public demonstration are fictional sample data."],
  ]},
  { title: "Orders and trade history", icon: "fa-solid fa-arrow-right-arrow-left", questions: [
    ["Where can I see order activity?", "The dashboard includes an Orders view for account activity. The example orders shown on this website are fictional and cannot be placed."],
    ["Does this support centre submit an order?", "No. This is a read-only help experience. It does not submit or change orders."],
  ]},
  { title: "Funds", icon: "fa-solid fa-wallet", questions: [
    ["Are the funds shown in product examples mine?", "No. Public demonstration balances are simulated values and are not connected to a real account."],
    ["Can I move money from this page?", "No. This page provides information only and does not initiate deposits or withdrawals."],
  ]},
  { title: "Getting started", icon: "fa-regular fa-compass", questions: [
    ["What does Investify demonstrate?", "Investify is a portfolio project demonstrating account flows and investing workflows such as watchlists, holdings, positions, orders and funds."],
    ["Is Investify a live financial service?", "No. Investify is a demonstration and portfolio project, not a production financial service. Do not use its illustrative values to make investment decisions."],
  ]},
];

function CreateTicket({ query, onClear }) {
  const normalized = query.trim().toLocaleLowerCase();
  const filteredTopics = topics.map((topic) => ({
    ...topic,
    questions: topic.questions.filter(([question, answer]) => !normalized || `${topic.title} ${question} ${answer}`.toLocaleLowerCase().includes(normalized)),
  })).filter((topic) => topic.questions.length > 0);
  const resultCount = filteredTopics.reduce((count, topic) => count + topic.questions.length, 0);

  return (
    <section className="container iv-support-topics iv-support-faqs" id="support-faqs" aria-labelledby="support-topics-heading">
      <div className="iv-support-section-heading">
        <p className="iv-section-label">Browse by topic</p>
        <h2 id="support-topics-heading">What can we help you understand?</h2>
        <p>{normalized ? `${resultCount} matching answers` : "Straightforward guidance for the parts of your investing workflow."}</p>
      </div>
      {filteredTopics.length ? <div className="iv-topic-list">
        {filteredTopics.map((topic) => <section className="iv-faq-topic" key={topic.title} aria-label={topic.title}>
          <h3><i className={topic.icon} aria-hidden="true"/>{topic.title}<span>{String(topic.questions.length).padStart(2, "0")}</span></h3>
          <div>{topic.questions.map(([question, answer]) => <details key={question}>
            <summary>{question}<span aria-hidden="true"/></summary>
            <p>{answer}</p>
          </details>)}</div>
        </section>)}
      </div> : <div className="iv-support-empty"><p>No answers matched “{query}”.</p><span>Try a broader phrase such as “account”, “portfolio” or “orders”.</span><button type="button" onClick={onClear}>Clear search</button></div>}
      <p className="iv-support-note">This FAQ is for the Investify demonstration website. It cannot view, change or provide support for personal account activity.</p>
    </section>
  );
}

export default CreateTicket;
