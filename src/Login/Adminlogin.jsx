import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
                    navigate("/dashboard");
                    toast.success("Login Success!!!");
                }
            })
            .catch((error) => {
                console.error("Login failed:", error);
                toast.error("Login failed. Please try again.");
            });
    };

    return (
        <>
        <div className="bg-gray-100">
            <AdminNav />
        </div>
            <div className="flex bg-gray-100 h-screen">
                <div
                    className="w-1/2 mt-20 mb-10 bg-cover bg-center flex items-center justify-center"
                    style={{
                        // backgroundImage: `url("https://images.ctfassets.net/9uhkiji6mhey/3bazmOiHscc6oTqkyaxW6Y/5c2bde43a673b354ca001b05e3692657/GoogleKidsSpace-Case-09.1.jpg?q=100")`
                        backgroundImage: `url("https://gatlabs.com/wp-content/uploads/2023/06/Google-Workspace-Super-Admin-vs-other-Admin-Roles_-All-you-Need-to-Know-updated-2023-2048x1024.png")`
                    }}
                >
                </div>

                <div className="w-1/2 flex items-center justify-center bg-gray-100 p-6">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login Admin</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col mb-6">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    className="py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}
