import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CNav from '../Navbar/CNav'; 
import Loader from '../components/Loader';
import Error from '../components/Error';

const AProfile = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    adminName: '',
    username: '',
    password: '',
    email: '',
    mobileNumber: '',
    childAge: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:1234/admin/${adminId}`)
      .then(response => {
        setUser(response.data);
        setFormData({
          adminName: response.data.adminName,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email || '',
          mobileNumber: response.data.mobileNumber || '',
          childAge: response.data.childAge || '',
        });
      })
      .catch(err => setError('Error fetching profile data'))
      .finally(() => setLoading(false));
  }, [adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('All fields are required.');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(formData.email)) {
      setError('Invalid email format.');
      return;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setError('Mobile number must be 10 digits.');
      return;
    }
    axios.put(`http://localhost:1234/admin/${adminId}`, formData)
      .then(response => {
        if (response.data === 'Success') {
          setSuccess('Profile updated successfully');
          setUser(prevData => ({ ...prevData, ...formData }));
          setIsEditing(false);
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
  if (error) return <p className="text-red-600 text-center text-lg">{Error}</p>;

  return (
    <div className="min-h-screen">
      <CNav />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-600 transition-colors duration-300 mb-6"
        >
          Go Back
        </button>
        
        {isEditing ? (
          <section className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Edit Profile</h2>
            {success && <p className="text-green-600 mb-4 text-lg">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
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
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>
              
              <button
                  type="submit"
                  className="bg-red-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300 ml-4"
                >
                  Cancel
                </button>
            </form>
          </section>
        ) : (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Profile</h2>
            <div className="mb-4">
              <label htmlFor="adminName" className="block text-gray-700 text-sm font-medium mb-2">Admin Name</label>
              <p className="text-gray-700">{user.adminName}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <p className="text-gray-700">{user.username}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            >
              Edit Details
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default AProfile;

