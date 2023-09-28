import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/prisma/client';
import schema from './schema';

interface UserDTO {
  name: string;
  email: string;
}

// import prisma from '../../../prisma/client';

// Getting all data
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  /*
    the body is the request object from the client
   * In a real world
   * step1 validate the body of the request
   *  step 2: if the data is invalid, return 400
   *  else return the created object
   */
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors[0].message });
  }

  const { name, email } = body as UserDTO;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return NextResponse.json(
      { error: 'Email address already exists' },
      { status: 400 }
    );
  }

  // note it is not a save practice to pass the entire body object; only pick the necessary fields required for saving to the database, otherwise
  // a malicious user can send additional fields to the db
  const newUser = await prisma.user.create({ data: { email, name } });

  return NextResponse.json(newUser, { status: 201 });
}
