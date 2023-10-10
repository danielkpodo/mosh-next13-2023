import CrendtialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import prisma from '@/prisma/client';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CrendtialsProvider({
      name: 'Crendtials',
      // by default the credentials object provides an email and password input for us on the ui
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email Address' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials, req) {
        // validate the credentials
        if (!credentials?.email || !credentials?.password) return null;

        // find the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        return passwordsMatch ? user : null;
      },
    }),
    // in this array we can have one or more providers
    GoogleProvider({
      // the ! @ the end of the process... is to tell typescript that we definitely have a value, thus it should not read undefined
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
