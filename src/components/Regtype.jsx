import React from 'react';
import { Link } from 'react-router-dom';
import NavbarReg from './NavbarReg';
import RegisterNavbar from '../Navbar/RegisterNavbar';

function Regtype() {
  return (
    <>
    <RegisterNavbar />
    <div className="flex mt-10 flex-col  ">
      <div className="flex flex-1 items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 p-8 max-w-screen-lg mx-auto">
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
