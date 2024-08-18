// import React from 'react';

// const Homepage = () => {
//     return (
//         <div className="min-h-screen bg-blue-50 flex flex-col overflow-hidden">
//             <main className="flex-grow flex items-center justify-center">
//                 <div className="relative w-full max-w-4xl h-screen overflow-hidden group">
//                     <section className="relative w-full h-full">
//                         <img
//                             src="https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg"
//                             alt="YouTube Kids"
//                             className="w-full h-full rounded-lg shadow-2xl object-cover transition-transform transform group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 p-6 text-center text-white rounded-lg">
//                             <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">Welcome to YouTube Kids!</h1>
//                             <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">Discover fun and educational videos just for you.</p>
//                             <a href="/UserReg" className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">Sign Up Now!</a>
//                         </div>
//                     </section>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Homepage;

import React from 'react';
import './Homepage.css';
import Navbar from './Navbar';

const Homepage = () => {
    return (
      <>
      <Navbar />
      <section className='relative flex justify-center w-full h-full'>
      <div class="videoContainer">
        <video  autoPlay muted>
          <source src="//videos.ctfassets.net/9uhkiji6mhey/RGiEfncMpkZlEV0Ejf4NR/c7cbf87bf813bf7f03c192787dead6d9/Hero-video-Landscape.mp4" />
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-6 text-center text-white rounded-lg">
                  <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">Welcome to YouTube Kids!</h1>
                  <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">Discover fun and educational videos just for you.</p>
                  <a href="/regtype" id='button' className="bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-8 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">Explore Now!</a>
                </div>
      </div>
      </section>
      
      <div className="min-h-screen bg-blue-50 flex flex-col overflow-hidden">
          <main className="flex-grow flex items-center justify-center">
            <div className="relative w-100 max-w-4xl w-screen overflow-hidden group">

              {/* <section className="relative w-full h-full">
                <video
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover rounded-lg shadow-2xl transition-transform transform "
                >
                  <source src='https://videos.ctfassets.net/9uhkiji6mhey/6JcjmB5tjYN2O5biUvE3Qo/5e4b95a5c7d12619d76798a6751cdb6c/02_Case_Study_Logo_Construction.mp4' type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 p-6 text-center text-white rounded-lg">
                  <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">Welcome to YouTube Kids!</h1>
                  <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">Discover fun and educational videos just for you.</p>
                  <a href="/regtype" id='button' className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">Explore Now!</a>
                </div>
              </section> */}


            </div>
          </main>
          <section className='container'>
            {/* <img src="https://images.ctfassets.net/9uhkiji6mhey/6ZT6MTwtRSgTdhrfsuYaxh/baecca3a94c84c4a49c07cb9cf52458b/GoogleKidsSpace-Case-07.jpg?q=100" alt="" /> */}
            {/* <img src="https://images.ctfassets.net/9uhkiji6mhey/6VYnv5vvLslyslxnBk6D3g/9dbdb603a21c4c64f835c66f25f085ba/GoogleKidsSpace-Case-02.1.jpg?q=100" alt="" /> */}
            <video autoPlay muted loop>
              <source src='https://videos.ctfassets.net/9uhkiji6mhey/6ATc7snDlk6GzqLUrgEEnr/47aa4d469aabbbbbeedc347906b7b75f/1.mp4' />
            </video>
          </section>
        </div></>
    );
};

export default Homepage;

