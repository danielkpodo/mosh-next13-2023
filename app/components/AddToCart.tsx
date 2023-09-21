'use client';

/**
 *
 * This component will be injected into our js bundle to the client
 */
const AddToCart = () => {
  return (
    <button
      type='button'
      className='btn btn-primary bg-pink-400 border-transparent hover:bg-red-400 hover:border-transparent text-white btn-wide'
      onClick={() => console.log('button clicked')}
    >
      Subscribe Now
    </button>
  );
};

export default AddToCart;
