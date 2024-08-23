// import React from 'react'
// import { Link } from 'react-router-dom'

// function Error() {
//   return (
//     // <div className='absolute w-full h-full overflow-hidden flex justify-center align-center'>
//     //   <img src={errorimg} style={{backgroundPosition:"fixed",
//     // backgroundRepeat:"no-repeat",

//     // }}
//     // alt="404 Not found" />
//     // </div>

//     <>
//     <section className='text-gray-700 body-font '>
//     <div className='mt-10 flex justify-center'>
//     <div>
//       {/* <img className=' ml-48 w-96' src="https://static.vecteezy.com/system/resources/previews/002/405/993/original/cartoon-smiling-italian-chef-with-big-moustache-holding-2-empty-plates-with-smoke-steam-for-food-product-vector.jpg" alt="" /> */}
//       <img className=' flex bg-cover w-full h-full' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf9ac836-210c-4613-8adf-4ebae9216190/dguuvk9-74b9f365-e12c-4e88-975c-238276ffb220.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmOWFjODM2LTIxMGMtNDYxMy04YWRmLTRlYmFlOTIxNjE5MFwvZGd1dXZrOS03NGI5ZjM2NS1lMTJjLTRlODgtOTc1Yy0yMzgyNzZmZmIyMjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.h_GMSCeibVgUEmuc-4IIZT97KTFtlHqsBitifOhQ6XA" alt="" />
//         <span className='text-4xl ml-28 font-bold'>😞 Your Cart is Empty and Hungry 😞</span> <br />
//         <br />
//         <h1 className='text-3xl font-sans'>Uh-ho! Looks like this page is not accessible!</h1>
//         <div className=' animate-bounce flex justify-center'>
//         <Link to="/login">
            
//         <button type="button" class="mt-4 py-2 px-2 flex justify-center items-center text-sm font-bold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
//   <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//     <path d="m5 11 4-7"></path>
//     <path d="m19 11-4-7"></path>
//     <path d="M2 11h20"></path>
//     <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
//     <path d="m9 11 1 9"></path>
//     <path d="M4.5 15.5h15"></path>
//     <path d="m15 11-1 9"></path>
//   </svg>
// &nbsp;Login to Continue&nbsp;
// </button>


//         </Link>
//         </div>
//     </div>
//     </div>
//     </section>
//     </>
//   )
// }

// export default Error

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
