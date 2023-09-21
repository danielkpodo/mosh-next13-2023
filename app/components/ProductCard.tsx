import AddToCart from './AddToCart';
import React from 'react';
import styles from '../components/ProductCard.module.css';

// this component will be rendered on the server
const ProductCard = () => {
  return (
    <div className={styles.card}>
      {/* other items or values from the server */}
      <AddToCart />
      {/* where we have this client component there is going to be a hole where react will later inject the client component */}
    </div>
  );
};

export default ProductCard;
