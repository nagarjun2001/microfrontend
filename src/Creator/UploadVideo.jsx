import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CNav from '../Navbar/CNav';
import logo from '../images/Upload.png';

const UploadVideo = () => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    file: null,
    image: null,
    agelevel: '',
    category_id: '', 
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:1234/category/all')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        toast.error("Error fetching categories");
      });
  }, []);

  const handleUpload = () => {
    setIsUploading(true);
    const creatorid = sessionStorage.getItem("creatorid");
    const formData = new FormData();
    formData.append('title', newVideo.title);
    formData.append('description', newVideo.description);
    formData.append('agelevel', newVideo.agelevel);
    formData.append('creator_id', creatorid ? creatorid : '');
    formData.append('category_id', newVideo.category_id ? newVideo.category_id : '');
    formData.append('file', newVideo.file);
    formData.append('image', newVideo.image);

    axios.post('http://localhost:1234/video/upload', formData)
      .then(() => {
        setIsUploading(false);
        toast.success("Video Uploaded Successfully. Status: Waiting for Approval.");
        navigate('/CreatorHomepage');
      })
      .catch(err => {
        setIsUploading(false);
        console.error('Error uploading video:', err);
        toast.error("Error uploading video");
      });
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'video') {
      setNewVideo({ ...newVideo, file: e.target.files[0] });
    } else if (e.target.name === 'image') {
      setNewVideo({ ...newVideo, image: e.target.files[0] });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setNewVideo({ ...newVideo, category_id: selectedCategoryId });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CNav />
      <div className="relative min-h-screen flex flex-col items-center p-9 bg-cover bg-center">        
        <h1 className="text-2xl font-semibold text-gray-800">Upload Video</h1>
        
        <div className="relative z-10 w-full max-w-2xl bg-white p-8 rounded-md shadow-lg">
          <button
            onClick={handleGoBack}
            className="bg-gray-500 mb-1 text-white px-2 py-2 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-300"
          >
            Go Back
          </button>

          <img src={logo} width={2000} alt="Upload Logo" className="mx-auto mb-6" />
          <form className="space-y-6">
            <hr className="my-2" />
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
                  required />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Age Level</label>
                <select
                  value={newVideo.agelevel}
                  onChange={(e) => setNewVideo({ ...newVideo, agelevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
                  required
                >
                  <option value="">Select Age Level</option>
                  <option value="Pre-School (Ages 4 and under)">Pre-School (Ages 4 and under)</option>
                  <option value="Younger (Ages between 5-8)">Younger (Ages 5-8)</option>
                  <option value="Older (Ages 9-12)">Older (Ages 9-12)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Description</label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
                rows="4"
                required />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Video File</label>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full text-gray-600"
                  required />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 mb-2 text-sm font-medium">Upload Thumbnail</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-gray-600"
                  required />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Category</label>
              <select
                value={newVideo.category_id}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.categoryname}</option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleUpload}
                className={`bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default UploadVideo;
