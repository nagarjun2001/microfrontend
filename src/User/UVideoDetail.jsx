// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Loader from '../components/Loader';
// import UNav from '../Navbar/UNav';

// const UVideoDetail = () => {
//     const { videoId } = useParams();
//     const [video, setVideo] = useState(null);
//     const userid = sessionStorage.getItem("userid");

//     useEffect(() => {
//         axios.get(`http://localhost:1234/video/${videoId}`)
//             .then((res) => {
//                 setVideo(res.data);
//             })
//             .catch((err) => {
//                 toast.error("Error fetching video details");
//                 console.error(err);
//             });
//     }, [videoId]);

//     const handleBlockCategory = async () => {
//         try {
//             await axios.post(`http://localhost:1234/user/${userid}/block/category/${video.category.category_id}`);
//             toast.success("Category blocked successfully!");
//         } catch (error) {
//             toast.error("Error blocking category");
//         }
//     };

//     const handleBlockVideo = async () => {
//         try {
//             await axios.post(`http://localhost:1234/user/${userid}/block/${videoId}`);
//             toast.success("Video blocked successfully!");
//         } catch (error) {
//             toast.error("Error blocking video");
//         }
//     };

//     if (!video) return <Loader />;

//     return (
//         <><UNav /><div className=" p-6">
//             <span className=" rounded-md shadow-lg mb-8">
//                 <h1 className="text-4xl  font-bold">Video Details</h1>
//             </span>

//             <div className=" p-8 rounded-lg shadow-lg">
//                 {video.videofile ? (
//                     <video
//                         className="w-full h-full object-cover rounded-lg shadow-md mb-4"
//                         controls
//                         autoPlay
//                     >
//                         <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 ) : (
//                     <p className="text-center text-gray-400">No video file available</p>
//                 )}

//                 <h2 className="text-3xl font-semibold mb-2">{video.title}</h2>
//                 <p className="text-gray-400 mb-2"><span className="font-semibold">Description:</span> {video.description || "No description available"}</p>
//                 <p className="text-gray-400 mb-2"><span className="font-semibold">Age Level:</span> {video.agelevel || "Not specified"}</p>
//                 <p className="text-gray-400 mb-4"><span className="font-semibold">Category:</span> {video.category.category_name || "Uncategorized"}</p>

//                 <div className="flex space-x-4">
//                     <button
//                         onClick={handleBlockCategory}
//                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300"
//                     >
//                         Block Category
//                     </button>
//                     <button
//                         onClick={handleBlockVideo}
//                         className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300"
//                     >
//                         Block Video
//                     </button>
//                 </div>
//             </div>
//         </div></>
//     );
// };

// export default UVideoDetail;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import UNav from '../Navbar/UNav';

const UVideoDetail = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userid = sessionStorage.getItem("userid");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch video details
        axios.get(`http://localhost:1234/video/${videoId}`)
            .then((res) => {
                setVideo(res.data);
                // fetchComments(res.data.id);  // Fetch comments when video data is available
            })
            .catch((err) => {
                toast.error("Error fetching video details");
                console.error(err);
            });
    }, [videoId]);

    const handleBlockCategory = async () => {
        try {
            await axios.post(`http://localhost:1234/user/${userid}/block/category/${video.category.category_id}`);
            toast.success("Category blocked successfully!");
            navigate("/UserHomepage");
        } catch (error) {
            toast.error("Error blocking category");
        }
    };

    const handleBlockVideo = async () => {
        try {
            await axios.post(`http://localhost:1234/user/${userid}/block/${videoId}`);
            toast.success("Video blocked successfully!");
            navigate("/UserHomepage");
        } catch (error) {
            toast.error("Error blocking video");
        }
    };


    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
      };

    if (!video) return <Loader />;

    return (
        <>
            <UNav />
            <div className="p-6 max-w-screen-xl mx-auto">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                <button
          onClick={handleGoBack}
          className="relative mb-3 bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
        >
          Go Back
        </button>
                    {/* Video Player */}
                    <div className="relative">
                        {video.videofile ? (
                            <video
                                className="w-full h-auto rounded-lg shadow-md mb-4"
                                controls
                                autoPlay
                            >
                                <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p className="text-center text-gray-400">No video file available</p>
                        )}
                    </div>

                    {/* Video Title and Description */}
                    <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
                    <p className="text-gray-600 mb-4">{video.description || "No description available"}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Age Level:</span> {video.agelevel || "Not specified"}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Category:</span> {video.category.category_name || "Uncategorized"}</p>

                    {/* Like/Dislike and Block Buttons */}
                    <div className="flex items-center space-x-4 mb-6">
                        <button
                            // onClick={handleLike}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isLiked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-blue-500 transition-colors duration-300`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7 7 7-7M5 9l7-7 7 7" />
                            </svg>
                            <span>Like</span>
                        </button>
                        <button
                            // onClick={handleDislike}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isDisliked ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-red-500 transition-colors duration-300`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7M19 15l-7 7-7-7" />
                            </svg>
                            <span>Dislike</span>
                        </button>
                        <button
                            onClick={handleBlockCategory}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300"
                        >
                            Block Category
                        </button>
                        <button
                            onClick={handleBlockVideo}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-300"
                        >
                            Block Video
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                        <div className="space-y-4 mb-6">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <p className="text-gray-800 font-semibold">{comment.userName}</p>
                                        <p className="text-gray-600">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No comments yet</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-4">
                            <textarea
                                value={newComment}
                                // onChange={(e) => setNewComment(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="4"
                                placeholder="Add a comment..."
                            />
                            <button
                                // onClick={handleAddComment}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors duration-300"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UVideoDetail;
