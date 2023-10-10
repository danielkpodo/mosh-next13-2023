'use client';

import React from 'react';
/**
 * with this way of importing lodash we are including it in our page bundle so the browser will have to include it when rendering this page
 * if we do not need this library ahead of time and our page starts to get heavy then we can lazy load it
 */
// import _ from 'lodash';

const LazyLoadingExternalLibs = () => {
  const users = [
    { name: 'c' },
    { name: 'd' },
    { name: 'e' },
    { name: 'a' },
    { name: 'b' },
  ];
  return (
    <button
      className='btn btn-primary'
      onClick={async () => {
        // with this implementation lodash is not included in our page bundle ahead of time it is only loaded when we click the button
        const _ = (await import('lodash')).default;
        const sorted = _.orderBy(users, ['name']);
        console.log('sorted users', sorted);
      }}
    >
      Sort users
    </button>
  );
};

export default LazyLoadingExternalLibs;
