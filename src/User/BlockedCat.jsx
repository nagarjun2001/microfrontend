import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function BlockedCat() {
    const [userdata, setUserdata] = useState({});
    const userid = sessionStorage.getItem("userid");

    useEffect(() => {
        if (userid) {
            axios
                .get(`http://localhost:1234/user/${userid}`)
                .then((res) => {
                    setUserdata(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [userid]);

    // Function to handle the removal of a blocked category
    const handleRemoveBlockedCat = (category) => {
        if (window.confirm('Are you sure you want to unblock this category?')) {
            axios
                .delete(`http://localhost:1234/user/${userid}/block/${category}`)
                .then((res) => {
                    toast.success('Category removed successfully!', res.data);
                    console.log('Category removed successfully!', res.data);
                })
                .catch((err) => toast.error('Error removing category!'));
        }
    };

    return (
        <div>
            <h2>Blocked Categories:</h2>
            {userdata.blockedcatid && userdata.blockedcatid.length > 0 ? (
                <ul>
                    {userdata.blockedcatid.map((category, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <span>{category}</span>
                            <button
                                onClick={() => handleRemoveBlockedCat(category)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories blocked.</p>
            )}
        </div>
    );
}

export default BlockedCat;
