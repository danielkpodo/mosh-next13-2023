'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('../components/HeavyComponent'), {
  // when importing client components by default they are pre-rendered on the server
  // this can cause certain issues when you access browser apis on the server and they are not available this might cause errors so we disable ssr
  // this is how we can lazy load client components
  ssr: false,
  loading: () => <p>loading...</p>,
});
/**
 * To lazy load the heavy component we have to use the dynamic function in next.js
 * It does not make sense to lazy load small components check your browser bundle
 * In this  case a call will be made to the server to fetch the heavy component
 * As a second argument, we can pass a loading indicator to the function when the component is being downloaded
 */

const LazyLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsVisible(true)} className='btn btn-secondary'>
        Show
      </button>
      {isVisible && <HeavyComponent />}
    </div>
  );
};

export default LazyLoading;
