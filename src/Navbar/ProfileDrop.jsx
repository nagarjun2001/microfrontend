// // // import { useState, useRef, useEffect } from "react";
// // // import { FaUserCircle } from "react-icons/fa";
// // // import { Link } from "react-router-dom";
// // // import Timer from "../User/Timer";

// // // const ProfileDrop = ({ onLogout }) => {
// // //     const [isOpen, setIsOpen] = useState(false);
// // //     const [isTimerVisible, setIsTimerVisible] = useState(false);
// // //     const [timerDuration, setTimerDuration] = useState(null);
// // //     const profileRef = useRef();

// // //     useEffect(() => {
// // //         const handleClickOutside = (e) => {
// // //             if (!profileRef.current.contains(e.target)) setIsOpen(false);
// // //         };
// // //         document.addEventListener('click', handleClickOutside);
// // //         return () => document.removeEventListener('click', handleClickOutside);
// // //     }, []);

// // //     const handleSetTimer = () => {
// // //         setIsTimerVisible(true);
// // //         setIsOpen(false); // Close the profile dropdown when setting timer
// // //     };

// // //     const handleCloseTimer = () => {
// // //         setIsTimerVisible(false);
// // //     };

// // //     const handleDuration = (duration) => {
// // //         setTimerDuration(duration);
// // //         console.log(`Timer set for ${duration} seconds.`);
// // //         // Add additional logic to start the countdown or other actions here if needed
// // //     };

// // //     return (
// // //         <div className="relative" ref={profileRef}>
// // //             <button
// // //                 className="w-10 h-10 outline-none rounded-full ring-gray-200 ring-1 lg:focus:ring-red-600"
// // //                 onClick={() => setIsOpen(!isOpen)}
// // //             >
// // //                 <div className="flex justify-center items-center">
// // //                     <FaUserCircle size={30} />
// // //                 </div>
// // //             </button>
// // //             {isOpen && (
// // //                 <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
// // //                     <li>
// // //                         <button
// // //                             onClick={handleSetTimer}
// // //                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// // //                         >
// // //                             Set Timer
// // //                         </button>
// // //                     </li>
// // //                     <li>
// // //                         {/* <Link
// // //                             to="/userblockvid"
// // //                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// // //                         >
// // //                             Blocked Videos
// // //                         </Link>
// // //                     </li>
// // //                     <li>
// // //                         <Link
// // //                             to="/userblockcat"
// // //                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// // //                         >
// // //                             Blocked Categories
// // //                         </Link> */}
// // //                     </li>
// // //                     <li>
// // //                         <button
// // //                             onClick={onLogout}
// // //                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// // //                         >
// // //                             Logout
// // //                         </button>
// // //                     </li>
// // //                 </ul>
// // //             )}

// // //             {isTimerVisible && (
// // //                 <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //                     <Timer 
// // //                         isVisible={isTimerVisible} 
// // //                         onClose={handleCloseTimer} 
// // //                         handleDuration={handleDuration} 
// // //                     />
// // //                 </div>
// // //             )}
            
// // //             {timerDuration !== null && (
// // //                 <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md z-50">
// // //                     <div className="text-lg font-semibold">Remaining Time</div>
// // //                     <div className="text-xl">
// // //                         {Math.floor(timerDuration / 60)}:{("0" + (timerDuration % 60)).slice(-2)}
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default ProfileDrop;

// // import { useState, useRef, useEffect } from "react";
// // import { FaUserCircle } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import Timer from "../User/Timer";

// // const ProfileDrop = ({ onLogout }) => {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [isTimerVisible, setIsTimerVisible] = useState(false);
// //     const [timerDuration, setTimerDuration] = useState(null);
// //     const [remainingTime, setRemainingTime] = useState(null);
// //     const profileRef = useRef();

// //     useEffect(() => {
// //         const handleClickOutside = (e) => {
// //             if (profileRef.current && !profileRef.current.contains(e.target)) {
// //                 setIsOpen(false);
// //             }
// //         };
// //         document.addEventListener('click', handleClickOutside);
// //         return () => document.removeEventListener('click', handleClickOutside);
// //     }, []);

// //     useEffect(() => {
// //         if (remainingTime !== null && remainingTime > 0) {
// //             const interval = setInterval(() => {
// //                 setRemainingTime((prevTime) => prevTime - 1);
// //             }, 1000);
// //             return () => clearInterval(interval);
// //         }
// //     }, [remainingTime]);

// //     const handleSetTimer = () => {
// //         setIsTimerVisible(true);
// //         setIsOpen(false); // Close the profile dropdown when setting timer
// //     };

// //     const handleCloseTimer = () => {
// //         setIsTimerVisible(false);
// //         setRemainingTime(null); // Reset remaining time when closing the timer
// //     };

// //     const handleDuration = (duration) => {
// //         setTimerDuration(duration);
// //         setRemainingTime(duration); // Start countdown immediately
// //         console.log(`Timer set for ${duration} seconds.`);
// //     };

// //     return (
// //         <div className="relative" ref={profileRef}>
// //             <button
// //                 className="w-10 h-10 outline-none rounded-full ring-gray-200 ring-1 lg:focus:ring-red-600"
// //                 onClick={() => setIsOpen(!isOpen)}
// //             >
// //                 <div className="flex justify-center items-center">
// //                     <FaUserCircle size={30} />
// //                 </div>
// //             </button>
// //             {isOpen && (
// //                 <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
// //                     <li>
// //                         <button
// //                             onClick={handleSetTimer}
// //                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                         >
// //                            Parental Controls
// //                         </button>
// //                     </li>
// //                     <li>
// //                         <Link
// //                             to="/userprofile"
// //                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                         >
// //                             Profile
// //                         </Link>
// //                     </li>
// //                     <li>
// //                         <button
// //                             onClick={onLogout}
// //                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
// //                         >
// //                             Logout
// //                         </button>
// //                     </li>
// //                 </ul>
// //             )}

// //             {isTimerVisible && (
// //                 <div className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <Timer 
// //                         isVisible={isTimerVisible} 
// //                         onClose={handleCloseTimer} 
// //                         handleDuration={handleDuration} 
// //                     />
// //                 </div>
// //             )}

// //             {remainingTime !== null && remainingTime > 0 && (
// //                 <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md z-50">
// //                     <div className="text-lg font-semibold">hi Remaining Time</div>
// //                     <div className="text-xl">
// //                         {Math.floor(remainingTime / 60)}:{("0" + (remainingTime % 60)).slice(-2)}
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ProfileDrop;

// import { useState, useRef, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import Timer from "../User/Timer";

// const ProfileDrop = ({ onLogout }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isTimerVisible, setIsTimerVisible] = useState(false);
//     const [remainingTime, setRemainingTime] = useState(null);
//     const profileRef = useRef();

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
//                 setRemainingTime((prevTime) => {
//                     if (prevTime <= 1) {
//                         clearInterval(interval);
//                         return 0;
//                     }
//                     return prevTime - 1;
//                 });
//             }, 1000);
//             return () => clearInterval(interval);
//         }
//     }, [remainingTime]);

//     const handleSetTimer = () => {
//         setIsTimerVisible(true);
//         setIsOpen(false);
//     };

//     const handleCloseTimer = () => {
//         setIsTimerVisible(false);
//         setRemainingTime(null);
//     };

//     const handleDuration = (duration) => {
//         setRemainingTime(duration * 60); // Convert minutes to seconds
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
//                 <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
//                     <li>
//                         <button
//                             onClick={handleSetTimer}
//                             className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
//                             Parental Controls
//                         </button>
//                     </li>
//                     <li>
//                         <Link
//                             to={`/userprofile/${id}`}
//                             className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                         >
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
//                     <div className="text-lg font-semibold">Remaining Time</div>
//                     <div className="text-xl">
//                         {Math.floor(remainingTime / 60)}:{("0" + (remainingTime % 60)).slice(-2)}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProfileDrop;

import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProfileDrop = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTimerVisible, setIsTimerVisible] = useState(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [minutes, setMinutes] = useState(0);
    const [showQuiz, setShowQuiz] = useState(true);
    const [quiz, setQuiz] = useState({ num1: 0, num2: 0 });
    const [quizAnswer, setQuizAnswer] = useState("");
    const [quizFeedback, setQuizFeedback] = useState("");
    const profileRef = useRef();
    const navigate = useNavigate();

    const id = sessionStorage.getItem("userid");

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
        const storedMinutes = sessionStorage.getItem("timerMinutes");

        if (storedMinutes) {
            setMinutes(storedMinutes);
        }

        if (remainingTime !== null && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        handleLogout();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    useEffect(() => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setQuiz({ num1, num2 });
    }, []);

    const handleSetTimer = () => {
        setIsTimerVisible(true);
        setIsOpen(false);
    };

    const handleCloseTimer = () => {
        setIsTimerVisible(false);
    };

    const handleDuration = (duration) => {
        const durationInSeconds = duration * 60;
        setRemainingTime(durationInSeconds);
        sessionStorage.setItem("remainingTime", durationInSeconds);
        sessionStorage.setItem("timerMinutes", duration);
    };

    const handleMinutesChange = (e) => {
        setMinutes(e.target.value);
    };

    const handleSave = () => {
        handleDuration(minutes);
        setShowQuiz(true);
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const correctAnswer = quiz.num1 + quiz.num2;
        if (Number(quizAnswer) === correctAnswer) {
            setShowQuiz(false);
        } else {
            setQuizFeedback("Incorrect answer. Please try again.");
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
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
                        <button
                            onClick={handleSetTimer}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Parental Controls
                        </button>
                    </li>
                    <li>
                        <Link
                            to={`/userprofile/${id}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}

            {isTimerVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white shadow-lg p-6 rounded-lg" style={{ width: "450px" }}>
                        <button
                            onClick={handleCloseTimer}
                            className="absolute top-2 right-2 text-gray-300 hover:text-white"
                        >
                            &times;
                        </button>
                        {showQuiz ? (
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Math Quiz</h2>
                                <form onSubmit={handleQuizSubmit} className="flex flex-col flex-grow justify-center items-center">
                                    <p className="text-lg mb-4">
                                        What is {quiz.num1} + {quiz.num2}?
                                    </p>
                                    <input
                                        type="number"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 mb-4 text-white"
                                        required
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="submit"
                                            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={handleCloseTimer}
                                            className="bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                        >
                                            Close
                                        </button>
                                    </div>
                                    {quizFeedback && <p className="text-red-400 mt-2">{quizFeedback}</p>}
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col flex-grow space-y-4">
                                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Set Timer</h2>
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="timer-slider" className="text-gray-300 mb-2">Select Duration</label>
                                    <input
                                        type="range"
                                        id="timer-slider"
                                        min="0"
                                        max="60"
                                        step="1"
                                        value={minutes}
                                        onChange={handleMinutesChange}
                                        className="w-full bg-gray-700 accent-teal-600"
                                    />
                                    <div className="flex justify-between mt-2 text-gray-400">
                                        <span>0 min</span>
                                        <span>{minutes} min</span>
                                        <span>60 min</span>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCloseTimer}
                                        className="bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Blocked Data</h2>
                                <a
                                    href="/userblockvid"
                                    className="bg-teal-600 w-48 text-center text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Blocked Videos
                                </a>
                                <a
                                    href="/userblockcat"
                                    className="bg-teal-600 w-48 text-center text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Blocked Categories
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDrop;
