import Link from 'next/link';
import { Metadata } from 'next';
import ProductCard from './components/ProductCard';
import authOptions from './api/auth/authOptions';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h1 className='text-black font-monoLisa'>
        Hello {session && session.user!.name}
      </h1>
      <Link href='/users'>Go to the users page</Link>
      <ProductCard />
    </main>
  );
}

// the session.user!.name => the exclamation mark is telling us that we do have a user
export const metadata: Metadata = {
  title: 'Welcome to learning next.js with naphtha',
};

// // for a page that uses dynamic products

// export async function generateMetadata(): Promise<Metadata> {
//   // typically we want to fetch something from an api and await it or if using prisma
//   const product = await fetch('...');
//   return {
//     title: product.title,
//     description: product?.desc,
//   };
// }
