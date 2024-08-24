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
                .get(`http://localhost:1234/videos`)
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

    // const handleLogout = () => {
    //     sessionStorage.removeItem("adminId");
    //     sessionStorage.setItem("loggedOut", "true");
    //     navigate("/adminlogin");
    //     toast.success("Logged out successfully!");
    // };

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
                    
                        <Link to="/addcat" className=" shadow-md rounded-lg p-6 hover:bg-gray-200 transition">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Category</h3>
                            <p className="text-gray-600">Add a new category to the creator's videos!</p>
                        </Link>
                    </div>

                </section>
            <Stats />
            </main>
        </div>
        
        </>
    );
};

export default Dashboard;
