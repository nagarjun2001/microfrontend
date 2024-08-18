import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const adminId = sessionStorage.getItem("adminId");
  const[admindata, setAdmindata] = useState([]);
  const navigate = useNavigate();

    useEffect(()=>{
        axios
            .get(`http://localhost:1234/admin/${adminId}`)
            .then((res)=>{
              console.log(res.data);
              setAdmindata(res.data);
            })
            .catch((err)=>console.log(err))
    },[]);

    let handleLogout = () =>{
      toast.success("Logged out successfully!!!");
      sessionStorage.clear();
      navigate("/adminlogin");
    }

  return (
    <div>
      <button onClick={handleLogout} 
      className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
      <h2 className="text-2xl flex justify-center font-bold mb-4">Welcome {admindata.adminName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <Link to="/status">
          <div className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-xl font-semibold">Pending Videos</h3>
            <p className="mt-2 text-gray-600">Approve or Reject videos.</p>
          </div>
        </Link>
        
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">New Users</h3>
          <p className="mt-2 text-gray-600">Summary of new user sign-ups.</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h3 className="text-xl font-semibold">Revenue</h3>
          <p className="mt-2 text-gray-600">Detailed revenue information.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
