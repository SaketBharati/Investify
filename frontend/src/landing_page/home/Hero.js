import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero Image' className='mb-5'/>

                <h1 className='mt-5'>Invest in everything</h1>
                <p className='mt-3'> Take control of your financial future with a platform designed to help you invest confidently across global markets. From stocks and ETFs to commodities and emerging opportunities, access a wide range of investment options through a secure, intuitive, and powerful trading experience. Whether you're a beginner building your first portfolio or an experienced trader seeking advanced tools and real-time insights, we provide everything you need to make informed decisions and grow your wealth with confidence.</p>

                <button type="button" class="btn btn-primary p-2 fs-5 mt-3" style={{width:"20%", margin:"0 auto"}}>Signup Now</button>
            </div>
        </div>
     );
}

export default Hero;
