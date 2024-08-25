import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <section className='flex flex-col items-center justify-center min-h-screen bg-white text-gray-800'>
      <div className='text-center'>
        <img 
          className='w-64 mx-auto mb-4' 
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg" 
          alt="Error 404"
        />
        <h3 className='text-4xl font-bold text-blue-600 mb-4'>404 Not Found</h3>
        <h1 className='text-4xl font-bold text-black-600 mb-4'>😞 Oops! The Page Not Found 😞</h1>
        {/* <p className='text-xl mb-6'>It seems like the page you’re looking for doesn’t exist.</p> */}
        <Link to="/">
          <button 
            type="button" 
            className="py-2 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <svg 
              className="inline-block w-5 h-5 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M5 12l7 7 7-7-7-7-7 7z"
              />
            </svg>
            Go to Home
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Error;
