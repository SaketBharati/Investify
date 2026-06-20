import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 border-bottom mb-5">
        <h1 className="fs-2 text-center mt-5">
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with out technology.
        </h1>
      </div>
      <div
        className="row mt-5  text-muted"
        style={{ fontSize: "1.2em", lineHeight: "1.8" }}
      >
        <div className="col p-5">
          <p>
            We launched Investify with a vision to make investing simple,
            accessible, and technology-driven for everyone. Our mission is to
            empower investors with intuitive tools for portfolio management,
            market tracking, and seamless trading experiences.
          </p>
          <p>
            Built with a focus on performance, reliability, and user experience,
            Investify brings together modern technology and smart design to help
            users manage their investments efficiently.
          </p>
          <p>
            Whether you're tracking your portfolio, managing funds, monitoring
            watchlists, or exploring market opportunities, Investify provides a
            powerful and streamlined platform for your investment journey.
          </p>
        </div>
        <div className="col p-5">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.{" "}
          </p>
          <p>
            <a href="" style={{ textDecoration: "none" }}>
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.{" "}
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us or learn more about our business and product philosophies.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
