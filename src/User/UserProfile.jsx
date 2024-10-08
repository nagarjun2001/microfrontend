import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CNav from '../Navbar/CNav'; 
import Loader from '../components/Loader';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    id: userId,
    uname: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
    mobno: '',
    childAge: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:1234/user/${userId}`)
      .then(response => {
        setUser(response.data);
        setFormData({
          id: userId,
          uname: response.data.uname,
          fname: response.data.fname,
          lname: response.data.lname,
          email: response.data.email,
          password: response.data.password,
          mobno: response.data.mobno,
          childAge: response.data.childAge
        });
      })
      .catch(err => setError('Error fetching profile data'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const [timer, setTimer] = useState(1);

    useEffect(() => {
        const checkSession = () => {
            const storedTime = sessionStorage.getItem("remainingTime");
            if (storedTime) {
                const expiryTime = parseInt(storedTime, 10);
                const now = Date.now();
                if (now >= expiryTime) {
                    handleLogout();
                } else {
                    const interval = setInterval(() => {
                        const timeLeft = expiryTime - Date.now();
                        if (timeLeft <= 0) {
                            clearInterval(interval);
                            handleLogout();
                        } else {
                            setTimer(Math.ceil(timeLeft / 60000));
                        }
                    }, 1000);
                    return () => clearInterval(interval);
                }
            }
        };
        checkSession();
    }, []);

    const handleLogout = () => {
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("remainingTime");
      navigate("/login");
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:1234/user`, formData)
      .then(response => {
        if (response.data === 'Success') {
          setSuccess('Profile updated successfully');
          setUser(prevData => ({ ...prevData, ...formData }));
          toast.success("Profile updated!");
          window.location.reload();
        } else {
          setError('Error updating profile');
        }
      })
      .catch(err => setError('Error updating profile'));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center text-lg">{error}</p>;

  return (
    <div className="min-h-screen">
      <CNav />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
        >
          Go Back
        </button>
        
        {user && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="mb-4">
              <label htmlFor="uname" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <p className="text-gray-700">{user.uname}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="fname" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
              <p className="text-gray-700">{user.fname}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="lname" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
              <p className="text-gray-700">{user.lname}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="mobno" className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
              <p className="text-gray-700">{user.mobno}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="childAge" className="block text-gray-700 text-sm font-medium mb-2">Child Age</label>
              <p className="text-gray-700">{user.childAge}</p>
            </div>
          </section>
        )}

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Edit Profile</h2>
          {success && <p className="text-green-600 mb-4 text-lg">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="uname" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                id="uname"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fname" className="block text-gray-700 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lname" className="block text-gray-700 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobno" className="block text-gray-700 text-sm font-medium mb-2">Mobile Number</label>
              <input
                type="tel"
                id="mobno"
                name="mobno"
                value={formData.mobno}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="childAge" className="block text-gray-700 text-sm font-medium mb-2">Child Age</label>
              <input
                type="text"
                id="childAge"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
