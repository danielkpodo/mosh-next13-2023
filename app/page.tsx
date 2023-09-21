import Link from 'next/link';
import ProductCard from './components/ProductCard';

export default function Home() {
  return (
    <main>
      <h1 className='text-black'>Hello World</h1>
      <Link href='/users'>Go to the users page</Link>
      <ProductCard />
    </main>
  );
}
