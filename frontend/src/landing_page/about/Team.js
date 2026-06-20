import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 border-top mb-5">
        <h1 className=" text-center mt-5">People</h1>
      </div>
      <div
        className="row mt-5  text-muted"
        style={{ fontSize: "1.2em", lineHeight: "1.8" }}
      >
        <div className="col p-5 text-center">
          <img
            src="media\images\saket.jpeg"
            alt="nithin_img"
            style={{ borderRadius: "100%", width: "60%" }}
          ></img>
          <h4 className="mt-4" style={{ textDecoration: "none" }}>
            Saket Bharati
          </h4>
          <h6>Founder & CEO</h6>
        </div>
        <div className="col p-5 mt-3">
          <p>
            <span style={{textDecoration:""}}>Saket Bharati </span>founded Investify in 2026 with the vision of making
            investing more accessible, intuitive, and technology-driven for
            modern investors. As a passionate software developer and finance
            enthusiast, he built Investify to bridge the gap between complex
            financial platforms and everyday users through a clean,
            user-friendly experience.
          </p>
          <p>
            Information Technology student at Jadavpur University and full-stack
            developer passionate about fintech, investing, and building scalable
            digital products that create real-world impact.
          </p>
          <p>Playing Games is his zen. </p>
          <p>
            Connect on{" "}
            <a href="/" style={{ textDecoration: "none" }}>
              HomePage
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Trending Q&A
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
