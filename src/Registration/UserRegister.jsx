import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        childAge: "",
        acceptTerms: false
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.uname) newErrors.uname = "Username is required.";
        else if (formData.uname.length < 3) newErrors.uname = "Username must be at least 3 characters long.";

        if (!formData.fname) newErrors.fname = "First name is required.";
        else if (!/^[A-Za-z]+$/.test(formData.fname)) newErrors.fname = "First name can only contain letters.";

        if (!formData.lname) newErrors.lname = "Last name is required.";
        else if (!/^[A-Za-z]+$/.test(formData.lname)) newErrors.lname = "Last name can only contain letters.";

        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email address is invalid.";

        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
        else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must contain at least one lowercase letter.";
        else if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must contain at least one number.";
        else if (!/[\W_]/.test(formData.password)) newErrors.password = "Password must contain at least one special character.";

        if (formData.password !== formData.confirmpassword) newErrors.confirmpassword = "Passwords do not match.";

        if (!formData.mobno) newErrors.mobno = "Mobile number is required.";
        else if (!/^\d{10}$/.test(formData.mobno)) newErrors.mobno = "Mobile number must be exactly 10 digits.";

        if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                await axios.post("http://localhost:1234/user", formData);
                navigate("/login");
                toast.success("Registered Successfully!");
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.warn("Please fix the errors in the form.");
        }
    };

    return (
        <>
            <UserRegNavbar />
            <div className="flex flex-col md:flex-row">
                <div
                    className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url("https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg")`
                    }}
                >
                </div>

                <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
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
                                            className={`bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} transition duration-150 ease-in-out`}
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                        />
                                        {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
                                    </div>
                                ))}

                                <div className="flex flex-col">
                                    <label htmlFor="childAge" className="block text-gray-700 text-sm font-medium mb-2">Child's Age</label>
                                    <select
                                        name="childAge"
                                        id="childAge"
                                        className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 transition duration-150 ease-in-out"
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
                                    I agree to the <Link to="/terms" className="text-blue-600 underline">Terms and Conditions</Link>
                                </label>
                                {errors.acceptTerms && <p className="text-red-500 text-sm ml-6">{errors.acceptTerms}</p>}
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
