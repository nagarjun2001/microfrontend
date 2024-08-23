// import { useState, useRef, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Timer from "../User/Timer";

// const CProfileDrop = ({ onLogout }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isTimerVisible, setIsTimerVisible] = useState(false);
//     const [timerDuration, setTimerDuration] = useState(null);
//     const [remainingTime, setRemainingTime] = useState(null);
//     const profileRef = useRef();

//     const {id} = sessionStorage.getItem("creatorid");

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (profileRef.current && !profileRef.current.contains(e.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener('click', handleClickOutside);
//         return () => document.removeEventListener('click', handleClickOutside);
//     }, []);

//     useEffect(() => {
//         if (remainingTime !== null && remainingTime > 0) {
//             const interval = setInterval(() => {
//                 setRemainingTime((prevTime) => prevTime - 1);
//             }, 1000);
//             return () => clearInterval(interval);
//         }
//     }, [remainingTime]);

//     const handleSetTimer = () => {
//         setIsTimerVisible(true);
//         setIsOpen(false); // Close the profile dropdown when setting timer
//     };

//     const handleCloseTimer = () => {
//         setIsTimerVisible(false);
//         setRemainingTime(null); // Reset remaining time when closing the timer
//     };

//     const handleDuration = (duration) => {
//         setTimerDuration(duration);
//         setRemainingTime(duration); // Start countdown immediately
//         console.log(`Timer set for ${duration} seconds.`);
//     };

//     return (
//         <div className="relative" ref={profileRef}>
//             <button
//                 className="w-10 h-10 outline-none rounded-full ring-gray-200 ring-1 lg:focus:ring-red-600"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <div className="flex justify-center items-center">
//                     <FaUserCircle size={30} />
//                 </div>
//             </button>
//             {isOpen && (
//                 <>
//                 <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//                     <li>
//                         <Link
//                             to= {`/creatorprofile/${id}`}
//                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                             Profile
//                         </Link>
//                     </li>
//                     <li>
//                         <button
//                             onClick={onLogout}
//                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                             Logout
//                         </button>
//                     </li>
//                 </ul>
//                 </>
//             )}

//             {isTimerVisible && (
//                 <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <Timer 
//                         isVisible={isTimerVisible} 
//                         onClose={handleCloseTimer} 
//                         handleDuration={handleDuration} 
//                     />
//                 </div>
//             )}

//             {remainingTime !== null && remainingTime > 0 && (
//                 <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md z-50">
//                     <div className="text-lg font-semibold">hi Remaining Time</div>
//                     <div className="text-xl">
//                         {Math.floor(remainingTime / 60)}:{("0" + (remainingTime % 60)).slice(-2)}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CProfileDrop;
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Timer from "../User/Timer";
import { toast } from "react-toastify";

const CProfileDrop = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [timerDuration, setTimerDuration] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const profileRef = useRef();

    const creatorId = sessionStorage.getItem("creatorid"); // Retrieve creator ID

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        if (remainingTime !== null && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    const navi = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navi("/login");
        toast.success("Logged out successfully!");
    }

    const handleSetTimer = () => {
        setIsTimerVisible(true);
        setIsOpen(false); // Close the profile dropdown when setting timer
    };

    const handleCloseTimer = () => {
        setIsTimerVisible(false);
        setRemainingTime(null); // Reset remaining time when closing the timer
    };

    const handleDuration = (duration) => {
        setTimerDuration(duration);
        setRemainingTime(duration); // Start countdown immediately
        console.log(`Timer set for ${duration} seconds.`);
    };

    return (
        <div className="relative" ref={profileRef}>
            <button
                className="w-10 h-10 outline-none rounded-full ring-gray-200 ring-1 lg:focus:ring-red-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-center items-center">
                    <FaUserCircle size={30} />
                </div>
            </button>
            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <li>
                        <Link
                            to={`/creatorprofile/${creatorId}`} // Correct URL path without colon
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Edit Profile
                        </Link>
                    </li>
                    
                    <li>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}

            {isTimerVisible && (
                <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <Timer 
                        isVisible={isTimerVisible} 
                        onClose={handleCloseTimer} 
                        handleDuration={handleDuration} 
                    />
                </div>
            )}

            {remainingTime !== null && remainingTime > 0 && (
                <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md z-50">
                    <div className="text-lg font-semibold mb-2">Remaining Time</div>
                    <div className="text-xl">
                        {Math.floor(remainingTime / 60)}:{("0" + (remainingTime % 60)).slice(-2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CProfileDrop;
