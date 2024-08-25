import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UNav from "../Navbar/UNav";
import { FaBackward } from "react-icons/fa";
import { toast } from "react-toastify";

const ParentalControls = () => {
    const [timer, setTimer] = useState(1);
    const [showQuiz, setShowQuiz] = useState(true);
    const [quiz, setQuiz] = useState({ num1: 0, num2: 0 });
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizFeedback, setQuizFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setQuiz({ num1, num2 });
    }, []);

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

    const handleDuration = (duration) => {
        const expiryTime = Date.now() + duration * 60000;
        sessionStorage.setItem("remainingTime", expiryTime);
        setTimer(duration);
    };

    const handleMinutesChange = (e) => {
        setTimer(Number(e.target.value));
    };

    const handleSave = () => {
        handleDuration(timer);
        toast.success("Timer settings saved!");
        navigate("/UserHomepage");
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const correctAnswer = quiz.num1 + quiz.num2;
        if (Number(quizAnswer) === correctAnswer) {
            setShowQuiz(false);
        } else {
            toast.error("Incorrect answer. Please try again.");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("remainingTime");
        sessionStorage.removeItem("userid")
        navigate("/login");
        toast.success("Logged Out successfully!")
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <UNav onLogout={handleLogout} />
            <div className="min-h-screen bg-white text-gray-900 p-4">
                <button
                    onClick={handleGoBack}
                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-colors duration-300 flex items-center"
                >
                    <FaBackward size={12} />&nbsp; Go Back
                </button>
                <h2 className="mt-1 text-3xl flex justify-center font-semibold mb-4">Parental Controls</h2>
                <div className="flex flex-col items-center">
                    {showQuiz ? (
                        <div className="flex w-full justify-center mb-8">
                            <div className="w-full max-w-md bg-teal-700 p-6 rounded-2xl shadow-xl">
                                <h2 className="text-xl text-white mb-4">Math Quiz</h2>
                                <form onSubmit={handleQuizSubmit} className="flex flex-col items-center">
                                    <p className="text-lg text-white mb-4">
                                        What is {quiz.num1} + {quiz.num2}?
                                    </p>
                                    <input
                                        type="number"
                                        value={quizAnswer}
                                        onChange={(e) => setQuizAnswer(e.target.value)}
                                        className="border rounded-md px-3 py-2 mb-4"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-teal-400 text-white px-4 py-2 rounded-md hover:bg-teal-300 transition-colors duration-300"
                                    >
                                        Submit
                                    </button>
                                    {quizFeedback && <p className="text-red-500 mt-2">{quizFeedback}</p>}
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full justify-center">
                            <div className="w-2/3 p-4 bg-gray-100 rounded-lg shadow-lg mr-4">
                                <h3 className="text-2xl font-semibold mb-4">Set Timer</h3>
                                <label htmlFor="timer-slider" className="block text-gray-700 text-sm font-medium mb-2">
                                    Session Duration (minutes)
                                </label>
                                <input
                                    type="range"
                                    id="timer-slider"
                                    min="1"
                                    max="60"
                                    step="1"
                                    value={timer}
                                    onChange={handleMinutesChange}
                                    className="w-full accent-teal-600"
                                />
                                <div className="flex justify-between mt-2 text-gray-600">
                                    <span>1 min</span>
                                    <span>{timer} min</span>
                                    <span>60 min</span>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="bg-teal-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Save
                                </button>
                            </div>
                            <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-semibold mb-4">Manage Blocks</h3>
                                <Link
                                    to="/userblockvid"
                                    className="bg-teal-600 text-center text-white px-3 py-2 rounded-md mb-4 block hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Blocked Videos
                                </Link>
                                <Link
                                    to="/userblockcat"
                                    className="bg-teal-600 text-center text-white px-3 py-2 rounded-md block hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Blocked Categories
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ParentalControls;
