import React from 'react'
import logo from '../images/ytlogo.png'
import { Link } from 'react-router-dom'

function RegisterNavbar() {
  return (
    <div>
    <header
  class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
  <div class="px-4">
      <div class="flex items-center justify-between">
          <div class="flex shrink-0">
              <Link aria-current="page" class="flex items-center" to="/">
                  <img class="h-10 w-auto" src={logo} alt="YT Logo"/>
                  <p class="sr-only">Website Title</p>
              </Link>
          </div>
          <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
          Are You Ready to Create or Explore?
          </div>
          <div class="flex items-center justify-end gap-3">
            <Link to="#" onClick={() => window.history.back()} className="inline-flex items-center text-white-800 hover:text-blue-700">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Go Back</span>
            </Link>
            <Link class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            to="/login">Login</Link>
                    </div>
                </div>
            </div>
          </header>
            </div>
  )
}

export default RegisterNavbar
