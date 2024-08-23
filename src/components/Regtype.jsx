// import React from 'react';

// function Regtype() {
//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       {/* Left Side: Content Creator */}
//       <div
//         className="w-full md:w-1/2 flex items-center justify-center relative bg-cover bg-center"
//         style={{ backgroundImage: `url("https://storage.googleapis.com/macrovector-acl-eu/previews/51434/preview_51434.jpg")` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-sm text-center transform transition-transform duration-300 hover:scale-105">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">Content Creators</h2>
//           <p className="text-gray-600 mb-6">Showcase your content to a global audience. Join us to create and share your work with the world.</p>
//           <a
//             href="/content-creator-register"
//             className="inline-block bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
//           >
//             Register as Creator
//           </a>
//         </div>
//       </div>

//       {/* Right Side: User Registration */}
//       <div
//         className="w-full md:w-1/2 flex items-center justify-center relative bg-cover bg-center"
//         style={{ backgroundImage: `url("https://s.tmimgcdn.com/scr/1600x1000/246100/content-creator-free-vector-illustration-concept_246135-original.jpg")` }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg max-w-sm text-center transform transition-transform duration-300 hover:scale-105">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">User Registration</h2>
//           <p className="text-gray-600 mb-6">Access a variety of fun and educational content tailored just for you. Join our community today!</p>
//           <a
//             href="/user-register"
//             className="inline-block bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform transform hover:scale-105"
//           >
//             Register as User
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Regtype;

// import React from 'react';
// import { Link } from 'react-router-dom';

// function Regtype() {
//   return (
//     <div className="flex flex-col md:flex-row h-screen overflow-hidden">
//       {/* Left Side: Content Creator */}
//       <div className="w-full md:w-1/2 relative flex items-center justify-center">
//         <img
//         src="https://s.tmimgcdn.com/scr/1600x1000/246100/content-creator-free-vector-illustration-concept_246135-original.jpg"
//           alt="Content Creator"
//           className="absolute inset-0 object-cover w-full h-full brightness-70"
//         />
//         <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-md text-center transform transition-transform duration-300 hover:scale-105">
//           <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Content Creators</h2>
//           <p className="text-gray-700 mb-8 text-lg">Showcase your content to a global audience. Create and share your work with the world.</p>
//           <Link
//             to="/creatorreg"
//             className="inline-block bg-gradient-to-r from-teal-400 to-teal-600 text-white py-3 px-6 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-300"
//           >
//             Register as Creator
//           </Link>
//         </div>
//       </div>

//       {/* Right Side: User Registration */}
//       <div className="w-full md:w-1/2 relative flex items-center justify-center">
//         <img
//         //   src="https://storage.googleapis.com/macrovector-acl-eu/previews/51434/preview_51434.jpg"
//           src="https://static.vecteezy.com/system/resources/previews/013/974/049/original/entertaining-using-mobile-app-on-phone-concept-cheerful-young-family-with-kids-cartoon-characters-sitting-laughing-watching-funny-video-on-smartphone-together-illustration-vector.jpg"
//           alt="User Registration"
//           className="absolute inset-0 object-cover w-full h-full brightness-70"
//         />
//         <div className="relative z-10 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-md text-center transform transition-transform duration-300 hover:scale-105">
//           <h2 className="text-4xl font-extrabold text-gray-800 mb-6">User Registration</h2>
//           <p className="text-gray-700 mb-8 text-lg">Access a variety of fun and educational content tailored just for you. Join our community today!</p>
//           <Link
//             to="/UserReg"
//             className="inline-block bg-gradient-to-r from-indigo-400 to-indigo-600 text-white py-3 px-6 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
//           >
//             Register as User
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Regtype;

import React from 'react';
import { Link } from 'react-router-dom';
import NavbarReg from './NavbarReg';
import RegisterNavbar from '../Navbar/RegisterNavbar';

function Regtype() {
  return (
    <>
    {/* <NavbarReg /> */}
    <RegisterNavbar />

    

    <div className="flex mt-10 flex-col  ">
      {/* Main Content Section */}
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 p-8 max-w-screen-lg mx-auto">

          {/* Content Creator Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
              src="https://s.tmimgcdn.com/scr/1600x1000/246100/content-creator-free-vector-illustration-concept_246135-original.jpg"
              alt="Content Creator"
              className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Content Creators</h2>
              <p className="text-gray-600 mb-6">Showcase your content and reach a global audience. Share your creative work with the world.</p>
              <Link
                to="/creatorreg"
                className="inline-block bg-gradient-to-r from-indigo-400 to-indigo-600 text-white py-3 px-6 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Register as Creator
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
              //   src="https://static.vecteezy.com/system/resources/previews/013/974/049/original/entertaining-using-mobile-app-on-phone-concept-cheerful-young-family-with-kids-cartoon-characters-sitting-laughing-watching-funny-video-on-smartphone-together-illustration-vector.jpg"
              //   src="https://images.ctfassets.net/9uhkiji6mhey/3bazmOiHscc6oTqkyaxW6Y/5c2bde43a673b354ca001b05e3692657/GoogleKidsSpace-Case-09.1.jpg?q=100"
              src="https://images.ctfassets.net/9uhkiji6mhey/6ZT6MTwtRSgTdhrfsuYaxh/baecca3a94c84c4a49c07cb9cf52458b/GoogleKidsSpace-Case-07.jpg?q=100"
              alt="User Registration"
              className="w-full h-64 object-cover" />
            <div className="p-6 text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Parents</h2>
              <p className="text-gray-600 mb-6">Access diverse and engaging content tailored just for you and also get access to Parental Controls!</p>
              <Link
                to="/UserReg"
                className="inline-block bg-gradient-to-r from-orange-100 to-orange-50 to-orange-100 text-black py-3 px-6 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Register as Parent
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div></>
  );
}

export default Regtype;
