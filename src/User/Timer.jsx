import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Timer = ({ isVisible, onClose }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showQuiz, setShowQuiz] = useState(true);
    const [quizAnswer, setQuizAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [quizFeedback, setQuizFeedback] = useState("");
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const savedTimerDuration = sessionStorage.getItem('timerDuration');
        if (savedTimerDuration) {
            setRemainingTime(Number(savedTimerDuration));
        }
    }, []);

    useEffect(() => {
        if (remainingTime !== null && remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        handleLogout();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [remainingTime]);

    useEffect(() => {
        if (remainingTime !== null) {
            setMinutes(Math.floor(remainingTime / 60));
            setSeconds(remainingTime % 60);
        }
    }, [remainingTime]);

    const generateQuiz = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCorrectAnswer(num1 + num2);
        return { num1, num2 };
    };

    const [quiz] = useState(generateQuiz);

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        if (parseInt(quizAnswer, 10) === correctAnswer) {
            setShowQuiz(false);
            const totalTime = minutes * 60 + seconds;
            if (totalTime > 0) {
                setRemainingTime(totalTime);
                sessionStorage.setItem('timerDuration', totalTime);
                toast.success("Timer set successfully!");
            } else {
                toast.warn("The selected timer duration is invalid.");
            }
        } else {
            setQuizFeedback("Incorrect answer. Please try again.");
        }
    };

    const handleSave = () => {
        onClose();
    };

    const handleCancel = () => {
        setRemainingTime(null);
        onClose();
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/login";
    };

    const handleMinutesChange = (e) => setMinutes(Number(e.target.value));

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white shadow-lg p-6 rounded-lg" style={{ width: "450px" }}>
                <button
                    onClick={handleCancel}
                    className="absolute top-2 right-2 text-gray-300 hover:text-white"
                >
                    &times;
                </button>
                <div className="flex flex-col">
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
                                        onClick={handleCancel}
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
                                    onClick={handleCancel}
                                    className="bg-gray-600 text-gray-200 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">Blocked Data</h2>
                            <Link
                                to="/userblockvid"
                                className="bg-teal-600 w-48 text-center text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                            >
                                Blocked Videos
                            </Link>
                            <Link
                                to="/userblockcat"
                                className="bg-teal-600 w-48 text-center text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                            >
                                Blocked Categories
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timer;
