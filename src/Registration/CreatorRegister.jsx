import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegNavbar from '../Navbar/UserRegNav';

export default function CreatorRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        creatorname: "",
        channelname: "",
        email: "",
        password: "",
        confirmpassword: "",
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        let validationErrors = {};

        if (!formData.creatorname) validationErrors.creatorname = "Creator name is required.";
        if (!formData.channelname) validationErrors.channelname = "Channel name is required.";
        if (!formData.email) {
            validationErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Email address is invalid.";
        }
        if (!formData.password) {
            validationErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmpassword) {
            validationErrors.confirmpassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmpassword) {
            validationErrors.confirmpassword = "Passwords do not match.";
        }
        if (!formData.agreeToTerms) validationErrors.agreeToTerms = "You must agree to the terms and conditions.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                await axios.post("http://localhost:1234/creator", formData);
                navigate("/Login");
                toast.success("Registered Successfully!");
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.warn("Please correct the errors in the form.");
        }
    };

    return (
        <>
            <div className='bg-gray-100'>
                <UserRegNavbar />
            </div>
            <div className="flex bg-gray-100">
                <div
                    className="w-1/2 mt-10 mb-10 bg-cover bg-center overflow-hidden flex items-center justify-center"
                    style={{
                        backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/52fd7296e4b0feb85ec2a81f/7ab895c5-3f02-4fff-80df-348c6beccb5e/%5B2020-08%5D+September+2020_Header_Financial+Resilience_WIP-03.png")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </div>

                <div className="w-1/2 flex items-center mb-10 mt-10 justify-center bg-gray-100 p-6">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Creator Name", name: "creatorname", type: "text", placeholder: "Enter Creator Name" },
                                    { label: "Channel Name", name: "channelname", type: "text", placeholder: "Enter Channel Name" },
                                    { label: "Email Id", name: "email", type: "email", placeholder: "Enter Email Id" },
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            className={`bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} focus:border-black-500 focus:ring-black-200 transition duration-150 ease-in-out`}
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange} />
                                        {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                                    </div>
                                ))}

                                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            className={`bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-black-500 focus:ring-black-200 transition duration-150 ease-in-out`}
                                            placeholder="Enter Password"
                                            value={formData.password}
                                            onChange={handleChange} />
                                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
                                        <input
                                            name="confirmpassword"
                                            type="password"
                                            className={`bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border ${errors.confirmpassword ? 'border-red-500' : 'border-gray-300'} focus:border-black-500 focus:ring-black-200 transition duration-150 ease-in-out`}
                                            placeholder="Confirm Password"
                                            value={formData.confirmpassword}
                                            onChange={handleChange} />
                                        {errors.confirmpassword && <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center">
                                <input
                                    name="agreeToTerms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange} />
                                <label className="ml-2 text-gray-700 text-sm">
                                    I agree to the <Link to="/terms" className="text-blue-600 hover:underline">terms and conditions</Link>.
                                </label>
                                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    type="submit"
                                    className="py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
