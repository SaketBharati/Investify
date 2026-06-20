import React from 'react';

function Pricing() {
    return ( 
        <div className='container'>
            <div className='row mb-5 p-4'>
                <div className='col-4 ml-4'>
                    <h1 className='fs-2'>Unbeatable Pricing</h1>
                    <p className='mt-4'>We pioneered the concept of discount broking and price transparency in India.Flat fees ad no hidden charges.</p>
                    <a href='' className=''style={{textDecoration:"none"}}>See Pricing<i class="fa-solid fa-right-long"></i></a>
                </div>
                <div className='col-2'></div>
                <div className='col-6 mt-2'>
                    <div className='row text-center'>
                        <div className='col p-3 border'>
                            <h1 className='mb-3'>₹0</h1>
                            <p>Free equity delivery and <br></br>direct mutual funds</p>
                        </div>
                        <div className='col p-3 border'>
                            <h1 className='mb-3'>₹20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;