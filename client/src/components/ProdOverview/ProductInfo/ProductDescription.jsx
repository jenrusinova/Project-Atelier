import React from 'react';

const ProductDescription = (props) => {
  console.log('productDescription', props);
  return (
    <div className='POProductDescription'>
      <h3>{props.product.slogan}</h3>
      <p>{props.product.description}</p>
    </div>
  );
};

export default ProductDescription;