import React from 'react';
import TodoTable from './TodoTable';

const page = async () => {
  return (
    <>
      <h1 className='text-5xl'>My Todos</h1>
      <TodoTable />
    </>
  );
};

export default page;
