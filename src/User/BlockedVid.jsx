// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function BlockedVid() {
//     const [userdata, setUserdata] = useState({});
//     const userid = sessionStorage.getItem("userid");
//     const navi = useNavigate();

//     useEffect(() => {
//         if (userid) {
//             axios
//                 .get(`http://localhost:1234/user/${userid}`)
//                 .then((res) => {
//                     setUserdata(res.data);
//                     console.log(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [userid]);

//     const handleRemoveBlockedVideo = (videoId) => {
//         if (window.confirm('Are you sure you want to unblock this video?')) {
//             axios
//                 .delete(`http://localhost:1234/user/${userid}/block/${videoId}`)
//                 .then((res) => {
//                     toast.success("Video unblocked successfully!");
//                     console.log('Video removed successfully:', res.data);
//                     navi('/UserHomepage');
//                 })
//                 .catch((err) => toast.error('Error removing video:', err));
//         }
//     };

//     return (
//         <div>
//             <h2>Blocked Video ID's:</h2>
//             {userdata.blockedvideosid && userdata.blockedvideosid.length > 0 ? (
//                 <ul>
//                     {userdata.blockedvideosid.map((id, index) => (
//                         <li key={index} className="flex items-center space-x-2">
//                             <span>{id}</span>
//                             <button
//                                 onClick={() => handleRemoveBlockedVideo(id)}
//                                 className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
//                             >
//                                 Delete
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No Videos blocked.</p>
//             )}
//         </div>
//     );
// }

// export default BlockedVid;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UNav from '../Navbar/UNav';

function BlockedVid() {
    const [userdata, setUserdata] = useState({});
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userid = sessionStorage.getItem("userid");
    const navigate = useNavigate();

    useEffect(() => {
        if (userid) {
            // Fetch user data
            axios
                .get(`http://localhost:1234/user/${userid}`)
                .then((res) => {
                    console.log('User Data Response:', res.data); // Debugging
                    setUserdata(res.data);
                    // Fetch video details based on blocked video IDs
                    const blockedVideosIds = res.data.blockedvideosid || [];
                    if (blockedVideosIds.length > 0) {
                        axios
                            .get(`http://localhost:1234/video/all`)
                            .then((videoRes) => {
                                console.log('All Videos Response:', videoRes.data); // Debugging
                                // Filter the videos based on blocked video IDs
                                const filteredVideos = videoRes.data.filter(video => blockedVideosIds.includes(video.id));
                                setVideos(filteredVideos);
                            })
                            .catch((err) => {
                                console.log('Videos API Error:', err); // Debugging
                                toast.error('Failed to fetch video details.');
                            });
                    }
                })
                .catch((err) => {
                    console.log('User API Error:', err); // Debugging
                    toast.error('Failed to fetch user details.');
                });
        }
    }, [userid]);

    const handleRemoveBlockedVideo = (videoId) => {
            axios
                .delete(`http://localhost:1234/user/${userid}/block/${videoId}`)
                .then((res) => {
                    toast.success("Video unblocked successfully!");
                    console.log('Video unblocked successfully:', res.data);
                    // Refresh the page or update state as needed
                    navigate('/UserHomepage');
                })
                .catch((err) => toast.error('Error unblocking video:', err));
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <><UNav /><div className="bg-white min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Go Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mb-6"
                >
                    Go Back
                </button>

                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Blocked Videos</h2>
                {videos.length > 0 ? (
                    <ul className="space-y-4">
                        {videos.map((video) => (
                            <li key={video.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-md">
                                <span className="text-lg text-gray-700">{video.title}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => openModal(video)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => handleRemoveBlockedVideo(video.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                                    >
                                        Unblock
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No videos blocked.</p>
                )}

                {/* Modal for Video Preview */}
                {isModalOpen && selectedVideo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
                        <div className="bg-white p-4 rounded-lg max-w-2xl w-full relative">
                            <button
                                onClick={closeModal}
                                // className="bg-red-500 absolute top-1 right-2  text-gray-600 hover:text-red-900"
                                className="bg-blue-500 text-white top-1 right-2 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mb-6"
                            >
                                Close
                            </button>
                            <h3 className="text-xl font-semibold mb-4">{selectedVideo.title}</h3>
                            <video controls className="w-full rounded-md">
                                <source src={`data:video/mp4;base64,${selectedVideo.videofile}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
            </div>
        </div></>
    );
}

export default BlockedVid;
