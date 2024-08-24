import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../Navbar/AdminNav';

export default function UserLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validateFields = () => {
        if (username.length < 4) {
            toast.warn("Username must be at least 4 characters long.");
            return false;
        }

        if (password.length < 4) {
            toast.warn("Password must be at least 4 characters long.");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        axios
            .get(`http://localhost:1234/admin/username/${username}`)
            .then((res) => {
                if (username === res.data.username && password === res.data.password) {
                    sessionStorage.setItem("adminId", res.data.id);
                    toast.success("Login Success!!!");
                    navigate("/dashboard");
                }
            })
            .catch((error) => {
                toast.error("Login failed. Please try again.");
            });
    };

    return (
        <>
        <AdminNav />
            <div className="relative min-h-screen flex items-center">
                {/* Image on the left */}
                <div className="hidden lg:flex flex-shrink-0 w-1/2 h-full">
                    <img
                        src="https://cdn.dribbble.com/users/1946759/screenshots/4596801/admin.png"
                        alt="Background"
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-600 text-sm font-medium mb-2">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
