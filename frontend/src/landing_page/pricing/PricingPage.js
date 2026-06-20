import React from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import Brokerage from './Brokerage';
import Footer from '../Footer';
import OpenAccount from '../OpenAccount'
import Pricing from './pricing';

function PricingPage() {
    return ( 
        <>
       
        <Hero />
        <OpenAccount />
        <Brokerage />
        <Pricing />
        
        </>
     );
}

export default PricingPage;