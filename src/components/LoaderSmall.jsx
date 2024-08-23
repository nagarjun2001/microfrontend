import React from 'react';
import ReactLoading from 'react-loading';

function LoaderSmall() {
  return (
    <div className="inset-0 flex items-center justify-center  z-1">
      <ReactLoading type="spinningBubbles" width={40} color="#000000" />
    </div>
  );
}

export default LoaderSmall;
