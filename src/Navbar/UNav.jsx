// import { useState, useRef, useEffect } from "react"
// import logo from '../images/ytlogo.png'

// const ProfileDropDown = (props) => {

//     const [state, setState] = useState(false)
//     const profileRef = useRef()

//     const navigation = [
//         { title: "Dashboard", path: "javascript:void(0)" },
//         { title: "Settings", path: "javascript:void(0)" },
//         { title: "Log out", path: "javascript:void(0)" },
//     ]

    
//     useEffect(() => {
//         const handleDropDown = (e) => {
//             if (!profileRef.current.contains(e.target)) setState(false)
//         }
//         document.addEventListener('click', handleDropDown)
//     }, [])

//     return (
//         <div className={`relative ${props.class}`}>
//             <div className="flex items-center space-x-4">
//                 <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
//                     onClick={() => setState(!state)}
//                 >
//                     <img
//                         src={"https://randomuser.me/api/portraits/men/46.jpg"}
//                         className="w-full h-full rounded-full"
//                     />
//                 </button>
//                 <div className="lg:hidden">
//                     <span className="block">Micheal John</span>
//                     <span className="block text-sm text-gray-500">john@gmail.com</span>
//                 </div>
//             </div>
//             <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
//                 {
//                     navigation.map((item, idx) => (
//                         <li>
//                             <a key={idx} className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" href={item.path}>
//                                 {item.title}
//                             </a>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </div>
//     )
// }

// export default () => {

//     const [menuState, setMenuState] = useState(false)

//   // Replace javascript:void(0) path with your path
//   const navigation = [
//       { title: "Customers", path: "javascript:void(0)" },
//       { title: "Careers", path: "javascript:void(0)" },
//       { title: "Guides", path: "javascript:void(0)" },
//       { title: "Partners", path: "javascript:void(0)" },
//   ]
//     return (
//         <nav className="bg-white border-b">
//             <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
//                 <div className="flex-none lg:flex-initial">
//                     <a href="javascript:void(0)">
//                         <img
//                             src={logo}
//                             width={50} 
//                             height={50}
//                             alt="Float UI logo"
//                         />
//                     </a>
//                 </div>
//                 <div className="flex-1 flex items-center justify-between">
//                 <form className="flex ml-96 items-center space-x-4 border rounded-lg p-2">
//                             <input
//                                 className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 md:w-auto"
//                                 type="text"
//                                 placeholder="Search Cartoons..."
//                             />
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-none text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </form>
//                     <div className={`bg-white absolute z-60 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>

//                         <ProfileDropDown 
//                             class="mt-5 pt-5 border-t lg:hidden"
//                         />
//                     </div>
//                     <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                        
//                         <ProfileDropDown 
//                             class="hidden lg:block"
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
//     )
// }


import { useState } from 'react';
import logo from '../images/ytlogo.png';
import ProfileDrop from './ProfileDrop';
import { Link } from 'react-router-dom';

const UNav = ({ onSetTimer, onLogout }) => {
    const [menuState, setMenuState] = useState(false);

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

<div class="relative">
  <label for="Search" class="sr-only"> Search </label>

  <input
    type="text"
    id="Search"
    placeholder="Search Rhymes..."
    className="flex ml-80 items-center space-x-4 border rounded-lg p-2 rounded-3xl border-gray-700 py-2 pe-44 shadow-sm sm:text-sm"
  />

  <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
    <button type="button" class="text-gray-600 hover:text-gray-700">
      <span class="sr-only">Search</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
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
