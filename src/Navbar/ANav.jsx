import { useState } from 'react';
import logo from '../images/ytlogo.png';
import ProfileDrop from './ProfileDrop';
import { Link } from 'react-router-dom';
import CProfileDrop from './CProfileDrop';
import AProfileDrop from './AProfileDrop';

const ANav = () => {
    return (
        <nav className="bg-white border-b">
            <div className="flex items-center space-x-8 py-2 px-4 max-w-screen-xl mx-auto md:px-8">
                <div className="flex-none lg:flex-initial">
                    <Link to="/dashboard">
                        <img
                            src={logo}
                            width={50}
                            height={50}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-between">

<div class="relative">
  <label for="Search" class="sr-only"> Search </label>
</div>
                    <div className="flex z-50 items-center space-x-2 sm:space-x-6">
                        <AProfileDrop />
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ANav;
