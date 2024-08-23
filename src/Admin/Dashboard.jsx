// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import ALogNav from '../Navbar/ALogNav';
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// const Dashboard = () => {
//     const adminId = sessionStorage.getItem("adminId");
//     const [admindata, setAdmindata] = useState({});
//     const [isError, setIsError] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (sessionStorage.getItem("loggedOut") === "true") {
//             setIsError(true);
//             sessionStorage.removeItem("loggedOut");
//             return;
//         }

//         if (!adminId) {
//             navigate("/adminlogin");
//         } else {
//             axios
//                 .get(`http://localhost:1234/admin/${adminId}`)
//                 .then((res) => {
//                     setAdmindata(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }, [adminId, navigate]);

//     if (isError) {
//         return toast.error("Error logging in!");
//     }

//     const handleLogout = () => {
//         toast.success("Logged out successfully!");
//         sessionStorage.removeItem("adminId");
//         sessionStorage.setItem("loggedOut", "true");
//         navigate("/adminlogin");
//     };

//     if (isError) {
//         return (
//             toast.error("Error logging in!! Please try again!")
//         );
//     }

    
//     return (
//         <div className="flex min-h-screen bg-gray-900 text-gray-200">
//             <aside className="w-64 bg-gray-800 p-6">
//                 <h2 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h2>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/status" className="block p-3 text-gray-400 hover:bg-gray-700 rounded-md transition">Pending Videos</Link>
//                         </li>
//                         <li>
//                             <Link to="/new-users" className="block p-3 text-gray-400 hover:bg-gray-700 rounded-md transition">New Users</Link>
//                         </li>
//                         <li>
//                             <Link to="/revenue" className="block p-3 text-gray-400 hover:bg-gray-700 rounded-md transition">Revenue</Link>
//                         </li>
//                         {/* Add more links as needed */}
//                     </ul>
//                 </nav>
//             </aside>

//             <div className="flex-1 bg-gray-900 p-6">
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-4xl font-extrabold text-white">Welcome, {admindata.adminName}</h2>
//                     <button
//                         onClick={handleLogout}
//                         className="py-2 px-4 text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-red-700 transition"
//                     >
//                         Logout
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                     <Link to="/status" className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 p-6">
//                         <div className="flex flex-col h-full">
//                             <div className="text-3xl font-semibold text-white mb-4">Pending Videos</div>
//                             <p className="text-gray-400 flex-grow">Approve or reject videos with ease.</p>
//                         </div>
//                     </Link>

//                     <Link to="/new-users" className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 p-6">
//                         <div className="flex flex-col h-full">
//                             <div className="text-3xl font-semibold text-white mb-4">New Users</div>
//                             <p className="text-gray-400 flex-grow">Overview of recent user sign-ups.</p>
//                         </div>
//                     </Link>

//                     <Link to="/revenue" className="bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105 p-6">
//                         <div className="flex flex-col h-full">
//                             <div className="text-3xl font-semibold text-white mb-4">Revenue</div>
//                             <p className="text-gray-400 flex-grow">Detailed insights into revenue.</p>
//                         </div>
//                     </Link>
//                 </div>
//             </div>

//             <ToastContainer />
//         </div>
//     );
// };

// export default Dashboard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ANav from '../Navbar/ANav';
import Stats from './Stats';
import Error from '../components/Error';

const Dashboard = () => {
    const adminId = sessionStorage.getItem("adminId");
    const [admindata, setAdmindata] = useState({});
    const [isError, setIsError] = useState(false);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (sessionStorage.getItem("loggedOut") === "true") {
            setIsError(true);
            sessionStorage.removeItem("loggedOut");
            return;
        }

        if (!adminId) {
            navigate("/adminlogin");
        } else {
            axios
                .get(`http://localhost:1234/admin/${adminId}`)
                .then((res) => {
                    setAdmindata(res.data);
                })
                .catch((err) => console.log(err));

            axios
                .get(`http://localhost:1234/videos`) // Assuming you have an endpoint to get videos
                .then((res) => {
                    setVideos(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [adminId, navigate]);

    if (isError) {
        toast.error("Error logging in! Please try again.");
        return null;
    }

    const handleLogout = () => {
        toast.success("Logged out successfully!");
        sessionStorage.removeItem("adminId");
        sessionStorage.setItem("loggedOut", "true");
        navigate("/adminlogin");
    };

    return (
        <><div className="flex flex-col min-h-screen bg-white text-gray-800">
            <ANav />

            <main className="flex-1 p-6">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-red-600">Welcome, {admindata.adminName}</h1>
                </header>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Functions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link to="/status" className=" shadow-md rounded-lg p-6 hover:bg-gray-200 transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Video Status</h3>
                            <p className="text-gray-600">Approve or reject Content creator's videos!</p>
                        </Link>

                    </div>
                </section>

                {/* <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Videos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.length ? (
                            videos.map((video) => (
                                <div key={video.id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                                        <p className="text-gray-600">{video.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No recent videos available.</p>
                        )}
                    </div>
                </section> */}
            </main>
            <Stats />
            <ToastContainer />
        </div>
        
        </>
    );
};

export default Dashboard;
