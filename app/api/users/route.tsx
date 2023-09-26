import { NextRequest, NextResponse } from 'next/server';

// Getting all data
export function GET(request: NextRequest) {
  const data = [
    { name: 'mosh', isFriendly: true },
    { name: 'Narh', isFriendly: false },
  ];
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  //  the body is the request object from the client
  const body = await request.json();

  const { name } = body;
  if (!name) return NextResponse.json({ error: 'Name is required!' });
  /**
   * In a real world
   * step1 validate the body of the request
   *  step 2: if the data is invalid, return 400
   *  else return the created object
   */

  return NextResponse.json(body, { status: 201 });
}
