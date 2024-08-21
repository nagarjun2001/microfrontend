import React, { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${video.id}`);
    };
    const [likes, setLikes] = useState(video.likes || 0);

    const handleLike = () => setLikes(likes + 1);

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white border border-gray-300 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl overflow-hidden"
        >
            <div className="relative bg-gray-900">
                <img
                    src={`data:image/jpeg;base64,${video.image}`}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.752 11.168l-5.4 3.12a.75.75 0 01-1.1-.642v-6.24a.75.75 0 011.1-.642l5.4 3.12a.75.75 0 010 1.284z"
                        />
                    </svg>
                </div>
            </div>

            <div className="p-4  bg-gray-100 ">
                <h3 className="text-lg font-bold text-dark truncate">{video.title}</h3>
                <p className="text-sm text-gray-700 text-dark truncate mt-1">{video.description}</p>
            </div>
        </div>
        
    );
};

export default VideoCard;
