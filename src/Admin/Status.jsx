// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';
// import ANav from '../Navbar/ANav'; // Assuming ANav is a reusable component like your Dashboard

// const Status = () => {
//     const [pending, setPending] = useState([]);
//     const [approved, setApproved] = useState([]);
//     const [selectedVideo, setSelectedVideo] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [loadingPending, setLoadingPending] = useState(true);
//     const [loadingApproved, setLoadingApproved] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get('http://localhost:1234/video/pending')
//             .then((res) => {
//                 setPending(res.data);
//                 setLoadingPending(false);
//             })
//             .catch((err) => {
//                 toast.error("Error loading pending videos.");
//                 setLoadingPending(false);
//                 console.log(err);
//             });
//     }, []);

//     useEffect(() => {
//         axios
//             .get('http://localhost:1234/video/approved')
//             .then((res) => {
//                 setApproved(res.data);
//                 setLoadingApproved(false);
//             })
//             .catch((err) => {
//                 toast.error("Error loading approved videos.");
//                 setLoadingApproved(false);
//                 console.log(err);
//             });
//     }, []);

//     const handleApprove = (id) => {
//         axios
//             .get(`http://localhost:1234/video/${id}`)
//             .then((res) => {
//                 res.data.status = true;
//                 toast.success("Video Approved Successfully");
//                 return axios.put(`http://localhost:1234/video/${id}`, res.data);
//             })
//             .catch((err) => {
//                 toast.error("Error in Approving video");
//                 console.log(err);
//             });
//     };

//     const handleReject = (id) => {
//         axios
//             .get(`http://localhost:1234/video/${id}`)
//             .then((res) => {
//                 res.data.status = false;
//                 toast.success("Video Rejected Successfully");
//                 return axios.put(`http://localhost:1234/video/${id}`, res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     const openModal = (video) => {
//         setSelectedVideo(video);
//         setModalOpen(true);
//     };

//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedVideo(null);
//     };

//     const handleLogout = () => {
//         toast.success("Logged out successfully");
//         sessionStorage.clear();
//         navigate('/login'); // Adjust the route as needed
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Navigate to the previous page
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-white text-gray-800">
//             <ANav />

//             <main className="flex-1 p-6">
//                 <header className="flex items-center justify-between mb-8">
//                     <h1 className="text-3xl font-bold text-gray-800">Video Status</h1>
//                 </header>

//                 <section className="mb-8">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Videos</h2>
//                     {loadingPending ? (
//                         <div className="flex justify-center items-center h-64">
//                             <div className="text-gray-600">Loading...</div>
//                         </div>
//                     ) : pending.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64">
//                             <img
//                                 className="w-48 h-48 object-cover"
//                                 src="https://img.freepik.com/free-vector/completed-concept-illustration_114360-3891.jpg"
//                                 alt="No pending videos"
//                             />
//                             <p className="text-gray-500 mt-4">No pending videos</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {pending.map((video) => (
//                                 <div key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
//                                     <img
//                                         className="w-full h-32 object-cover rounded-md mb-2"
//                                         src={`data:image/jpeg;base64,${video.image}`} // Assuming thumbnail is in base64 format
//                                         alt={video.title}
//                                     />
//                                     <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
//                                     <p className="text-gray-600">{video.description}</p>
//                                     <div className="flex gap-4 mt-auto">
//                                         <button
//                                             onClick={() => handleApprove(video.id)}
//                                             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
//                                         >
//                                             Approve
//                                         </button>
//                                         <button
//                                             onClick={() => openModal(video)}
//                                             className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
//                                         >
//                                             Preview
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </section>

//                 <section>
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Approved Videos</h2>
//                     {loadingApproved ? (
//                         <div className="flex justify-center items-center h-64">
//                             <div className="text-gray-600">Loading...</div>
//                         </div>
//                     ) : approved.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-64">
//                             <img
//                                 className="w-48 h-48 object-cover"
//                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLEO9n4LWhQTVhCKpYa0iJK33aTQQDFLZEg&s"
//                                 alt="No approved videos"
//                             />
//                             <p className="text-gray-500 mt-4">No approved videos</p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {approved.map((video) => (
//                                 <div key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
//                                     <img
//                                         className="w-full h-32 object-cover rounded-md mb-2"
//                                         src={`data:image/jpeg;base64,${video.image}`} // Assuming thumbnail is in base64 format
//                                         alt={video.title}
//                                     />
//                                     <h3 className="text-lg font-semibold text-gray-800">{video.channelname}</h3>
//                                     <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
//                                     <p className="text-gray-600">{video.description}</p>
//                                     <div className="flex gap-4 mt-auto">
//                                         <button
//                                             onClick={() => openModal(video)}
//                                             className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
//                                         >
//                                             Preview
//                                         </button>
//                                         <button
//                                             onClick={() => handleReject(video.id)}
//                                             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                                         >
//                                             Reject
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </section>

//                 {/* Video Preview Modal */}
//                 {modalOpen && selectedVideo && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-transform scale-95 hover:scale-100">
//                             <h2 className="text-2xl font-bold mb-4 text-gray-800">Title: {selectedVideo.title}</h2>
//                             <p className="text-gray-800 mb-4">Description: {selectedVideo.description}</p>
//                             <video controls autoPlay className="w-full mb-4 border border-gray-300 rounded-lg">
//                                 <source src={`data:video/mp4;base64,${selectedVideo.videofile}`} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                             <div className="text-right">
//                                 <button
//                                     onClick={closeModal}
//                                     className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>

//             <ToastContainer />
//         </div>
//     );
// };

// export default Status;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ANav from '../Navbar/ANav';

const Status = () => {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [loadingPending, setLoadingPending] = useState(true);
    const [loadingApproved, setLoadingApproved] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch pending videos
        axios
            .get('http://localhost:1234/video/pending')
            .then((res) => {
                setPending(res.data);
                setLoadingPending(false);
            })
            .catch((err) => {
                toast.error("Error loading pending videos.");
                setLoadingPending(false);
                console.log(err);
            });

        axios
            .get('http://localhost:1234/video/approved')
            .then((res) => {
                setApproved(res.data);
                setLoadingApproved(false);
            })
            .catch((err) => {
                toast.error("Error loading approved videos.");
                setLoadingApproved(false);
                console.log(err);
            });
    }, []);

    const handleApprove = (id) => {
        axios
            .get(`http://localhost:1234/video/${id}`)
            .then((res) => {
                res.data.status = true;
                toast.success("Video Approved Successfully");
                return axios.put(`http://localhost:1234/video/${id}`, res.data);
            })
            .catch((err) => {
                toast.error("Error in Approving video");
                console.log(err);
            });
    };

    const handleReject = (id) => {
        axios
            .get(`http://localhost:1234/video/${id}`)
            .then((res) => {
                res.data.status = false;
                toast.success("Video Rejected Successfully");
                return axios.put(`http://localhost:1234/video/${id}`, res.data);
            })
            .catch((err) => console.log(err));
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedVideo(null);
    };

    const handleLogout = () => {
        toast.success("Logged out successfully");
        sessionStorage.clear();
        navigate('/login');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <ANav />

            <main className="flex-1 p-6">
                <button
                    onClick={handleGoBack}
                    className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                    Go Back
                </button>
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Video Status</h1>
                </header>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Videos</h2>
                    {loadingPending ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-600">Loading...</div>
                        </div>
                    ) : pending.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                className="w-48 h-48 object-cover"
                                src="https://img.freepik.com/free-vector/completed-concept-illustration_114360-3891.jpg"
                                alt="No pending videos"
                            />
                            <p className="text-gray-500 mt-4">No pending videos</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pending.map((video) => (
                                <div key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
                                    <img
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                        src={`data:image/jpeg;base64,${video.image}`} // Assuming thumbnail is in base64 format
                                        alt={video.title}
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                                    <p className="text-gray-600">Channel: {video.creator.channelname}</p>
                                    <p className="text-gray-600">{video.description}</p>
                                    <div className="flex gap-4 mt-auto">
                                        <button
                                            onClick={() => handleApprove(video.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => openModal(video)}
                                            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Approved Videos</h2>
                    {loadingApproved ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-600">Loading...</div>
                        </div>
                    ) : approved.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                className="w-48 h-48 object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLEO9n4LWhQTVhCKpYa0iJK33aTQQDFLZEg&s"
                                alt="No approved videos"
                            />
                            <p className="text-gray-500 mt-4">No approved videos</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {approved.map((video) => (
                                <div key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col gap-4">
                                    <img
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                        src={`data:image/jpeg;base64,${video.image}`} // Assuming thumbnail is in base64 format
                                        alt={video.title}
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                                    <p className="text-gray-600">Channel: {video.creator.channelname}</p>
                                    <p className="text-gray-600">{video.description}</p>
                                    <div className="flex gap-4 mt-auto">
                                        <button
                                            onClick={() => openModal(video)}
                                            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => handleReject(video.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Video Preview Modal */}
                {modalOpen && selectedVideo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Title: {selectedVideo.title}</h2>
                            <p className="text-gray-800 mb-4"><span className=' font-bold'>Description: </span>Description: {selectedVideo.description}</p>
                            <p className="text-gray-800 mb-4"><span className=' font-bold'>Age Level: </span>{selectedVideo.agelevel}</p>
                            <p className="text-gray-800 mb-4"><span className=' font-bold'>Category: </span>{selectedVideo.category.category_name}</p>
                            <video controls autoPlay className="w-full mb-4 border border-gray-300 rounded-lg">
                                <source src={`data:video/mp4;base64,${selectedVideo.videofile}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="text-right">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <ToastContainer />
        </div>
    );
};

export default Status;
