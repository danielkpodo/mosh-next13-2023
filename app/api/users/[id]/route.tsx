import { NextRequest, NextResponse } from 'next/server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/prisma/client';
import schema from '../schema';

interface UserDTO {
  name: string;
  email: string;
}

interface Props {
  // values we have in urls is treated as a string
  params: { id: string };
}
export async function GET(request: NextRequest, { params: { id } }: Props) {
  // In a real world application we will be fetching the data from a real world database
  // step 1. fetch data from a db
  // step 2: If not found, rerutn 404 error
  // step 3: else return the actual data

  /**
   * using a fake example when id > 10
   */

  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (!user)
    return NextResponse.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );

  return NextResponse.json(user);
}

// we should use put for replacing an object
// we should use patch for updating one or more fields

export async function PUT(
  // this was how mosh defined it and used it
  request: NextRequest,
  { params }: { params: { id: string } }
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

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }
  const { email, name } = body as UserDTO;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: { name, email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2002')
      return NextResponse.json({ error: 'Email is already taken' });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) {
    return NextResponse.json(
      { error: `User with id ${id} not found` },
      { status: 404 }
    );
  }

  await prisma.user.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: 'User deleted successfully' });
}
