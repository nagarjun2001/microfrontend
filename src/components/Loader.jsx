import React from 'react';
import ReactLoading from 'react-loading';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-900  z-1">
      <ReactLoading type="spinningBubbles" width={40} color="#000000" />
    </div>
  );
}

export default Loader;
