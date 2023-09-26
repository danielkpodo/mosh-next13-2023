import { NextRequest, NextResponse } from 'next/server';

import schema from '../schema';

interface Props {
  params: { id: number };
}
export function GET(request: NextRequest, { params: { id } }: Props) {
  // In a real world application we will be fetching the data from a real world database
  // step 1. fetch data from a db
  // step 2: If not found, rerutn 404 error
  // step 3: else return the actual data

  /**
   * using a fake example when id > 10
   */

  if (id > 10) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404, statusText: 'Not Found Buddy' }
    );
  }

  return NextResponse.json({ id, name: 'mosh' });
}

// we should use put for replacing an object
// we should use patch for updating one or more fields

export async function PUT(
  // this was how mosh defined it and used it
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // in a real application we hshould valiate the request body
  // if request body is invalid we return 400
  // if the user does not exist in the db we return 404
  // otherwise fetch the user with the given id
  // update the user and return the updated user

  const body = await request.json();
  // using zod
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors[0].message });
  }

  if (params.id > 10) {
    // if (!body.name) {
    //   return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    // }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  if (id > 10) {
    return NextResponse.json({ error: 'User not found ' }, { status: 404 });
  }

  return NextResponse.json({});
}
