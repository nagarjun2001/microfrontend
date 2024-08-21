// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import VideoCard from './VideoCard';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import Timer from '../User/Timer';
// import { toast } from 'react-toastify';
// import ULogNav from '../Navbar/ULogNav';
// import { BsGear } from 'react-icons/bs'; 
// import Error from '../components/Error'; 
// import Loader from '../components/Loader';
// import UserHero from './UserHero';
// import UNav from '../Navbar/UNav';

// function UserHomepage() {
//     const [videodata, setVideodata] = useState([]);
//     const [userdata, setUserdata] = useState({});
//     const [categories, setCategories] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [showModal, setShowModal] = useState(false);
//     const [showSettings, setShowSettings] = useState(false);
//     const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30);
//     const [isError, setIsError] = useState(false); // State to manage error display
//     const navigate = useNavigate();
//     const location = useLocation();
//     const userid = sessionStorage.getItem("userid");

//     useEffect(() => {
//         // Check if the user has logged out and is trying to access a protected route
//         if (sessionStorage.getItem("loggedOut") === "true") {
//             setIsError(true);
//             sessionStorage.removeItem("loggedOut"); // Remove the flag after handling
//         } else if (userid) {
//             axios
//                 .get(`http://localhost:1234/user/${userid}`)
//                 .then((res) => {
//                     setUserdata(res.data);
//                 })
//                 .catch((err) => {
//                     console.log("error", err);
//                 });
//         } else {
//             navigate("/login");
//         }

//         if (sessionDuration > 0) {
//             const timerId = setTimeout(() => {
//                 handleLogout();
//             }, sessionDuration * 60 * 1000); // Convert minutes to milliseconds

//             return () => clearTimeout(timerId);
//         }
//     }, [userid, sessionDuration]);

//     useEffect(() => {
//         if (location.pathname === '/userhomepage' && sessionDuration === 0) {
//             handleLogout();
//         }
//     }, [location, sessionDuration]);

//     useEffect(() => {
//         axios
//             .get("http://localhost:1234/video/approved")
//             .then((res) => {
//                 setVideodata(res.data);
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the video data:", error);
//             });
//     }, []);

//     useEffect(() => {
//         axios
//             .get("http://localhost:1234/category/all")
//             .then((res) => {
//                 setCategories(res.data); // Assuming res.data is an array of category objects
//             })
//             .catch((error) => {
//                 toast.error("There was an error fetching the Category details", error);
//             });
//     }, []);

//     const handleLogout = () => {
//         sessionStorage.removeItem("userid");
//         sessionStorage.removeItem("sessionDuration"); // Clear session duration
//         sessionStorage.setItem("loggedOut", "true"); // Set a flag to indicate logout
//         navigate("/login");
//     };

//     const handleCategoryChange = (e) => {
//         setSelectedCategory(e.target.value);
//     };

//     const handleOpenModal = () => setShowModal(true);
//     const handleCloseModal = () => setShowModal(false);

//     const handleDuration = (minutes) => {
//         setSessionDuration(minutes);
//         sessionStorage.setItem('sessionDuration', minutes);
//     };

//     const filteredVideos = videodata.filter(video => {
//         const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
//         const isBlockedCategory = userdata.blockedcatid?.includes(video.category.category_name);
//         const isMatchingCategory = selectedCategory === 'All' || video.category.category_name === selectedCategory;
//         return !isBlockedVideo && !isBlockedCategory && isMatchingCategory;
//     });

//     const toggleSettings = () => setShowSettings(prev => !prev);

//     if (isError) {
//         return <Error />;
//     }
//     return (
//         <>
//             {/* <ULogNav /> */}

//             {/* carousal */}
// <UNav />
//             {/* carousal end */}
            
//             <div className="absolute min-h-screen">
//                 {/* Settings Icon */}
//                 <div className="absolute top-6 left-6">
//                     <button
//                         onClick={toggleSettings}
//                         className="bg-red-600 text-gray-800 p-3 rounded-full shadow-md hover:bg-red-500 transition-colors duration-300"
//                     >
//                         <BsGear size={24} />
//                     </button>
//                     {showSettings && (
//                         <div className=" absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
//                             <ul className="space-y-2">
//                                 <li>
//                                     <button
//                                         onClick={handleOpenModal}
//                                         className="w-full text-left text-blue-600 hover:text-blue-800 transition-colors duration-300"
//                                     >
//                                         Set Timer
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <Link to="/userblockvid">
//                                         <button className="w-full text-left text-red-600 hover:text-red-800 transition-colors duration-300">
//                                             Blocked Videos
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/userblockcat">
//                                         <button className="w-full text-left text-red-600 hover:text-red-800 transition-colors duration-300">
//                                             Blocked Categories
//                                         </button>
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <button
//                                         onClick={handleLogout}
//                                         className="w-full text-left text-red-600 hover:text-red-800 transition-colors duration-300"
//                                     >
//                                         Logout
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 <div className="container mx-auto p-6">
//                     <div className="mb-6 text-end">
//                         <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">Filter by Category:</label>
//                         <select
//                             id="category"
//                             value={selectedCategory}
//                             onChange={handleCategoryChange}
//                             className="p-2 border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-500 transition-all duration-300"
//                         >
//                             <option value="All">All</option>
//                             {categories.length > 0 ? (
//                                 categories.map((cat) => (
//                                     <option key={cat.id} value={cat.category_name}>
//                                         {cat.category_name}
//                                     </option>
//                                 ))
//                             ) : (
//                                 <option value="All">No Categories Available</option>
//                             )}
//                         </select>
//                     </div>
//                     <h2 className='text-lg font-semibold text-gray-900 truncate mb-5'>Featured Videos</h2>

                    


//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {filteredVideos.length > 0 ? (
//                             filteredVideos.map(video => (
//                                 <VideoCard key={video.id} video={video} />
//                             ))
//                         ) : (
//                             <div className="col-span-full text-center text-gray-500"><Loader /></div>
//                         )}
//                     </div>

//                     <hr className="my-6 border-gray-300" />
//                     {showModal && (
//                         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                             <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//                                 <h2 className="text-xl font-semibold mb-4">Set Timer</h2>
//                                 <div className="flex flex-col space-y-4">
//                                 <button
//                                         onClick={() => handleDuration(1)}
//                                         className="p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300"
//                                     >
//                                         1 minute
//                                     </button>
//                                     <button
//                                         onClick={() => handleDuration(30)}
//                                         className="p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300"
//                                     >
//                                         30 minutes
//                                     </button>
//                                     <button
//                                         onClick={() => handleDuration(60)}
//                                         className="p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition-colors duration-300"
//                                     >
//                                         60 minutes
//                                     </button>
//                                     <button
//                                         onClick={() => handleDuration(120)}
//                                         className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300"
//                                     >
//                                         120 minutes
//                                     </button>
//                                     <button
//                                         onClick={handleCloseModal}
//                                         className="p-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-300"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UserHomepage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Error from '../components/Error'; 
import Loader from '../components/Loader';
import UNav from '../Navbar/UNav';

function UserHomepage() {
    const [videodata, setVideodata] = useState([]);
    const [userdata, setUserdata] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const userid = sessionStorage.getItem("userid");
    const [videoload, setVideoload] = useState(true);

    useEffect(() => {
        if (sessionStorage.getItem("loggedOut") === "true") {
            setIsError(true);
            sessionStorage.removeItem("loggedOut");
        } else if (userid) {
            axios
                .get(`http://localhost:1234/user/${userid}`)
                .then((res) => {
                    setUserdata(res.data);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        } else {
            navigate("/login");
        }

        if (sessionDuration > 0) {
            const timerId = setTimeout(() => {
                handleLogout();
            }, sessionDuration * 60 * 1000);

            return () => clearTimeout(timerId);
        }
    }, [userid, sessionDuration]);

    useEffect(() => {
        if (location.pathname === '/userhomepage' && sessionDuration === 0) {
            handleLogout();
        }
    }, [location, sessionDuration]);
    
    useEffect(() => {
        axios
            .get("http://localhost:1234/video/approved")
            .then((res) => {
                setVideoload(false);
                setVideodata(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the video data:", error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:1234/category/all")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                toast.error("There was an error fetching the Category details", error);
            });
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("sessionDuration");
        sessionStorage.setItem("loggedOut", "true");
        navigate("/login");
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDuration = (minutes) => {
        setSessionDuration(minutes);
        sessionStorage.setItem('sessionDuration', minutes);
    };

    useEffect(() => {
        if (sessionDuration > 0) {
            const timerId = setTimeout(() => {
                handleLogout();
            }, sessionDuration * 60 * 1000);
    
            return () => clearTimeout(timerId);
        }
    }, [sessionDuration]);
    
    useEffect(() => {
        if (location.pathname === '/userhomepage' && sessionDuration === 0) {
            handleLogout();
        }
    }, [location, sessionDuration]);

    
    const filteredVideos = videodata.filter(video => {
        const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
        const isBlockedCategory = userdata.blockedcatid?.includes(video.category.category_name);
        const isMatchingCategory = selectedCategory === 'All' || video.category.category_name === selectedCategory;
        return !isBlockedVideo && !isBlockedCategory && isMatchingCategory;
    });

    if (isError) {
        return toast.error("Error Logging in");
    }

    return (
        <>
            <UNav 
                onSetTimer={handleOpenModal}
                onLogout={handleLogout}
            />
            <div className="absolute min-h-screen">
                <div className="container mx-auto p-6">
                <h2 className='absolute mt-10 text-lg font-semibold text-gray-900 truncate mb-5'>Featured Videos</h2>

                    <div className="mb-6 text-end">
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">Filter by Category:</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="p-2 border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-500 transition-all duration-300"
                        >
                            <option value="All">All</option>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.category_name}>
                                        {cat.category_name}
                                    </option>
                                ))
                            ) : (
                                <option value="All">No Categories Available</option>
                            )}
                        </select>
                    </div>
                    <div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.length > 0 ? (
                            filteredVideos.map(video => (
                                <VideoCard key={video.id} video={video} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">Loading...</div>
                        )}
                    </div>
                    <hr className="my-6 border-gray-300" />
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                <h2 className="text-xl font-semibold mb-4">Set Timer</h2>
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleDuration(1)}
                                        className="p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300"
                                    >
                                        1 minute
                                    </button>
                                    <button
                                        onClick={() => handleDuration(30)}
                                        className="p-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-300"
                                    >
                                        30 minutes
                                    </button>
                                    <button
                                        onClick={() => handleDuration(60)}
                                        className="p-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition-colors duration-300"
                                    >
                                        60 minutes
                                    </button>
                                    <button
                                        onClick={() => handleDuration(120)}
                                        className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-300"
                                    >
                                        120 minutes
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="p-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserHomepage;
