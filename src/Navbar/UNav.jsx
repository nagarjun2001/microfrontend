// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../images/ytlogo.png';
// import ProfileDrop from './ProfileDrop';

// const UNav = ({ onSetTimer, onLogout, onSearchChange, searchQuery }) => {
//     const [menuState, setMenuState] = useState(false);

//     return (
//         <nav className="bg-white border-b">
//             <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
//                 <div className="flex-none lg:flex-initial">
//                     <Link to="/">
//                         <img
//                             src={logo}
//                             width={50}
//                             height={50}
//                             alt="Logo"
//                         />
//                     </Link>
//                 </div>
//                 <div className="flex-1 flex items-center justify-between">
//                     <div className="relative">
//                         <label htmlFor="Search" className="sr-only">Search</label>
//                         <input
//                             type="text"
//                             id="Search"
//                             placeholder="Search Videos..."
//                             value={searchQuery}
//                             onChange={onSearchChange}
//                             className="flex ml-80 items-center space-x-4 border rounded-lg p-2 rounded-3xl border-gray-700 py-2 pe-44 shadow-sm sm:text-sm"
//                         />
//                         <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
//                             <button type="button" className="text-gray-600 hover:text-gray-700">
//                                 <span className="sr-only">Search</span>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     strokeWidth="1.5"
//                                     stroke="currentColor"
//                                     className="size-4"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//                                     />
//                                 </svg>
//                             </button>
//                         </span>
//                     </div>
//                     <div className="flex z-50 items-center space-x-2 sm:space-x-6">
//                         <ProfileDrop
//                             onSetTimer={onSetTimer}
//                             onLogout={onLogout}
//                         />
//                         <button 
//                             className="outline-none text-gray-400 block lg:hidden"
//                             onClick={() => setMenuState(!menuState)}
//                         >
//                             {
//                                 menuState ? (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 ) : (
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                                     </svg>
//                                 )
//                             }
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default UNav;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/ytlogo.png';
import ProfileDrop from './ProfileDrop';

const UNav = ({ onSetTimer, onLogout, onSearchChange, searchQuery }) => {
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <Link to="/">
                        <img
                            src={logo}
                            width={50}
                            height={50}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-between">
                    <div className="relative">
                        <label htmlFor="Search" className="sr-only">Search</label>
                        <input
                            type="text"
                            id="Search"
                            placeholder="Search Videos..."
                            value={searchQuery}
                            onChange={onSearchChange}
                            className="flex ml-80 items-center space-x-4 border rounded-lg p-2 rounded-3xl border-gray-700 py-2 pe-44 shadow-sm sm:text-sm"
                        />
                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="button" className="text-gray-600 hover:text-gray-700">
                                <span className="sr-only">Search</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className="flex z-50 items-center space-x-2 sm:space-x-6">
                        <ProfileDrop
                            onSetTimer={onSetTimer}
                            onLogout={onLogout}
                        />
                        <button 
                            className="outline-none text-gray-400 block lg:hidden"
                            onClick={() => setMenuState(!menuState)}
                        >
                            {
                                menuState ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UNav;