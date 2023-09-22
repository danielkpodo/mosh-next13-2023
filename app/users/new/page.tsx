'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NewUser = () => {
  const router = useRouter();
  const handleNewUser = () => {
    console.log('User created successfully...');
    router.push('/users');
  };
  return (
    <button
      className='btn btn-primary text-white'
      type='button'
      onClick={handleNewUser}
    >
      Create Now
    </button>
  );
};

export default NewUser;
