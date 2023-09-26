import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const products = [
    {
      id: 1,
      name: 'Milk',
      price: 20.0,
    },
    {
      id: 2,
      name: 'Egss',
      price: 22.0,
    },
  ];

  return NextResponse.json(products);
}
