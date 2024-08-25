import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import UNav from '../Navbar/UNav';
import VideoCard from './VideoCard';
import LoaderSmall from '../components/LoaderSmall';
import { FaExclamation, FaFlag, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

const UVideoDetail = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const userid = sessionStorage.getItem("userid");
    const navigate = useNavigate();
    const [videodata, setVideodata] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [userdata, setUserdata] = useState({});
    const [videoload, setVideoload] = useState(true);
    const [categories, setCategories] = useState([]);
    const [timer, setTimer] = useState(1);

    useEffect(() => {
        const checkSession = () => {
            const storedTime = sessionStorage.getItem("remainingTime");
            if (storedTime) {
                const expiryTime = parseInt(storedTime, 10);
                const now = Date.now();
                if (now >= expiryTime) {
                    handleLogout();
                } else {
                    const interval = setInterval(() => {
                        const timeLeft = expiryTime - Date.now();
                        if (timeLeft <= 0) {
                            clearInterval(interval);
                            handleLogout();
                        } else {
                            setTimer(Math.ceil(timeLeft / 60000));
                        }
                    }, 1000);
                    return () => clearInterval(interval);
                }
            }
        };
        checkSession();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("remainingTime");
        navigate("/login");
    }


    useEffect(() => {
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

    const handleBlockCategory = async () => {
        try {
            await axios.post(`http://localhost:1234/user/${userid}/block/category/${video.category.id}`);
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
        navigate(-1);
    };

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

    const handleLike = () => {
        setIsLiked(true)
        setIsDisliked(false)
    }
    const handleDislike = () => {
        setIsDisliked(true)
        setIsLiked(false)
    }

    if (!video) return <Loader />;

    const filteredVideos = videodata.filter(video => {
        const isBlockedVideo = userdata.blockedvideosid?.includes(video.id);
        const isBlockedCategory = userdata.blockedcatid?.includes(video.category.categoryname);
        const isMatchingCategory = selectedCategory === 'All' || video.category.categoryname === selectedCategory;
        return !isBlockedVideo && !isBlockedCategory && isMatchingCategory;
    });

    return (
        <>
            <UNav />
            <div className="flex">
                <div className="w-2/3 p-6">
                    <div className=" p-4 rounded-xl">
                        <button
                            onClick={handleGoBack}
                            className="relative mb-3 bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
                        >
                            Go Back
                        </button>
                        <div className="relative rounded-xl">
                            {video.videofile ? (
                                <video
                                    className="w-full flex justify-center item-center rounded-xl shadow-md mb-4"
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

                        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                        <p className="text-gray-600 mb-4">{video.description || "No description available"}</p>
                        <p className="text-gray-600 mb-4"><span className="font-semibold">Age Level:</span> {video.agelevel || "Not specified"}</p>
                        <p className="text-gray-600 mb-4"><span className="font-semibold">Category:</span> {video.category.categoryname || "Uncategorized"}</p>

                        <div className="flex items-center space-x-4 mb-6">
                            <button
                                onClick={handleLike}
                                className={`flex items-center space-x-2 px-2 py-2 rounded-md ${isLiked ? 'shadow-sm shadow-black/80 outline outline-red-500 text-black' : ' text-black/80 '} hover:bg-gray-100 text-black/80 transition-colors duration-300`}
                            >
                                <FaThumbsUp />
                                <span>Like</span>
                            </button>
                            <button
                                onClick={handleDislike}
                                className={`flex items-center space-x-2 px-2 py-2 rounded-md ${isDisliked ? 'shadow-sm shadow-black/80 outline outline-red-500 text-black' : ' text-black/80 '} hover:bg-gray-100 text-black/80 transition-colors duration-300`}
                            >
                                <FaThumbsDown />
                                <span>Dislike</span>
                            </button>
                            <button
                                onClick={handleBlockCategory}
                                className="flex items-center space-x-2 px-2 py-2 rounded-md hover:scale-105 transition-colors duration-300"
                            >
                                <FaFlag />
                                <span>Block Category</span>
                            </button>
                            <button
                                onClick={handleBlockVideo}
                                className="flex items-center space-x-2 px-2 py-2 rounded-md hover:scale-105 transition-colors duration-300"
                            >
                                <FaExclamation />
                                <span>Report Video</span>
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Comments</h2>
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
                                    // value={newComment}
                                    // onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Add a comment..."
                                />
                                <button
                                    // onClick={handleAddComment}
                                    className="bg-black/80 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                >
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 p-6">
                    <h2 className="text-2xl mt-2 font-semibold mb-4">Suggested Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {filteredVideos.length > 0 ? (
                            filteredVideos.map(video => (
                                <VideoCard key={video.id} video={video} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500"><LoaderSmall /></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UVideoDetail;
