import { NextRequest, NextResponse } from 'next/server';

// this is a shorter and cleaner way to export the middleware function without explicitly doing export default middleware
// export { default } from 'next-auth/middleware'
import middleware from 'next-auth/middleware';

// exporting this handles everything for us
// This means when we are not authenticated and we try to visit /users it will redirect us to the login page
export default middleware;
/***
 * In next auth we have a middleware function that checks if a user have a session? if the user does not have a session it automatically redirects them to the login page
 */

// we do not need this anymore since we importing the built in middleware from next-auth
// export function middleware(request: NextRequest) {
//   // this function get executed on every request
//   // so here we have a chance to check the user session and redirect them to a login page when they try to access a protected route
//   // this is already implemented in next auth
//   // this file is to demo how middlewares in next.js works
//   // request.url is the base url of our website

//   /***
//    * Most of the time we do not want the middleware to be executed on every request but rather on certain paths
//    * To control that we export a constant called config, it is one of the things next.js looks for
//    */

//   return NextResponse.redirect(new URL('/new-page', request.url));
// }

// next.js looks for this
export const config = {
  /**
   * we set the matcher property to a string of paths or an array of paths =>   matcher: ['/users'],
   * optionally we can add parameters and modify them
   * *: zero or more parameters
   * +: one or more parameters
   * ?: zero or one parameters
   */
  matcher: ['/users/:id*'], // any route begining with /users or /users/id will be protected
  // In a rel world application we typically try to protect all our dashboards like so
  //  matcher: ['/dashboard/:*'] secure all routes that start with /dashboard
};
