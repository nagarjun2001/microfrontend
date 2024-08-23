// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import ReactLoading from 'react-loading';
// import Loader from '../components/Loader';
// import Modern from '../Navbar/Modern';
// import CNav from '../Navbar/CNav';

// const VideoDetails = () => {
//   const { videoId } = useParams();
//   const navigate = useNavigate();
//   const [video, setVideo] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:1234/video/${videoId}`)
//       .then(res => {
//         console.log(res.data); // Log data to inspect structure
//         setVideo(res.data);
//       })
//       .catch(err => console.error('Error fetching video details:', err));
//   }, [videoId]);

//   const handleEdit = () => {
//     navigate(`/editvideo/${videoId}`);
//   };

//   const handleDelete = () => {
//     axios.delete(`http://localhost:1234/video/${videoId}`)
//       .then(() => {
//         navigate('/CreatorHomepage');
//         toast.success("Deleted Successfully!");
//       })
//       .catch(err => toast.error('Error deleting video:', err));
//   };

//   if (!video) return <Loader />

//   // Destructure properties, including category which is an object
//   const { title, description, agelevel, category, videofile } = video;

//   // Check if category is an object and extract name
//   const categoryName = category?.category_name || 'Unknown';

//   return (
//     <>
//     <CNav />
//     <div className="p-8 bg-gray-900 min-h-screen flex flex-col items-center text-white">
//       <div className=" text-white p-4 mb-1 rounded-lg shadow-lg">
//         <h1 className="text-4xl font-extrabold">Video Details</h1>
//       </div>
//       <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-xl">
//         {videofile ? (
//           <video
//             className="w-full rounded-lg shadow-md"
//             controls
//             muted
//             autoPlay
//           >
//             <source src={`data:video/mp4;base64,${videofile}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <p className="text-center text-gray-400">No video file available</p>
//         )}
//         <div className="mt-6">
//           <h2 className="text-3xl font-bold mb-2">{title}</h2>
//           <p className="text-lg mb-1">Description: <span className="text-gray-400">{description}</span></p>
//           <p className="text-lg mb-1">Age Level: <span className="text-gray-400">{agelevel}</span></p>
//           <p className="text-lg">Category: <span className="text-gray-400">{categoryName}</span></p>
//         </div>
//       </div>
//       <div className="mt-8 flex gap-6">
//         <button
//           onClick={handleEdit}
//           className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
//         >
//           Edit
//         </button>
//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
//         >
//           Delete
//         </button>
//       </div>
//     </div></>
//   );
// };

// export default VideoDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import CNav from '../Navbar/CNav';

const VideoDetails = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userid = sessionStorage.getItem("userid");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch video details and comments
        axios.get(`http://localhost:1234/video/${videoId}`)
            .then((res) => {
                setVideo(res.data);
                // fetchComments(res.data.id);
            })
            .catch((err) => {
                toast.error("Error fetching video details");
                console.error(err);
            });
    }, [videoId]);

      const handleEdit = () => {
    navigate(`/editvideo/${videoId}`);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:1234/video/${videoId}`)
      .then(() => {
        navigate('/CreatorHomepage');
        toast.success("Deleted Successfully!");
      })
      .catch(err => toast.error('Error deleting video:', err));
  };

    // const fetchComments = async (videoId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:1234/video/${videoId}/comments`);
    //         setComments(response.data);
    //     } catch (error) {
    //         toast.error("Error fetching comments");
    //     }
    // };

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:1234/video/${videoId}/like`);
            setIsLiked(true);
            toast.success("Video liked!");
        } catch (error) {
            toast.error("Error liking video");
        }
    };

    const handleDislike = async () => {
        try {
            await axios.post(`http://localhost:1234/video/${videoId}/dislike`);
            setIsDisliked(true);
            toast.success("Video disliked!");
        } catch (error) {
            toast.error("Error disliking video");
        }
    };

    // const handleAddComment = async () => {
    //     if (newComment.trim()) {
    //         try {
    //             await axios.post(`http://localhost:1234/video/${videoId}/comment`, { text: newComment });
    //             setNewComment('');
    //             fetchComments(videoId);  // Refresh comments after adding
    //             toast.success("Comment added!");
    //         } catch (error) {
    //             toast.error("Error adding comment");
    //         }
    //     }
    // };

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
            <CNav />
            <div className="p-9  max-screen-xl shadow-xl mx-auto">
                <div className="bg-gray-100 p-7 rounded-3xl shadow-xl">
                <button
          onClick={handleGoBack}
          className="relative text-black px-3 py-2 rounded-md font-bold shadow-md hover:bg-red-500 transition-colors duration-300"
        >
          Go Back
        </button>
                  <h1 className='relative text-3xl text-center font-bold mb-2'>Video Details</h1>
                  
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
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Descripton: </span>{video.description || "No description available"}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Age Level:</span> {video.agelevel || "Not specified"}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Category:</span> {video.category.category_name || "Uncategorized"}</p>

                    <div className="mt-8 flex gap-6">
                        {/* <button
                            onClick={handleEdit}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
                            >
                            Edit
                            </button> */}
                            <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                            >
                            Delete
                            </button>
                        </div>



                    {/* Like/Dislike and Block Buttons
                    <div className="flex items-center space-x-4 mb-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isLiked ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-blue-500 transition-colors duration-300`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7 7 7-7M5 9l7-7 7 7" />
                            </svg>
                            <span>Like</span>
                        </button>
                        <button
                            onClick={handleDislike}
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
                    </div> */}

                    {/* Comments Section */}
                    {/* <div className="mt-8">
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
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="4"
                                placeholder="Add a comment..."
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors duration-300"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default VideoDetails;
