import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
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

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <main className="flex-1 p-6">
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
            </main>
        </div>
    );
};

export default Stats;
