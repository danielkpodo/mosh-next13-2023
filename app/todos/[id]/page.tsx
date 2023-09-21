import React from 'react';

interface Props {
  params: { id: number };
}

// in this example we extract the id from the params property
// this approach of getting id's is only accessible in pages -> for components we need to pass them down
const TodoItem = ({ params: { id } }: Props) => {
  return (
    <div>
      <h3>Todo #{id}</h3>
    </div>
  );
};

export default TodoItem;
