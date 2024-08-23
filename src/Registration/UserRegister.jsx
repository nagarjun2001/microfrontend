import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegNavbar from '../Navbar/UserRegNav';

export default function UserRegister() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        uname: "",
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmpassword: "",
        mobno: "",
        childAge: "", // Now an empty string by default
        acceptTerms: false
    });

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.uname &&
            formData.fname &&
            formData.lname &&
            formData.email &&
            formData.password &&
            formData.confirmpassword &&
            formData.mobno &&
            formData.mobno.length === 10 &&
            formData.acceptTerms
        ) {
            if (formData.password !== formData.confirmpassword) {
                toast.warn("Passwords do not match.");
                return;
            }

            try {
                await axios.post("http://localhost:1234/user", formData);
                toast.success("Registered Successfully!");
                navigate("/login");
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.warn("Please fill out all fields correctly and accept the terms.");
        }
    };

    return (
        <>
            <UserRegNavbar />
            <div className="flex">
                <div
                    className="w-1/2 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url("https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg")`
                    }}
                >
                </div>

                <div className="w-1/2 flex items-center justify-center bg-gray-100 p-6">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Username", name: "uname", type: "text", placeholder: "Enter Username" },
                                    { label: "First Name", name: "fname", type: "text", placeholder: "Enter First Name" },
                                    { label: "Last Name", name: "lname", type: "text", placeholder: "Enter Last Name" },
                                    { label: "Email Id", name: "email", type: "email", placeholder: "Enter Email Id" },
                                    { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
                                    { label: "Confirm Password", name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
                                    { label: "Mobile No.", name: "mobno", type: "text", placeholder: "Enter Mobile Number" }
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange} />
                                    </div>
                                ))}

                                <div className="flex flex-col">
                                    <label htmlFor="childAge" className="block text-gray-700 text-sm font-medium mb-2">Child's Age</label>
                                    <select
                                        name="childAge"
                                        id="childAge"
                                        className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
                                        value={formData.childAge}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Age Group</option>
                                        <option value="Pre-School (Ages 4 and under)">Pre-School (Ages 4 and under)</option>
                                        <option value="Younger (Ages 5 – 8)">Younger (Ages 5 – 8)</option>
                                        <option value="Older (Ages 9 – 12)">Older (Ages 9 – 12)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center mt-4">
                                <input
                                    name="acceptTerms"
                                    type="checkbox"
                                    id="acceptTerms"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                />
                                <label htmlFor="acceptTerms" className="ml-2 text-gray-700 text-sm">
                                    I agree to the <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a>
                                </label>
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

                <ToastContainer />
            </div>
        </>
    );
}
