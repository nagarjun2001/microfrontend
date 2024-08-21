// import axios from 'axios';
// import { useState } from 'react';
// import {Link, useNavigate} from 'react-router-dom';

// export default function UserRegister() {
//     const navigate = useNavigate();
//     const[data,setData] = useState({
//         uname:"",
//         fname:"",
//         lname:"",
//         email:"",
//         password:"",
//         mobno:"",
//         childAge:""
// })

//     let handleRegister = (e) => {
//       e.preventDefault();
//       axios
//         .post("http://localhost:3000/user",data)
//         .then((res) => {
//             alert("Registered Successfully");
//             navigate("/userlogin")
//         })
//         .catch((err) => console.log(err))
//       navigate("/Login");
//       }

//     // const validateValues = (inputData) => {
//     //   if (inputData.uname.length === 0) {
//     //     alert("Username is required !!! ");
//     //     return false;
//     //   } else if (inputData.fname.length === 0) {
//     //     alert("First name is required !!! ");
//     //     return false;
//     //   } else if (inputData.lname === 0) {
//     //       alert("Last name is required !!! ");
//     //       return false;
//     //   }else if (inputData.email.length === 0) {
//     //       alert("Email ID is required !!! ");
//     //       return false;
//     //   }else if (inputData.phone.length != 10) {
//     //       alert("Phone Number is required !!! ");
//     //       return false;
//     //   }else if (inputData.password.length != 10) {
//     //     alert("Phone Number is required !!! ");
//     //     return false;
//     // }
//     //   else {
//     //     return true;
//     //   }
//     return (
//       <>
//         <div class="max-w-4xl mx-auto font-[sans-serif] p-6">
//       <div class="text-center mb-2">
//         <Link to="javascript:void(0)">
//             <img src="https://images.ctfassets.net/9uhkiji6mhey/4IsOg3AzWRWvWgQBpxa7La/2d00bb5fe7c104f410f0685c50c40014/YTkidsv2-content-08.jpg" alt="logo" class='inline-block' width={170} />
//         </Link>
//         <h4 role='st' class="text-gray-800 text-base font-semibold mt-6">Sign Up here!</h4>
//       </div>

//       <form>
//         <div class="grid sm:grid-cols-2 gap-8">
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='ul'>Username</label>
//             <input name="uname" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="jacksparrow00" />
//           </div>
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='fl'>First Name</label>
//             <input  name="fname" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Jack" />
//           </div>
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='ll'>Last Name</label>
//             <input name="lname" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Sparrow" />
//           </div>
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='el'>Email Id</label>
//             <input name="email" type="text" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="jacksparrow007@gmail.com" />
//           </div>
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='pl'>Password</label>
//             <input  name="password" type="password" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" />
//           </div>
//           <div>
//             <label class="text-gray-800 text-sm mb-2 block" role='ml'>Mobile No.</label>
//             <input name="mobno" type="number" class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number" />
//           </div>
          
//         </div>

//         <div class="!mt-5 text-center">
//           <button role='bl' id="regbtn" onClick={handleRegister} type="button" class="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//       </>
//     )
//   }

// import axios from 'axios';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

// export default function UserRegister() {
//     const navigate = useNavigate();
    
//     // Initialize state for form data
//     const [formData, setFormData] = useState({
//         uname: "",
//         fname: "",
//         lname: "",
//         email: "",
//         password: "",
//         confirmpassword: "", // Added confirm password field
//         mobno: "",
//         childAge: ""
//     });

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if all fields are filled out and passwords match
//         if (
//             formData.uname &&
//             formData.fname &&
//             formData.lname &&
//             formData.email &&
//             formData.password &&
//             formData.confirmpassword &&
//             formData.mobno &&
//             formData.mobno.length === 10
//         ) {
//             if (formData.password !== formData.confirmpassword) {
//                 toast.warn("Passwords do not match.");
//                 return;
//             }

//             try {
//                 await axios.post("http://localhost:1234/user", formData);
//                 console.log(formData)
//                 toast.success("Registered Successfully!");
//                 navigate("/userlogin");
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
//             <div className="max-w-4xl mx-auto font-[sans-serif] p-6" style={{
//                 backgroundImage:`url("https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg")`,
//                 backgroundSize:'cover'
//             }}>
//                 <div className="text-center mb-2">
//                     {/* <Link to="javascript:void(0)">
//                         <img
//                             src="https://images.ctfassets.net/9uhkiji6mhey/4MUIoCzkGnzNkbpqjk68ct/c53dea826424789b3a62c736ef39ab7f/ytg_logo-textures.gif?"
//                             alt="logo"
//                             className="inline-block"
//                             width={170}
//                         />
//                     </Link> */}
//                     <h4 role="st" className="text-gray-800 text-base font-semibold mt-6">Sign Up here!</h4>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                     <div className="grid sm:grid-cols-2 gap-8">
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="ul">Username</label>
//                             <input
//                                 name="uname"
//                                 type="text"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter Username"
//                                 value={formData.uname}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="fl">First Name</label>
//                             <input
//                                 name="fname"
//                                 type="text"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter First Name"
//                                 value={formData.fname}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="ll">Last Name</label>
//                             <input
//                                 name="lname"
//                                 type="text"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter Last Name"
//                                 value={formData.lname}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="el">Email Id</label>
//                             <input
//                                 name="email"
//                                 type="email"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter Email Id"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="pl">Password</label>
//                             <input
//                                 name="password"
//                                 type="password"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="pl">Confirm Password</label>
//                             <input
//                                 name="confirmpassword"
//                                 type="password"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Confirm password"
//                                 value={formData.confirmpassword}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="ml">Mobile No.</label>
//                             <input
//                                 name="mobno"
//                                 type="text"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter mobile number"
//                                 value={formData.mobno}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block" role="ml">Child Age</label>
//                             <input
//                                 name="childAge"
//                                 type="text"
//                                 className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
//                                 placeholder="Enter child age"
//                                 value={formData.childAge}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="!mt-5 text-center">
//                         <button
//                             type="submit"
//                             className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             <ToastContainer />
//         </>
//     );
// }

// import axios from 'axios';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function UserRegister() {
//     const navigate = useNavigate();

//     // Initialize state for form data
//     const [formData, setFormData] = useState({
//         uname: "",
//         fname: "",
//         lname: "",
//         email: "",
//         password: "",
//         confirmpassword: "",
//         mobno: "",
//         childAge: ""
//     });

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if all fields are filled out and passwords match
//         if (
//             formData.uname &&
//             formData.fname &&
//             formData.lname &&
//             formData.email &&
//             formData.password &&
//             formData.confirmpassword &&
//             formData.mobno &&
//             formData.mobno.length === 10
//         ) {
//             if (formData.password !== formData.confirmpassword) {
//                 toast.warn("Passwords do not match.");
//                 return;
//             }

//             try {
//                 await axios.post("http://localhost:1234/user", formData);
//                 toast.success("Registered Successfully!");
//                 navigate("/userlogin");
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
//             <div
//                 className="min-h-screen flex items-center justify-center bg-cover bg-center"
//                 style={{
//                     backgroundImage: `url("https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg")`
//                 }}
//             >
//                 <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                     <div className="text-center mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
//                         <p className="text-gray-600 mt-2">Sign up to start your journey</p>
//                     </div>
//                     <form onSubmit={handleSubmit}>
//                         <div className="grid gap-4">
//                             {[
//                                 { label: "Username", name: "uname", type: "text", placeholder: "Enter Username" },
//                                 { label: "First Name", name: "fname", type: "text", placeholder: "Enter First Name" },
//                                 { label: "Last Name", name: "lname", type: "text", placeholder: "Enter Last Name" },
//                                 { label: "Email Id", name: "email", type: "email", placeholder: "Enter Email Id" },
//                                 { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
//                                 { label: "Confirm Password", name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
//                                 { label: "Mobile No.", name: "mobno", type: "text", placeholder: "Enter Mobile Number" },
//                                 { label: "Child Age", name: "childAge", type: "text", placeholder: "Enter Child Age" }
//                             ].map((field) => (
//                                 <div key={field.name}>
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">{field.label}</label>
//                                     <input
//                                         name={field.name}
//                                         type={field.type}
//                                         className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder={field.placeholder}
//                                         value={formData[field.name]}
//                                         onChange={handleChange}
//                                     />
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
//         </>
//     );
// }

// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function UserRegister() {
//     const navigate = useNavigate();

//     // Initialize state for form data
//     const [formData, setFormData] = useState({
//         uname: "",
//         fname: "",
//         lname: "",
//         email: "",
//         password: "",
//         confirmpassword: "",
//         mobno: "",
//         childAge: ""
//     });

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Check if all fields are filled out and passwords match
//         if (
//             formData.uname &&
//             formData.fname &&
//             formData.lname &&
//             formData.email &&
//             formData.password &&
//             formData.confirmpassword &&
//             formData.mobno &&
//             formData.mobno.length === 10
//         ) {
//             if (formData.password !== formData.confirmpassword) {
//                 toast.warn("Passwords do not match.");
//                 return;
//             }

//             try {
//                 await axios.post("http://localhost:1234/user", formData);
//                 toast.success("Registered Successfully!");
//                 navigate("/userlogin");
//             } catch (error) {
//                 console.error("Registration failed:", error);
//                 toast.error("Registration failed. Please try again.");
//             }
//         } else {
//             toast.warn("Please fill out all fields correctly.");
//         }
//     };

//     return (
//         <div className="flex h-screen">
//             {/* Left Side */}
//             <div
//                 className="w-1/2 bg-cover bg-center flex items-center justify-center"
//                 style={{
//                     backgroundImage: `url("https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg")`
//                 }}
//             >
                
//             </div>

//             {/* Right Side */}
//             <div className="w-1/2 flex items-center justify-center bg-white p-4 overflow-y-auto">
//                 <div className="w-full max-w-4xl">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Your Account</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {[
//                                 { label: "Username", name: "uname", type: "text", placeholder: "Enter Username" },
//                                 { label: "First Name", name: "fname", type: "text", placeholder: "Enter First Name" },
//                                 { label: "Last Name", name: "lname", type: "text", placeholder: "Enter Last Name" },
//                                 { label: "Email Id", name: "email", type: "email", placeholder: "Enter Email Id" },
//                                 { label: "Password", name: "password", type: "password", placeholder: "Enter Password" },
//                                 { label: "Confirm Password", name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
//                                 { label: "Mobile No.", name: "mobno", type: "text", placeholder: "Enter Mobile Number" },
//                                 { label: "Child Age", name: "childAge", type: "text", placeholder: "Enter Child Age" }
//                             ].map((field) => (
//                                 <div key={field.name} className="flex flex-col">
//                                     <label className="block text-gray-700 text-sm font-semibold mb-2">{field.label}</label>
//                                     <input
//                                         name={field.name}
//                                         type={field.type}
//                                         className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder={field.placeholder}
//                                         value={formData[field.name]}
//                                         onChange={handleChange}
//                                     />
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
//         </div>
//     );
// }

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarReg from '../components/NavbarReg';
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
        acceptTerms: false // Added field for checkbox
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
                navigate("/userlogin");
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
                                { label: "Mobile No.", name: "mobno", type: "text", placeholder: "Enter Mobile Number" },
                                { label: "Child Age", name: "childAge", type: "text", placeholder: "Enter Child Age" }
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
        </div></>
    );
}
