// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import VideoCard from './VideoCard';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loader from '../components/Loader';
// import UNav from '../Navbar/UNav';
// import Footer from '../components/Footer';

// function UserHomepage() {
//     const [videodata, setVideodata] = useState([]);
//     const [userdata, setUserdata] = useState({});
//     const [categories, setCategories] = useState([]);
//     const [ageLevels, setAgeLevels] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [ageFilter, setAgeFilter] = useState('All');
//     const [showModal, setShowModal] = useState(false);
//     const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30);
//     const [isError, setIsError] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [videoload, setVideoload] = useState(true);

//     const navigate = useNavigate();
//     const location = useLocation();
//     const userid = sessionStorage.getItem("userid");

//     useEffect(() => {
//         if (sessionStorage.getItem("loggedOut") === "true") {
//             setIsError(true);
//             sessionStorage.removeItem("loggedOut");
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
//             }, sessionDuration * 60 * 1000);

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
//                 setVideoload(false);

//                 const uniqueAgeLevels = [...new Set(res.data.map(video => video.agelevel))].filter(level => level);
//                 setAgeLevels(['All', ...uniqueAgeLevels]); // Add 'All' as a default option
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the video data:", error);
//                 setVideoload(false);
//             });
//     }, []);

//     useEffect(() => {
//         axios
//             .get("http://localhost:1234/category/all")
//             .then((res) => {
//                 setCategories(res.data);
//             })
//             .catch((error) => {
//                 toast.error("There was an error fetching the Category details", error);
//             });
//     }, []);

//     const handleLogout = () => {
//         sessionStorage.removeItem("userid");
//         sessionStorage.removeItem("sessionDuration");
//         sessionStorage.setItem("loggedOut", "true");
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

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const filteredVideos = videodata.filter(video => {
//         const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
//         const isBlockedCategory = userdata.blockedcatid?.includes(video.category.category_name);
//         const isMatchingCategory = selectedCategory === 'All' || video.category.category_name === selectedCategory;
//         const isMatchingSearchQuery = video.title.toLowerCase().includes(searchQuery.toLowerCase());
//         const isMatchingAgeLevel = ageFilter === 'All' || video.agelevel === ageFilter;
//         return !isBlockedVideo && !isBlockedCategory && isMatchingCategory && isMatchingSearchQuery && isMatchingAgeLevel;
//     });

//     if (isError) {
//         return toast.error("Error Logging in");
//     }

//     return (
//         <>
//             <UNav 
//                 onSetTimer={handleOpenModal}
//                 onLogout={handleLogout}
//                 onSearchChange={handleSearchChange}
//                 searchQuery={searchQuery}
//             />
//             <div className="absolute min-h-screen">
//                 <div className="container mx-auto p-6">
//                     <h2 className='absolute mt-10 text-lg font-semibold text-gray-900 truncate mb-5'>Featured Videos</h2>

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

//                     <div className="mb-6 text-end">
//                         <label htmlFor="age" className="block text-lg font-semibold text-gray-800 mb-2">Filter by Age Level:</label>
//                         <select
//                             id="age"
//                             value={ageFilter}
//                             onChange={(e) => setAgeFilter(e.target.value)}
//                             className="p-2 border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-500 transition-all duration-300"
//                         >
//                             {ageLevels.length > 0 ? (
//                                 ageLevels.map((ageLevel) => (
//                                     <option key={ageLevel} value={ageLevel}>
//                                         {ageLevel}
//                                     </option>
//                                 ))
//                             ) : (
//                                 <option value="All">No Age Levels Available</option>
//                             )}
//                         </select>
//                     </div>

//                     {videoload ? (
//                         <div className="flex justify-center items-center min-h-screen">
//                             <Loader />
//                         </div>
//                     ) : (
//                         <div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {filteredVideos.length > 0 ? (
//                                 filteredVideos.map(video => (
//                                     <VideoCard key={video.id} video={video} />
//                                 ))
//                             ) : (
//                                 <div className="col-span-full flex justify-center align-center text-center text-gray-500">No Videos Available</div>
//                             )}
//                         </div>
//                     )}
//                     <hr className="my-6 border-gray-300" />
//                     <Footer />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default UserHomepage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import UNav from '../Navbar/UNav';
import Footer from '../components/Footer';

function UserHomepage() {
    const [videodata, setVideodata] = useState([]);
    const [userdata, setUserdata] = useState({});
    const [categories, setCategories] = useState([]);
    const [ageLevels, setAgeLevels] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [ageFilter, setAgeFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30);
    const [isError, setIsError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [videoload, setVideoload] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const userid = sessionStorage.getItem("userid");

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
                setVideodata(res.data);
                setVideoload(false);

                const uniqueAgeLevels = [...new Set(res.data.map(video => video.agelevel))].filter(level => level);
                setAgeLevels(['All', ...uniqueAgeLevels]); // Add 'All' as a default option
            })
            .catch((error) => {
                console.error("There was an error fetching the video data:", error);
                setVideoload(false);
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredVideos = videodata.filter(video => {
        const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
        const isBlockedCategory = userdata.blockedcatid?.includes(video.category.category_name);
        const isMatchingCategory = selectedCategory === 'All' || video.category.category_name === selectedCategory;
        const isMatchingSearchQuery = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        const isMatchingAgeLevel = ageFilter === 'All' || video.agelevel === ageFilter;
        return !isBlockedVideo && !isBlockedCategory && isMatchingCategory && isMatchingSearchQuery && isMatchingAgeLevel;
    });

    if (isError) {
        return toast.error("Error Logging in");
    }

    return (
        <>
            <UNav 
                onSetTimer={handleOpenModal}
                onLogout={handleLogout}
                onSearchChange={handleSearchChange}
                searchQuery={searchQuery}
            />
            <div className="absolute min-h-screen">
                <div className="container mx-auto p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1">
                            <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">Filter by Category:</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full p-2 border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-500 transition-all duration-300"
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

                        <div className="flex-1">
                            <label htmlFor="age" className="block text-lg font-semibold text-gray-800 mb-2">Filter by Age Level:</label>
                            <select
                                id="age"
                                value={ageFilter}
                                onChange={(e) => setAgeFilter(e.target.value)}
                                className="w-full p-2 border-dark-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-dark-500 transition-all duration-300"
                            >
                                {ageLevels.length > 0 ? (
                                    ageLevels.map((ageLevel) => (
                                        <option key={ageLevel} value={ageLevel}>
                                            {ageLevel}
                                        </option>
                                    ))
                                ) : (
                                    <option value="All">No Age Levels Available</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <h2 className='text-xl font-semibold text-gray-900 truncate mb-1'>Featured Videos</h2>

                    {videoload ? (
                        <div className="flex justify-center items-center min-h-screen">
                            <Loader />
                        </div>
                    ) : (
                        <div className="grid p-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideos.length > 0 ? (
                                filteredVideos.map(video => (
                                    <VideoCard key={video.id} video={video} />
                                ))
                            ) : (
                                <div className="col-span-full flex justify-center align-center text-center text-gray-500">No Videos Available</div>
                            )}
                        </div>
                    )}
                    <hr className="my-6 border-gray-300" />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default UserHomepage;
