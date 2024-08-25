import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ULogNav from '../Navbar/ULogNav';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid.";

        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const apiUrl = role === "creator" 
                ? `http://localhost:1234/creator/email/${email}` 
                : `http://localhost:1234/user/email/${email}`;

            axios.get(apiUrl)
                .then((res) => {
                    if (res.data.email === email && res.data.password === password) {
                        sessionStorage.setItem(role === "creator" ? 'creatorid' : 'userid', res.data.id);
                        navigate(role === "creator" ? "/CreatorHomepage" : "/UserHomepage");
                        toast.success("Login Success");
                    } else {
                        toast.error("Incorrect Email or Password.");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Login Failed! Check User type and credentials!");
                });
        } else {
            toast.warn("Please fix the errors in the form.");
        }
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
                                <option value="user">Parent</option>
                                <option value="creator">Content Creator</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            role='button'
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                        <p className="mt-4 text-sm text-gray-600">Are you an Admin? <Link to="/adminlogin"><span className='text-red-600'>Login</span></Link> here</p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
