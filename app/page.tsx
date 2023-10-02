import Link from 'next/link';
import ProductCard from './components/ProductCard';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1 className='text-black'>Hello {session && session.user!.name}</h1>
      <Link href='/users'>Go to the users page</Link>
      <ProductCard />
    </main>
  );
}

// the session.user!.name => the exclamation mark is telling us that we do have a user
