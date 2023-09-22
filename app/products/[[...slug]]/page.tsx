import React from 'react';
interface Props {
  params: { slug: String[] };
  searchParams: { sortOrder: string };
}
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      Products {slug}
      <p>The sort order is {sortOrder}</p>
    </div>
  );
};

export default ProductPage;
