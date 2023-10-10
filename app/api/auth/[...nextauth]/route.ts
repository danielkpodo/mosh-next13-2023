import NextAuth from 'next-auth/next';
import authOptions from '../authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/**
 * we are exporting this function with two different names
 * Any get or post request will be handled in the handler func
 */
