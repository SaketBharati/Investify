import React from 'react';

function Stats() {
    return ( 
       <div className='container'>
        <div className='row'>

            <div className='col-6 p-5'>
                <h1>Invest with Confidence</h1>

                <h3 className='mt-5'>Investor-Centric Design</h3>
                <p className='text-muted'>Built with simplicity and transparency at its core. Our platform helps investors navigate the market confidently with an intuitive and user-friendly experience.</p>

                <h3>Fast & Secure Trading</h3>
                <p className='text-muted'>Execute trades seamlessly with a reliable infrastructure designed for speed, security, and uninterrupted market access.</p>

                <h3>Powerful Investment Tools</h3>
                <p className='text-muted'>Access real-time market data, portfolio insights, watchlists, and analytics to make informed investment decisions.</p>

                <h3>Learn & Grow</h3>
                <p className='text-muted'>Explore educational resources, market updates, and investment guides designed to help you become a smarter investor over time.</p>
            </div>
            <div className='col-6 p-5'>
                <img src='media/images/ecosystem.png' alt='Stats' style={{width:"90%"}}/>
                <div className='ml-5 fs-5'>
                    <a href='' className='mx-5'style={{textDecoration:"none"}}>Explore our products<i class="fa-solid fa-right-long"></i></a>
                <a href='' style={{textDecoration:"none"}}>Try Kite demo<i class="fa-solid fa-right-long"></i></a>
                </div>
                
            </div>
        </div>
       </div>
     );
}

export default Stats;