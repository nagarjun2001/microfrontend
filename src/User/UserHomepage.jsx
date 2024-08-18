// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import VideoCard from '../components/VideoCard';
// import { Link } from 'react-router-dom';

// function UserHomepage() {
//     const [videodata, setVideodata] = useState([]);
//     const [userdata, setUserdata] = useState([]);
//     const userid = sessionStorage.getItem("userid");

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
//         if (userid) {
//             axios
//                 .get(`http://localhost:1234/user/${userid}`)
//                 .then((res) => {
//                     setUserdata(res.data);
//                 })
//                 .catch((err) => {
//                     console.log("error", err);
//                 });
//         } else {
//             console.log("Error");
//         }
//     }, [userid]);

//     const handleLogout = () => {
//         sessionStorage.removeItem("userid");
//         window.location.href = "/login";
//     };

//     const filteredVideos = videodata.filter(video => {
//         const isBlockedVideo = userdata.blockedvideosid.includes(video.id);
//         const isBlockedCategory = userdata.blockedcatid.includes(video.category.category_name);
//         return !isBlockedVideo && !isBlockedCategory;
//     });

//     return (
//         <>
//             <h1 className="text-2xl text-center font-bold mb-2">Welcome back, {userdata.lname}</h1>
//             <div className='text-end'>    
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
//                 >
//                     Logout
//                 </button>

//             </div>
//             <div className="p-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {filteredVideos.map(video => (
//                         <VideoCard key={video.id} video={video} />
//                     ))}
//                 </div>
//                 <p></p>
//                 <hr className="my-4" />
//                 <Link to="/userblockvid">
//                 <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
//                 >
//                     Blocked Videos
//                 </button>
//             </Link>
                
//             <Link to="/userblockcat">
//                 <button
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
//                 >
//                     Blocked Categories
//                 </button>
//             </Link><br />

//             </div>
//         </>
//     );
// }

// export default UserHomepage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Timer from '../User/Timer';

function UserHomepage() {
    const [videodata, setVideodata] = useState([]);
    const [userdata, setUserdata] = useState({});
    const [filteredCategory, setFilteredCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30); // Default to 30 minutes
    const navigate = useNavigate();
    const location = useLocation();
    const userid = sessionStorage.getItem("userid");

    useEffect(() => {
        if (userid) {
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

        // Set up the timer if sessionDuration is set
        if (sessionDuration > 0) {
            const timerId = setTimeout(() => {
                handleLogout();
            }, sessionDuration * 60 * 1000); // Convert minutes to milliseconds

            return () => clearTimeout(timerId);
        }
    }, [userid, sessionDuration]);

    useEffect(() => {
        // Prevent navigation back to the page after session timeout
        if (location.pathname === '/userhomepage' && sessionDuration === 0) {
            handleLogout();
        }
    }, [location, sessionDuration]);

    useEffect(() => {
        axios
            .get("http://localhost:1234/video/approved")
            .then((res) => {
                setVideodata(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the video data:", error);
            });
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("sessionDuration"); // Clear session duration
        navigate("/login");
    };

    const handleCategoryChange = (e) => {
        setFilteredCategory(e.target.value);
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDuration = (minutes) => {
        setSessionDuration(minutes);
        sessionStorage.setItem('sessionDuration', minutes); // Store duration
    };

    const filteredVideos = videodata.filter(video => {
        const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
        const isBlockedCategory = userdata.blockedcatid?.includes(video.category.category_name);
        const isMatchingCategory = filteredCategory === 'All' || video.category.category_name === filteredCategory;
        return !isBlockedVideo && !isBlockedCategory && isMatchingCategory;
    });

    return (
        <>
            <h1 className="text-2xl text-center font-bold mb-2">Welcome back, {userdata.lname}</h1>
            <div className='text-end'>
                <button
                    onClick={handleOpenModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Set Session Duration
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 mt-2"
                >
                    Logout
                </button>
            </div>
    
            <div className="p-4">
                <div className="mb-4">
                    <label htmlFor="category-filter" className="mr-2">Filter by Category:</label>
                    <select id="category-filter" value={filteredCategory} onChange={handleCategoryChange}>
                        <option value="All">All</option>
                        {userdata.blockedcatid?.length > 0 ? (
                            userdata.blockedcatid.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))
                        ) : (
                            <option value="All">No Categories Available</option>
                        )}
                    </select>
                </div>
    
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredVideos.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
                <p></p>
                <hr className="my-4" />
    
                <Link to="/userblockvid">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Blocked Videos
                    </button>
                </Link>
    
                <Link to="/userblockcat">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                    >
                        Blocked Categories
                    </button>
                </Link>
                <br />
            </div>
    
            <Timer
                show={showModal}
                handleClose={handleCloseModal}
                handleDuration={handleDuration}
            />
        </>
    );
}

export default UserHomepage;
