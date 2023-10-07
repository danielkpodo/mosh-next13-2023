import React from "react";

const Loading = () => {
  return (
    // <progress className='progress w-100%'></progress>;
    <div className="flex items-center justify-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
