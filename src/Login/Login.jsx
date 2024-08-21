import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNav from '../Navbar/AdminNav';
import ULogNav from '../Navbar/ULogNav';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.warn("Please enter a valid email address.");
            return;
        }

        if (password.length < 1) {
            toast.warn("Password must be at least 6 characters long.");
            return;
        }

        const apiUrl = role === "creator" 
            ? `http://localhost:1234/creator/email/${email}` 
            : `http://localhost:1234/user/email/${email}`;

        axios.get(apiUrl)
            .then((res) => {
                if (email === res.data.email && password === res.data.password) {
                    sessionStorage.setItem(role === "creator" ? 'creatorid' : 'userid', res.data.id);
                    toast.success("Login Success");
                    navigate(role === "creator" ? "/CreatorHomepage" : "/UserHomepage");
                } else {
                    toast.error("Incorrect Email or Password.");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Login Failed");
            });
    };

    return (
        <>
        <ULogNav />
        <div style={{
            backgroundImage: `url('https://images.ctfassets.net/9uhkiji6mhey/5QJ6ri0r1fDdtycvlcZwub/0a1ccb367f7c89bf5758b254df186383/YTkidsv2-content-01.jpg?q=100')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: '300px' }}>
                <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Select User Type</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="user">User</option>
                            <option value="creator">Content Creator</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                    Are you an Admin? <Link to="/adminlogin"><span className='underline underline-offset-1'>Login</span></Link> here
                </form>
            </div>
            <ToastContainer />
        </div></>
    );
};

export default Login;
