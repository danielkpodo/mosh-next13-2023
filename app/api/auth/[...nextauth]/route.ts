import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth/next';

const handler = NextAuth({
  providers: [
    // in this array we can have one or more providers
    GoogleProvider({
      // the ! @ the end of the process... is to tell typescript that we definitely have a value, thus it should not read undefined
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };

/**
 * we are exporting this function with two different names
 * Any get or post request will be handled in the handler func
 */
