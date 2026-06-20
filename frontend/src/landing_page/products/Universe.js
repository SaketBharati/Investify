import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center mt-5">
        <h1 className='fs-2 mt-5'>The Investify Universe</h1>
        <p className="mt-4">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>

      <div className="row text-center mt-5">
        <div className="col-4">
          <img
            src="/media/images/zerodhaFundhouse.png"
            alt="Fund House"
            style={{ width: "60%" }}
          />
          <p className="text-muted mt-3">
            Smart mutual fund solutions designed for long-term wealth creation.
          </p>
        </div>

        <div className="col-4 mt-2">
          <img
            src="/media/images/sensibullLogo.svg"
            alt="Sensibull"
            style={{ width: "70%" }}
          />
          <p className="text-muted mt-4">
            Advanced options trading tools for strategy building and analysis.
          </p>
        </div>

        <div className="col-4">
          <img
            src="/media/images/tijori.svg"
            alt="Tijori"
            style={{ width: "50%" }}
          />
          <p className="text-muted mt-2">
            Detailed stock research and market intelligence platform.
          </p>
        </div>

        <div className="col-4 mt-5">
          <img
            src="/media/images/streakLogo.png"
            alt="Streak"
            style={{ width: "60%" }}
          />
          <p className="text-muted mt-3">
            Create and backtest trading strategies without coding.
          </p>
        </div>

        <div className="col-4 mt-5">
          <img
            src="/media/images/smallcaseLogo.png"
            alt="Smallcase"
            style={{ width: "70%" }}
          />
          <p className="text-muted mt-4">
            Invest in diversified baskets of stocks and ETFs.
          </p>
        </div>

        <div className="col-4 mt-5">
          <img
            src="/media/images/dittoLogo.png"
            alt="Ditto"
            style={{ width: "50%" }}
          />
          <p className="text-muted mt-4">
            Personalized financial guidance to help you invest better.
          </p>
        </div>
      </div>

      <div className="text-center mt-4 mb-5">
        <button className="btn btn-primary fs-5 px-5 py-2">
          Sign Up Now
        </button>
      </div>
    </div>
  );
}

export default Universe;