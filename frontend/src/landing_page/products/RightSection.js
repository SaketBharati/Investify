import React from 'react';

function RightSection({
    imageURL,
  productName,
  productDesription,
  learnMore,
}) {
    return ( 
        <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-4 mt-5 p-5 mb-5'>
                    <div className='mt-5'>
                <h1 className='fs-2'>{productName}</h1>
                <p className='mt-4 text-muted' style={{}}>{productDesription}</p>
                <div>
                    <a href={learnMore} style={{textDecoration:"none"}}>Learn More<i class="fa-solid fa-right-long"></i></a>
                    </div>
                </div>
                </div>
                <div className='col-1'></div>
                <div className='col-7 mb-5'>
                    <img src={imageURL} style={{width:"90%"}} />
                </div>
            </div>
        </div>
     );
}

export default RightSection;