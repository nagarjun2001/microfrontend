import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ANav from '../Navbar/ANav';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        axios
        .post("http://localhost:1234/category",{categoryname:categoryName})
        .then((res)=>{
            console.log(categoryName);
            toast.success("Category added!")
            setCategoryName('')
        })
    } catch (error) {
      toast.error('Failed to add category!');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ANav />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-black/80 hover:text-gray-500 transition duration-150 ease-in-out">
                <FaArrowLeft /><span>Go Back</span>
            </button>
          <h1 className="text-3xl font-bold text-black/80 mb-6">Add Category</h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-medium mb-2">Category Name</label>
              <input
                name="category_name"
                type="text"
                onChange={(e) => setCategoryName(e.target.value)}
                className="bg-gray-50 w-full text-gray-700 text-sm px-4 py-3 rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 transition duration-150 ease-in-out"
                placeholder="Enter Category Name"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-150 ease-in-out"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
