import React from 'react';

function Awards() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/images/largestBroker.svg' alt='Awards Img'/>
                </div>
                <div className='col-6 p-5 mt-3'>
                    <h1>Trade. Invest. Build Wealth.</h1>
                    <p className='mb-5'>Experience a modern trading platform crafted for today's investors. Access market opportunities, track your portfolio in real time, and make informed investment decisions with ease.</p>
                    <div className='row'>
                        <div className='col-6'>
                            <ul>
                                <li>Equity Trading</li>

                                <li>IPO Marketplace</li>

                                <li>Mutual Funds</li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>Bonds & Securities</li>

                                <li>Market Research</li>

                                <li>Wealth Tracking</li>
                            </ul>
                        </div>
                    </div>
                    <img src='media/images/pressLogos.png' style={{width:"90%"}}/>
                    

                </div>
            </div>
        </div>
     );
}

export default Awards;