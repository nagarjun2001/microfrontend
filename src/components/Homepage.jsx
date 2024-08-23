import React from 'react';
import './Homepage.css';
import HomeNavbar from '../Navbar/HomeNavbar';
import Footer from './Footer';

const Homepage = () => {
    return (
        <>
        <HomeNavbar />
        <section className="relative flex justify-center w-full h-full">
            <div className="videoContainer">
                <video autoPlay loop muted>
                    <source src="//videos.ctfassets.net/9uhkiji6mhey/RGiEfncMpkZlEV0Ejf4NR/c7cbf87bf813bf7f03c192787dead6d9/Hero-video-Landscape.mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 p-6 text-center text-white rounded-lg">
                    <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeIn">Welcome to KidsTube!</h1>
                    <p className="text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">Discover fun and educational videos just for you.</p>
                    <a href="/regtype" id='button' className="bg-gradient-to-r from-red-500 to-red-700 text-white py-2 px-8 rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105">Sign up now to Explore!</a>
                </div>
            </div>
        </section>

        <section className="bg-white py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <video autoPlay loop muted className="w-full h-full object-cover rounded-lg shadow-lg">
                        <source src="//videos.ctfassets.net/9uhkiji6mhey/1ibSVLGykWcCMtj5eb2jUd/730a847cf56465619788ea1fc1f244b0/GoogleKidsSpace-Case-04.mp4" />
                    </video>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Explore More Learning Opportunities!</h2>
                    <p className="text-lg mb-4">Dive into our latest content designed to make learning fun and engaging for kids. Our platform offers a range of interactive and educational videos that not only entertain but also educate. From creative storytelling to exciting educational challenges, there’s something for every curious mind.</p>
                    {/* <p className="text-lg">Join us and be a part of a vibrant community where learning and fun go hand in hand. Whether it's exploring new subjects or diving deeper into your favorite topics, our content is curated to spark curiosity and encourage learning.</p> */}
                </div>
            </div>
        </section>

        <section className="bg-white py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse gap-8">
                <div className="flex-1">
                    <img
                        src="https://images.ctfassets.net/9uhkiji6mhey/1KtGLafIooNgseaCzXbgl2/9ebc025154192ce65485217f24d42d76/Hero_Landscape.png"
                        alt="More Content"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Engage with New Features!</h2>
                    <p className="text-lg mb-4">Discover the latest features and updates on our platform. We're constantly working to bring you fresh content and new ways to interact with our educational resources.</p>
                    <p className="text-lg">Stay tuned for exciting new additions that enhance the learning experience and keep kids engaged. Our goal is to make learning a fun and immersive experience for everyone.</p>
                </div>
            </div>
        </section>

        <section className="bg-white py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <img
                        src="https://images.ctfassets.net/9uhkiji6mhey/1hL9r3U8qx3BtN6FIjMqAd/290716c9274e4e626d31c59ecba74267/YTkidsv2-content-10.jpg"
                        alt="Educational Content"
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Discover More Content!</h2>
                    <p className="text-lg mb-4">Explore our diverse range of videos and interactive content designed to keep kids engaged and learning. Our curated content offers something for everyone, from captivating stories to educational challenges.</p>
                    <p className="text-lg">Join the fun and dive into a world where learning meets adventure. Our platform is dedicated to providing high-quality, kid-friendly content that makes every moment enjoyable and educational.</p>
                </div>
            </div>
        </section>

        <section className="bg-white py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse gap-8">
                <div className="flex-1">
                    <video autoPlay loop muted className="w-full h-full object-cover rounded-lg shadow-lg">
                        <source src="https://videos.ctfassets.net/9uhkiji6mhey/5lqWVOA6hhFwmWRnrIdKAU/6add1ac0fd7a41bfd270e88c050e984b/GoogleKidsSpace-Case-08.mp4" />
                    </video>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Experience Interactive Learning!</h2>
                    <p className="text-lg mb-4">Our interactive content helps kids learn through play and exploration. Each video is crafted to encourage curiosity and support educational growth. Whether it’s engaging animations or thought-provoking challenges, we aim to make learning an adventure.</p>
                    {/* <p className="text-lg">Explore a diverse range of topics and activities designed to capture the interest of young learners. Our content is continually updated to provide fresh and relevant educational experiences.</p> */}
                </div>
            </div>
        </section>

        {/* <footer className="bg-yellow-300 text-dark-900 py-12">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-4">Join the Fun! Learn and Educate yourself</h3>
                <p className="text-lg mb-6">Stay up to date with all the exciting new content and features!</p>
<hr />
                <div className="flex justify-center mb-6 space-x-4">
                    <a href="https://facebook.com" className="text-blue-800 hover:text-blue-600 transition-colors">
                        <i className="fab fa-facebook-f fa-2x"></i>
                    </a>
                    <a href="https://twitter.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://instagram.com" className="text-pink-500 hover:text-pink-400 transition-colors">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                    <a href="https://youtube.com" className="text-red-600 hover:text-red-500 transition-colors">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                </div>
                
                <p className="text-base mb-4">&copy; 2024 YouTube Kids. All rights reserved.</p>
                <div className="flex justify-center space-x-6">
                    <a href="/contact" className="text-blue-900 hover:underline">Contact Us</a>
                    <span>|</span>
                    <a href="/privacy" className="text-blue-900 hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer> */}
        <Footer />
        </>
    );
};

export default Homepage;
