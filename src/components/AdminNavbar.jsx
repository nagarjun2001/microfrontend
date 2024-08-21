import { useEffect, useState } from 'react'
import logo from '../images/ytlogo.png'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default () => {
  const [state, setState] = useState(false)

  const navigate = useNavigate();

  const navigation = [
      { title: "Customers", path: "javascript:void(0)" },
      { title: "Careers", path: "javascript:void(0)" },
      { title: "Guides", path: "javascript:void(0)" },
      { title: "Partners", path: "javascript:void(0)" }
  ]

    //   useEffect(() => {
    //     if (window.location.pathname === '/userhomepage' && sessionDuration === 0) {
    //         handleLogout();
    //     }
    // }, [location, sessionDuration]);


  const handleLogout = () => {
    sessionStorage.removeItem("adminid");
    sessionStorage.removeItem("sessionDuration"); 
    navigate("/login");
};

  return (
      <nav className="absolute bg-red-600 bg-opacity-900 font-bold w-full border-b border-transparent md:border-0 md:static">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-10">
              <div className="flex items-center justify-between py-3 md:py-2 md:block">
                    <Link to="/">
                        <img
                            src={logo}
                            width={40} 
                            // height={50}
                            alt="YT Kids logo"
                        />
                    </Link>
                  <div className="md:hidden">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          onClick={() => setState(!state)}
                      >
                          {
                              state ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                              )
                          }
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                  <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                      {/* {
                        <div class="bg-white justify-center flex px-1 py-1 rounded-full  border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                        <input type='text' placeholder="How to draw a perfect 'O'..." className="w-full outline-none bg-white text-sm" />
                        <button type='button'
                          class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-1.5">Search</button>
                      </div>
                      } */}
                      
                  </ul>
              </div>
              <div className="hidden md:inline-block">
                <Link to="/" onClick={handleLogout} className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                    Logout
                </Link>
              </div> &nbsp;
          </div>
      </nav>
  )
}
