import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CNav from '../Navbar/CNav';
import Loader from '../components/Loader';
import { FaUser } from 'react-icons/fa';
import Error from '../components/Error';

function CreatorHome() {
  const [creator, setCreator] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const creatorid = sessionStorage.getItem("creatorid");
  const navigate = useNavigate();
  const [sessionDuration, setSessionDuration] = useState(parseInt(sessionStorage.getItem('sessionDuration')) || 30);
  const location = useLocation();

  useEffect(() => {
    if (creatorid) {
      Promise.all([
        axios.get(`http://localhost:1234/creator/${creatorid}`),
        axios.get(`http://localhost:1234/video/creator/${creatorid}`)
      ])
      .then(([creatorRes, videosRes]) => {
        setCreator(creatorRes.data);
        setVideos(videosRes.data);
      })
      .catch(err => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
    }
  }, [creatorid]);

  const handleThumbnailClick = (videoId) => {
    navigate(`/videodetails/${videoId}`);
  };

  if (!creatorid) {
    return <><Error /></>
  }

  if(location.pathname === "/CreatorHomepage" && sessionStorage.getItem("creatorid")!= creatorid){
    navigate("/login");
    sessionStorage.clear();
  }

  return (
    <>
      <CNav />
      <div className="p-6 min-h-screen flex flex-col items-center  relative">
        <div className="absolute top-6 right-6">
          <Link to="/uploadvideo">
            <button
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Upload New Video
            </button>
          </Link>
        </div>

        {creator && (
          <section className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mb-8">
            <div className="flex items-center space-x-6">
              <span className="text-gray-600 text-4xl">👤</span>
              <div>
                <h2 className="text-4xl font-semibold text-gray-900 mb-2">{creator.name}</h2>
                <p className="text-gray-700 text-lg mb-1">Creator Name: {creator.creatorname}</p>
                <p className="text-gray-700 text-lg mb-1">Channel Name: {creator.channelname}</p>
                <p className="text-gray-700 text-lg">Email: {creator.email}</p>
              </div>
            </div>
          </section>
        )}

        <section className="w-full p-3">
          <hr />
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Your Videos
          </h2>
          <div className="grid p-12 rounded-2xl grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.length === 0 ? (
              <>
                  <p className="text-gray-600 font-bold text-center col-span-3">You haven't uploaded any videos... Upload Now!!!</p>
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/video-error-illustration-download-in-svg-png-gif-file-formats--connection-page-404-failure-pack-seo-web-illustrations-6905777.png?f=webp" 
                  className='ml-80 mb-20  text-gray-600 font-bold text-center col-span-3'
                  alt="" />
              </>
            ) : (
              videos.map((video) => (
                <div
                  key={video.id}
                  className="border shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer bg-white border border-gray-300 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => handleThumbnailClick(video.id)}
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

                  <div className="p-4 bg-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900 truncate mb-1">{video.title}</h3>
                    <p className="text-gray-700 mb-2 truncate">{video.description}</p>
                    <p className={`text-sm font-semibold ${video.status ? 'text-green-600' : 'text-red-600'}`}>
                      {video.status ? 'Approved' : 'Rejected'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default CreatorHome;
