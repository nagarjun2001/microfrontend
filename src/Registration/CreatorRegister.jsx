// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NavbarLogin from '../components/NavbarLogin';
// import NavbarReg from '../components/NavbarReg';
// import UserRegNavbar from '../Navbar/UserRegNav';

// export default function CreatorRegister() {
//     const navigate = useNavigate();

//     // Initialize state for form data
//     const [formData, setFormData] = useState({
//         creatorname: "",
//         channelname: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (
//             formData.channelname &&
//             formData.creatorname &&
//             formData.email &&
//             formData.password &&
//             formData.confirmpassword
//         ) {
//             if (formData.password !== formData.confirmpassword) {
//                 toast.warn("Passwords do not match.");
//                 return;
//             }

//             try {
//                 await axios.post("http://localhost:1234/creator", formData);
//                 toast.success("Registered Successfully!");
//                 navigate("/");
//             } catch (error) {
//                 console.error("Registration failed:", error);
//                 toast.error("Registration failed. Please try again.");
//             }
//         } else {
//             toast.warn("Please fill out all fields correctly.");
//         }
//     };

//     return (
//         <>
//         <div className='bg-gray-100'>
//             <UserRegNavbar />
//         </div>
//         <div className="flex bg-gray-100">
//             <div
//                 className="w-1/2 bg-cover bg-center mt-10 mb-10 flex items-center justify-center"
//                 style={{
//                     backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/52fd7296e4b0feb85ec2a81f/7ab895c5-3f02-4fff-80df-348c6beccb5e/%5B2020-08%5D+September+2020_Header_Financial+Resilience_WIP-03.png")`
//                 }}
//             >
//             </div>

//             <div className="w-1/2 flex items-center mb-10 justify-center bg-gray-100 p-6">
//                 <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {[
//                                 { label: "Creator Name", name: "creatorname", type: "text", placeholder: "Enter Creator Name" },
//                                 { label: "Channel Name", name: "channelname", type: "text", placeholder: "Enter Channel Name" },
//                                 { label: "Email Id", name: "email", type: "email", placeholder: "Enter Email Id" },
//                                 { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
//                                 { label: "Confirm Password", name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
//                             ].map((field) => (
//                                 <div key={field.name} className="flex flex-col">
//                                     <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
//                                     <input
//                                         name={field.name}
//                                         type={field.type}
//                                         className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-black-500 focus:ring focus:ring-black-200 transition duration-150 ease-in-out"
//                                         placeholder={field.placeholder}
//                                         value={formData[field.name]}
//                                         onChange={handleChange} />
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="mt-6 text-center">
//                             <button
//                                 type="submit"
//                                 className="py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div></>
//     );
// }

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRegNavbar from '../Navbar/UserRegNav';

export default function CreatorRegister() {
    const navigate = useNavigate();

    // Initialize state for form data
    const [formData, setFormData] = useState({
        creatorname: "",
        channelname: "",
        email: "",
        password: "",
        confirmpassword: "",
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.creatorname &&
            formData.channelname &&
            formData.email &&
            formData.password &&
            formData.confirmpassword &&
            formData.agreeToTerms
        ) {
            if (formData.password !== formData.confirmpassword) {
                toast.warn("Passwords do not match.");
                return;
            }

            try {
                await axios.post("http://localhost:1234/creator", formData);
                navigate("/Login");
                toast.success("Registered Successfully!");
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again.");
            }
        } else {
            toast.warn("Please fill out all fields correctly and agree to the terms.");
        }
    };

    return (
        <>
            <div className='bg-gray-100'>
                <UserRegNavbar />
            </div>
            <div className="flex bg-gray-100">
                <div
                    className="w-1/2 bg-cover bg-center flex items-center justify-center"
                    style={{
                        backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/52fd7296e4b0feb85ec2a81f/7ab895c5-3f02-4fff-80df-348c6beccb5e/%5B2020-08%5D+September+2020_Header_Financial+Resilience_WIP-03.png")`
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
                                    { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
                                    { label: "Confirm Password", name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
                                ].map((field) => (
                                    <div key={field.name} className="flex flex-col">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
                                        <input
                                            name={field.name}
                                            type={field.type}
                                            className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-black-500 focus:ring focus:ring-black-200 transition duration-150 ease-in-out"
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange} />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center">
                                <input
                                    name="agreeToTerms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange} />
                                <label className="ml-2 text-gray-700 text-sm">
                                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">terms and conditions</a>.
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
