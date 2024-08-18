// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// function Status() {
//     const [pending, setPending] = useState([]);
//     const [approved, setApproved] = useState([]);
//     const [selectedVideo, setSelectedVideo] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);

//     useEffect(() => {
//         axios
//             .get('http://localhost:1234/video/pending')
//             .then((res) => {
//                 setPending(res.data);
//             })
//             .catch((err) => console.log(err));
//     }, []);

//     useEffect(() => {
//         axios
//             .get('http://localhost:1234/video/approved')
//             .then((res) => {
//                 setApproved(res.data);
//             })
//             .catch((err) => console.log(err));
//     }, []);

//     const handleApprove = (id) => {
//         axios
//             .get(`http://localhost:1234/video/${id}`)
//             .then((res) => {
//                 res.data.status = true;
//                 toast.success("Video Approved Successfully");
//                 return axios.put(`http://localhost:1234/video/${id}`, res.data);
//             })
//             .catch((err) => console.log(err));
//     };

//     const handleReject = (id) => {
//         axios
//             .get(`http://localhost:1234/video/${id}`)
//             .then((res) => {
//                 res.data.status = false;
//                 toast.error("Video Rejected Successfully");
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

//     return (
//         <div className="p-8 bg-gray-200 min-h-screen">
//             <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Video Status</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pending Videos</h2>
//                     {pending.length === 0 ? (
//                         <p className="text-gray-500">No pending videos</p>
//                     ) : (
//                         pending.map((video) => (
//                             <div key={video.id} className="bg-white p-5 rounded-lg shadow-md mb-4 transition-transform transform hover:shadow-xl hover:bg-gray-50">
//                                 <h3 className="text-xl font-bold mb-2 text-gray-800">{video.title}</h3>
//                                 <p className="text-gray-600">{video.description}</p>
//                                 <div className="mt-4 flex space-x-4">
//                                     <button
//                                         onClick={() => handleApprove(video.id)}
//                                         className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//                                     >
//                                         Approve
//                                     </button>
//                                     {/* <button
//                                         onClick={() => handleReject(video.id)}
//                                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//                                     >
//                                         Reject
//                                     </button> */}
//                                     <button
//                                         onClick={() => openModal(video)}
//                                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                                     >
//                                         Preview
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//                 <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-700">Approved Videos</h2>
//                     {approved.length === 0 ? (
//                         <><p className="text-gray-500">No approved videos</p>
//                         <img
//                         className='justify-center' 
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_L_G_qC5KMEg0mvJ1linAGZXOdKo_1bz1w&s" alt="" /></>
//                     ) : (
//                         approved.map((video) => (
//                             <div key={video.id} className="bg-white p-5 rounded-lg shadow-md mb-4 transition-transform transform hover:shadow-xl hover:bg-gray-50">
//                                 <h3 className="text-xl font-bold mb-2 text-gray-800">{video.title}</h3>
//                                 <p className="text-gray-600">{video.description}</p>
//                                 <div className="mt-4 flex space-x-4">
//                                     <button
//                                         onClick={() => openModal(video)}
//                                         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                                     >
//                                         Preview
//                                     </button>
//                                     <button
//                                         onClick={() => handleReject(video.id)}
//                                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//                                     >
//                                         Reject
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {modalOpen && selectedVideo && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-transform scale-95 hover:scale-100">
//                         <h2 className="text-2xl font-bold mb-4 text-gray-800">Title: {selectedVideo.title}</h2>
//                         <p className="text-gray-700 mb-4">Description: {selectedVideo.description}</p>
//                         <video controls className="w-full mb-4 border border-gray-300 rounded-lg">
//                             <source src={`data:video/mp4;base64,${selectedVideo.videofile}`} type="video/mp4" />
//                             Your browser does not support the video tag.
//                         </video>
//                         <div className="text-right">
//                             <button
//                                 onClick={closeModal}
//                                 className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Status;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Status() {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('http://localhost:1234/video/pending')
            .then((res) => {
                setPending(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:1234/video/approved')
            .then((res) => {
                setApproved(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleApprove = (id) => {
        axios
            .get(`http://localhost:1234/video/${id}`)
            .then((res) => {
                res.data.status = true;
                toast.success("Video Approved Successfully");
                return axios.put(`http://localhost:1234/video/${id}`, res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleReject = (id) => {
        axios
            .get(`http://localhost:1234/video/${id}`)
            .then((res) => {
                res.data.status = false;
                toast.error("Video Rejected Successfully");
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

    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Video Status</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pending Videos</h2>
                    {pending.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                className="w-48 h-48 object-cover"
                                src="https://img.freepik.com/free-vector/completed-concept-illustration_114360-3891.jpg" // Use a professional "no data" image
                                alt="No pending videos"
                            />
                            <p className="text-gray-500 mt-4">No pending videos</p>
                        </div>
                    ) : (
                        pending.map((video) => (
                            <div key={video.id} className="bg-white p-5 rounded-lg shadow-md mb-4 transition-transform transform hover:shadow-xl hover:bg-gray-50">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">Title: {video.title}</h3>
                                <p className="text-gray-600">Description: {video.description}</p>
                                <p className="text-gray-600">Channel Name: {video.creator.channelname}</p>
                                <p className="text-gray-600">Creator Name: {video.creator.creatorname}</p>
                                <p className="text-gray-600">Category Name: {video.category.category_name}</p>
                                
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => handleApprove(video.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        Approve
                                    </button>
                                    {/* <button
                                        onClick={() => handleReject(video.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Reject
                                    </button> */}
                                    <button
                                        onClick={() => openModal(video)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Approved Videos</h2>
                    {approved.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <img
                                className="w-48 h-48 object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLEO9n4LWhQTVhCKpYa0iJK33aTQQDFLZEg&s"
                                alt="No approved videos"
                            />
                            <p className="text-gray-500 mt-4">No approved videos</p>
                        </div>
                    ) : (
                        approved.map((video) => (
                            <div key={video.id} className="bg-white p-5 rounded-lg shadow-md mb-4 transition-transform transform hover:shadow-xl hover:bg-gray-50">
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{video.title}</h3>
                                <p className="text-gray-600">{video.description}</p>
                                <p className="text-gray-600">Channel Name: {video.creator.channelname}</p>
                                <p className="text-gray-600">Creator Name: {video.creator.creatorname}</p>
                                <p className="text-gray-600">Category Name: {video.category.category_name}</p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => openModal(video)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Preview
                                    </button>
                                    <button
                                        onClick={() => handleReject(video.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {modalOpen && selectedVideo && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-transform scale-95 hover:scale-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Title: {selectedVideo.title}</h2>
                        <p className="text-gray-700 mb-4">Description: {selectedVideo.description}</p>
                        <video controls className="w-full mb-4 border border-gray-300 rounded-lg">
                            <source src={`data:video/mp4;base64,${selectedVideo.videofile}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="text-right">
                            <button
                                onClick={closeModal}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Status;
