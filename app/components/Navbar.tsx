'use client';

import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  // since useSession uses react context under the hood we turn this component into a client component
  /**
   * the status is of three values 1. authenticated, unauthenticated, loading
   */
  const { data: session, status } = useSession();

  // if (status === 'loading') {
  //   return null; // or we could return a loading indicator
  // }
  return (
    <div className='flex bg-slate-200 p-5 space-x-2'>
      <Link href='/' className='mr-5'>
        Next.js
      </Link>
      <Link href='/users'>Users</Link>
      {status === 'loading' && <div>Loading...</div>}
      {/* only render the login link if the starurs is unauthenticated */}
      {status === 'authenticated' && <div>{session.user?.name} </div>}
      {status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>Login</Link>
      )}
    </div>
  );
};

export default Navbar;
