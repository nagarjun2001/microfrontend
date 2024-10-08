import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UNav from '../Navbar/UNav';

function BlockedCat() {
    const [userdata, setUserdata] = useState({});
    const userid = sessionStorage.getItem("userid");
    const navigate = useNavigate(); 

    const [timer, setTimer] = useState(20);

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

    const handleRemoveBlockedCat = (category) => {
            axios
                .delete(`http://localhost:1234/user/${userid}/block/category/${category}`)
                .then((res) => {
                    toast.success('Category removed successfully!', res.data);
                    window.location.reload();
                })
                .catch((err) => toast.error('Error removing category!'));
    };

    return (
        <>
        <UNav />
        <div className="bg-white min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 mb-6"
                >
                    Go Back
                </button>

                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Blocked Categories</h2>
                {userdata.blockedcatid && userdata.blockedcatid.length > 0 ? (
                    <ul className="space-y-4">
                        {userdata.blockedcatid.map((category, index) => (
                            <li key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-md">
                                <span className="text-lg text-gray-700">{category}</span>
                                <button
                                    onClick={() => handleRemoveBlockedCat(category)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    Unblock
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No categories blocked.</p>
                )}
            </div>
        </div></>
    );
}

export default BlockedCat;