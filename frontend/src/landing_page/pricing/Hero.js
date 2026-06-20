import React from 'react';

function Hero() {
    return ( 
       <div className="container">
      <div className="row p-5  mb-3">
        <h1 className="fs-2 text-center mt-5">
          Charges
        </h1>
        <h2 className="fs-4 text-center mt-2 text-muted">List of all charges and taxes</h2>
      </div>
      <div className="row mt-2 text-center " style={{fontSize:"1.2em", lineHeight:"1.8"}}>
        <div className="col p-5">
          <img src="media/images/pricing0.svg" style={{width:"80%"}}/>
          <h3 className='mt-3'>Free equity delivery</h3>
          <p className="text-muted">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
          </p>
          
        </div>
        <div className="col p-5">
            <img  src="media/images/intradayTrades.svg" style={{width:"80%"}}/>
            <h3 className='mt-3'>Intraday and F&O trades</h3>
            <p className="text-muted">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.  </p>
            
        </div>
        <div className="col p-5">
            <img src="media/images/pricing0.svg" style={{width:"80%"}}/>
            <h3 className='mt-3'>Free direct MF</h3>
            <p className="text-muted">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.  </p>
            
        </div>
      </div>
    </div>
     );
}

export default Hero;