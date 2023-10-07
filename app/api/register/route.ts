import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import prisma from '@/prisma/client';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address format' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be atleast 6 characters' }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (user) {
    return NextResponse.json(
      { error: 'User address already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  // you can just send the email and id back
  const newUser = await prisma.user.create({
    data: { email: body.email, hashedPassword },
  });

  newUser.hashedPassword = null;
  return NextResponse.json(newUser);
}
