import AddToCart from './AddToCart';
import React from 'react';
// this component will be rendered on the server
const ProductCard = () => {
  return (
    <div>
      {/* other items or values from the server */}
      <AddToCart />
      {/* where we have this client component there is going to be a hole where react will later inject the client component */}
    </div>
  );
};

export default ProductCard;
