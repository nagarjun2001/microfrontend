// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Component to handle the creation and updating of a video
// function CreatorHome() {
//   const [creator, setCreator] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [newVideo, setNewVideo] = useState({
//     title: '',
//     description: '',
//     file: null,
//     agelevel: '',
//     status: false,
//     creator_id: '',
//     category_id: '',
//     category: '' // Add a category property
//   });
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

//   const creatorid = sessionStorage.getItem("creatorid");

//   useEffect(() => {
//     axios.get(`http://localhost:1234/creator/${creatorid}`)
//       .then(res => setCreator(res.data))
//       .catch(err => console.error('Error fetching creator data:', err));

//     axios.get(`http://localhost:1234/video/creator/${creatorid}`)
//       .then(res => setVideos(res.data))
//       .catch(err => console.error('Error fetching videos:', err));
//   }, [creatorid]);

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append('title', newVideo.title);
//     formData.append('description', newVideo.description);
//     formData.append('agelevel', newVideo.agelevel);
//     formData.append('creator_id', parseInt(newVideo.creator_id,10));
//     formData.append('category_id', parseInt(newVideo.category_id,10));
//     formData.append('file', newVideo.file);

//     axios.post('http://localhost:1234/video/upload', formData)
//       .then(() => {
//         setVideos([...videos, newVideo]);
//         setNewVideo({
//           title: '',
//           description: '',
//           file: null,
//           agelevel: '',
//           status: false,
//           creator_id: creatorid,
//           category_id: ''
//         }); 
//         setIsUploadModalOpen(false);
//       })
//       .catch(err => console.error('Error uploading video:', err));
//   };

//   const handleFileChange = (e) => {
//     setNewVideo({ ...newVideo, file: e.target.files[0] });
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setNewVideo({ ...newVideo, category: selectedCategory, category_id: getCategoryID(selectedCategory) });
//   };

//   const getCategoryID = (category) => {
//     switch (category) {
//       case 'Writing':
//         return 1;
//       case 'Science':
//         return 2;
//       case 'Rhymes':
//         return 3;
//       case 'Cartoons':
//         return 4;
//       default:
//         return 0;
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("creatorid");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <header className="bg-blue-600 text-white p-4 mb-6">
//         <h1 className="text-3xl font-bold">Creator Dashboard</h1>
//       </header>

//       {creator && (
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold">{creator.name}</h2>
//           <p className="text-gray-600">Email: {creator.email}</p>
//           <p className="text-gray-600">Creator Name: {creator.creatorname}</p>
//           <p className="text-gray-600">Channel Name: {creator.channelname}</p>
//         </div>
//       )}

//       <button
//         onClick={() => setIsUploadModalOpen(true)}
//         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
//       >
//         Upload New Video
//       </button>

//       <div className="my-6">
//         <h2 className="text-2xl font-semibold mb-4">Your Videos</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {videos.length === 0 ? (
//             <p>No videos available</p>
//           ) : (
//             videos.map((video) => (
//               <div key={video.id} className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="text-xl font-bold mb-2">{video.title}</h3>
//                 <p className="text-gray-600 mb-2">{video.description}</p>
//                 <video autoPlay muted className="w-full mb-4 border border-gray-300 rounded-lg">
//                   <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {isUploadModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={newVideo.title}
//                   onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Description</label>
//                 <textarea
//                   value={newVideo.description}
//                   onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Video File</label>
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={handleFileChange}
//                   className="w-full"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Age Level</label>
//                 <select
//                   value={newVideo.agelevel}
//                   onChange={(e) => setNewVideo({ ...newVideo, agelevel: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 >
//                   <option value="">Select Age Level</option>
//                   <option value="Pre-School (Ages 4 and under)">Pre-School (Ages 4 and under)</option>
//                   <option value="Younger (Ages between 5-8)">Younger (Ages 5-8)</option>
//                   <option value="Older (Ages between 9-12)">Older (9-12)</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2">Category</label>
//                 <select
//                   value={newVideo.category}
//                   onChange={handleCategoryChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   <option value="Rhymes">Rhymes</option>
//                   <option value="Cartoons">Cartoons</option>
//                   <option value="Songs">Songs</option>
//                   <option value="Science">Science</option>
//                 </select>
//               </div>
//               <div className="text-right">
//                 <button
//                   type="button"
//                   onClick={handleUpload}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//                 >
//                   Upload
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsUploadModalOpen(false)}
//                   className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="text-center mt-6">
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CreatorHome;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component to handle the creation and updating of a video
function CreatorHome() {
  const [creator, setCreator] = useState(null);
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    file: null,
    agelevel: '',
    status: false,
    creator_id: '',
    category_id: '', // Ensure this is set to a valid integer or empty string
    category: '' // Add a category property
  });
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const creatorid = sessionStorage.getItem("creatorid");

  useEffect(() => {
    if (creatorid) {
      axios.get(`http://localhost:1234/creator/${creatorid}`)
        .then(res => setCreator(res.data))
        .catch(err => console.error('Error fetching creator data:', err));

      axios.get(`http://localhost:1234/video/creator/${creatorid}`)
        .then(res => setVideos(res.data))
        .catch(err => console.error('Error fetching videos:', err));
    }
  }, [creatorid]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', newVideo.title);
    formData.append('description', newVideo.description);
    formData.append('agelevel', newVideo.agelevel);
    formData.append('creator_id', creatorid ? parseInt(creatorid, 10) : ''); // Ensure this is an integer
    formData.append('category_id', newVideo.category_id ? parseInt(newVideo.category_id, 10) : ''); // Ensure this is an integer
    formData.append('file', newVideo.file);

    axios.post('http://localhost:1234/video/upload', formData)
      .then(() => {
        setVideos([...videos, newVideo]);
        setNewVideo({
          title: '',
          description: '',
          file: null,
          agelevel: '',
          status: false,
          creator_id: creatorid || '', // Ensure this is correctly set
          category_id: '' // Ensure this is correctly set
        });
        setIsUploadModalOpen(false);
      })
      .catch(err => console.error('Error uploading video:', err));
  };

  const handleFileChange = (e) => {
    setNewVideo({ ...newVideo, file: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const categoryId = getCategoryID(selectedCategory);
    setNewVideo({ ...newVideo, category: selectedCategory, category_id: categoryId });
  };

  const getCategoryID = (category) => {
    switch (category) {
      case 'Writing':
        return 1;
      case 'Science':
        return 2;
      case 'Rhymes':
        return 3;
      case 'Cartoons':
        return 4;
      default:
        return ''; // Default to empty string or 0, depending on your backend handling
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("creatorid");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 mb-6">
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
      </header>

      {creator && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{creator.name}</h2>
          <p className="text-gray-600">Email: {creator.email}</p>
          <p className="text-gray-600">Creator Name: {creator.creatorname}</p>
          <p className="text-gray-600">Channel Name: {creator.channelname}</p>
        </div>
      )}

      <button
        onClick={() => setIsUploadModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        Upload New Video
      </button>

      <div className="my-6">
        <h2 className="text-2xl font-semibold mb-4">Your Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.length === 0 ? (
            <p>No videos available</p>
          ) : (
            videos.map((video) => (
              <div key={video.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-2">{video.description}</p>
                <video autoPlay muted className="w-full mb-4 border border-gray-300 rounded-lg">
                  <source src={`data:video/mp4;base64,${video.videofile}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          )}
        </div>
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Age Level</label>
                <select
                  value={newVideo.agelevel}
                  onChange={(e) => setNewVideo({ ...newVideo, agelevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Age Level</option>
                  <option value="Pre-School (Ages 4 and under)">Pre-School (Ages 4 and under)</option>
                  <option value="Younger (Ages between 5-8)">Younger (Ages 5-8)</option>
                  <option value="Older (Ages between 9-12)">Older (9-12)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={newVideo.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Writing">Writing</option>
                  <option value="Science">Science</option>
                  <option value="Rhymes">Rhymes</option>
                  <option value="Cartoons">Cartoons</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleUpload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default CreatorHome;
