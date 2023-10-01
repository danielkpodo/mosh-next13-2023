import { NextRequest, NextResponse } from 'next/server';

import { getToken } from 'next-auth/jwt';

// this is the behind the scenes of how next-auth works in a real application we would'nt want to do this.
// this function will return the content of the next-auth token as a json object
export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    // raw: true,
    // secret: process.env.NEXT_AUTH_SECRET,
  });
  return NextResponse.json(token);
}
