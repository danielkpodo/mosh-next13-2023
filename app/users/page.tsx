import { inPlaceSort, sort } from 'fast-sort';

import Link from 'next/link';
import { Suspense } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  searchParams: { sortOrder: string };
}

const UsersPage = async ({ searchParams: { sortOrder } }: Props) => {
  //REFACTOR: send the table into a new file and pass down the sortOrder as prop to the table apage
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  const users: User[] = await res.json();

  const sortedUsers = sort(users).asc(
    sortOrder === 'email' ? (user) => user.email : (user) => user.name
  );

  return (
    <>
      <h1>Users</h1>
      <Link href='/users/new' className='btn my-2 bg-blue-400'>
        Create New user
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        <table className='table table-pin-rows table-lg table-zebra'>
          <thead>
            <tr>
              <th>
                <Link href='/users?sortOrder=name'>Name</Link>
              </th>
              <th>
                <Link href='/users?sortOrder=email'>Email</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Suspense>
    </>
  );
};

export default UsersPage;
