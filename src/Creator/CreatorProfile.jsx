import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CNav from '../Navbar/CNav';
import Loader from '../components/Loader';

function CreatorProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [creator, setCreator] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    creatorname: '',
    channelname: '',
    email: '',
    password:''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:1234/creator/${id}`)
      .then(response => {
        setCreator(response.data);
        setFormData({
          id: response.data.id,
          name: response.data.name,
          creatorname: response.data.creatorname,
          channelname: response.data.channelname,
          email: response.data.email,
          password: response.data.password
        });
      })
      .catch(err => setError('Error fetching profile data'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:1234/creator`, formData)
      .then(response => {
        if (response.data === 'Success') {
          setSuccess('Profile updated successfully');
          setCreator(prevData => ({ ...prevData, ...formData }));
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
    <div className=" min-h-screen">
      <CNav />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
        >
          Go Back
        </button>
        {creator && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-6 flex items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-4xl">👤</span>
            </div>
            <div className="ml-4">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">{creator.name}</h2>
              <p className="text-gray-700 text-lg mb-1">Creator Name: {creator.creatorname}</p>
              <p className="text-gray-700 text-lg mb-1">Channel Name: {creator.channelname}</p>
              <p className="text-gray-700 text-lg">Email: {creator.email}</p>
            </div>
          </section>
        )}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Edit Profile</h2>
          {success && <p className="text-green-600 mb-4 text-lg">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="creatorname" className="block text-gray-700 text-sm font-medium mb-2">Creator Name</label>
              <input
                type="text"
                id="creatorname"
                name="creatorname"
                value={formData.creatorname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="channelname" className="block text-gray-700 text-sm font-medium mb-2">Channel Name</label>
              <input
                type="text"
                id="channelname"
                name="channelname"
                value={formData.channelname}
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
              <input disabled
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CreatorProfile;
