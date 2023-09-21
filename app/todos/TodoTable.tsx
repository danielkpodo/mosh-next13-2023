import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoTable = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    cache: 'no-store',
  });
  const todos: Todo[] = await response.json();

  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Name</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
