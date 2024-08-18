import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function BlockedVid() {
    const [userdata, setUserdata] = useState({});
    const userid = sessionStorage.getItem("userid");

    useEffect(() => {
        if (userid) {
            axios
                .get(`http://localhost:1234/user/${userid}`)
                .then((res) => {
                    setUserdata(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [userid]);

    const handleRemoveBlockedVideo = (videoId) => {
        if (window.confirm('Are you sure you want to unblock this video?')) {
            axios
                .delete(`http://localhost:1234/user/${userid}/block/${videoId}`)
                .then((res) => {
                    toast.success("Video removed successfully!");
                    console.log('Video removed successfully:', res.data);
                })
                .catch((err) => toast.error('Error removing video:', err));
        }
    };

    return (
        <div>
            <h2>Blocked Video ID's:</h2>
            {userdata.blockedvideosid && userdata.blockedvideosid.length > 0 ? (
                <ul>
                    {userdata.blockedvideosid.map((id, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <span>{id}</span>
                            <button
                                onClick={() => handleRemoveBlockedVideo(id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Videos blocked.</p>
            )}
        </div>
    );
}

export default BlockedVid;
