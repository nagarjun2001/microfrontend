// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const VideoCard = ({ video }) => {
//     const[userdata, setUserdata] = useState([]);
//     const userid = sessionStorage.getItem("userid");
//     const [videodata, setVideodata] = useState([]);


//     useEffect(()=>{
//         if(userid)
//         {
//             axios
//                 .get(`http://localhost:1234/user/${userid}`)
//                 .then((res) => {
//                     console.log(res.data);
//                     setUserdata(res.data);
//                 })
//                 .catch((err) => {
//             console.log("error",err)
//         });
//     }
//     else{
//         console.log("Error");
//     }
// },[userid]);

//     let handleBlock = () => {
//         axios
//             .post(`http://localhost:1234/user/${userid}/block/${videodata.video.id}`)
//             .then("")
//     }
//     return (
//         <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
//             <div className="relative pb-[56.25%]">
//                 <video
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                     muted
//                     autoPlay
//                 >
//                     <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div>
//             <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
//                 <p className="text-gray-700 text-sm mb-2">{video.description}</p>
//                 <p className="text-gray-500 text-xs mb-1">Channel: {video.creator.channelname}</p>
//                 <p className="text-gray-500 text-xs">Category: {video.category.category_name}</p><br />
//                         <button
//                             onClick={handleBlock}
//                             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200">
//                             Block this Category
//                         </button>
//             </div>
//         </div>
//     );
// };

// export default VideoCard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VideoCard = ({ video }) => {
    const [userdata, setUserdata] = useState([]);
    const userid = sessionStorage.getItem("userid");

    // Fetch user data and blocked categories
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
            console.log("Error");
        }
    }, [userid]);

    const handleBlockCategory = () => {
        axios
            .post(`http://localhost:1234/user/${userid}/block/category/${video.category.category_name}`)
            .then((res) => {
                console.log("Category blocked successfully.");
                // Optionally, you could also trigger a state update here
            })
            .catch((err) => {
                console.log("Error blocking category:", err);
            });
    };

    const handleBlockVideo = () => {
        axios
            .post(`http://localhost:1234/user/${userid}/block/${video.id}`)
            .then((res) => {
                console.log("Video blocked successfully.");
                // Optionally, you could also trigger a state update here
            })
            .catch((err) => {
                console.log("Error blocking video:", err);
            });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="relative pb-[56.25%]">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    muted
                    autoPlay
                >
                    <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-700 text-sm mb-2">{video.description}</p>
                <p className="text-gray-500 text-xs mb-1">Channel: {video.creator.channelname}</p>
                <p className="text-gray-500 text-xs">Category: {video.category.category_name}</p>
                <br />
                <button
                    onClick={handleBlockCategory}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                    Block this Category
                </button>
                <button
                    onClick={handleBlockVideo}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 ml-2"
                >
                    Block this Video
                </button>
            </div>
        </div>
    );
};

export default VideoCard;
