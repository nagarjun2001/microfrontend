import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Stats = () => {
    const navigate = useNavigate();

    const stats = {
        totalViews: '2,345,678',
        totalSubscribers: '123,456',
        totalVideos: '789',
        topVideo: {
            title: 'Varaan Varaan Poochaandi',
            views: '456,789'
        },
        topChannel: {
            name: 'A2D Channel',
            subscribers: '67,890'
        },
        videoPerformance: {
            labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
            data: [150000, 200000, 250000, 300000, 350000]
        },
        channelDistribution: {
            labels: ['Channel A', 'Channel B', 'Channel C'],
            data: [300, 400, 500]
        },
        subscriberGrowth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            data: [10000, 12000, 13000, 14000, 15000, 16000, 17000]
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <main className="flex-1 p-6">
                {/* <button
                    onClick={handleGoBack}
                    className="px-4 py-2 mb-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Go Back
                </button> */}

                <header className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Admin Statistics</h1>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Views</h2>
                        <p className="text-3xl font-bold text-red-600">{stats.totalViews}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Subscribers</h2>
                        <p className="text-3xl font-bold text-red-600">{stats.totalSubscribers}</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Videos</h2>
                        <p className="text-3xl font-bold text-red-600">{stats.totalVideos}</p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Video</h2>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{stats.topVideo.title}</h3>
                        <p className="text-xl font-bold text-red-600">{stats.topVideo.views} Views</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Channel</h2>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{stats.topChannel.name}</h3>
                        <p className="text-xl font-bold text-red-600">{stats.topChannel.subscribers} Subscribers</p>
                    </div>
                </section>

                {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Performance</h2>
                        <Bar
                            data={{
                                labels: stats.videoPerformance.labels,
                                datasets: [
                                    {
                                        label: 'Views',
                                        data: stats.videoPerformance.data,
                                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} views`
                                        }
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Channel Distribution</h2>
                        <Pie
                            data={{
                                labels: stats.channelDistribution.labels,
                                datasets: [
                                    {
                                        label: 'Channels',
                                        data: stats.channelDistribution.data,
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} subscribers`
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </section>

                <section className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscriber Growth</h2>
                    <Line
                        data={{
                            labels: stats.subscriberGrowth.labels,
                            datasets: [
                                {
                                    label: 'Subscribers',
                                    data: stats.subscriberGrowth.data,
                                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                    borderColor: 'rgba(75, 192, 192, 32)',
                                    borderWidth: 1,
                                    fill: true
                                }
                            ]
                        }}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} subscribers`
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Month'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Subscribers'
                                    },
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </section> */}
            </main>
        </div>
    );
};

export default Stats;
