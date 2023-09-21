import React from 'react';
import { table } from 'console';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  const users: User[] = await res.json();
  return (
    <table className='table table-pin-rows table-lg table-zebra'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersPage;
