import React from 'react'
import logo from '../images/ytlogo.png'

function HomeNavbar() {
  return (
    <div>
      <header
    class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
    <div class="px-4">
        <div class="flex items-center justify-between">
            <div class="flex shrink-0">
                <a aria-current="page" class="flex items-center" href="/">
                    <img class="h-10 w-auto" src={logo} alt="YT Logo"/>
                    <p class="sr-only">Website Title</p>
                </a>
            </div>
            <div class="hidden md:flex md:items-center md:justify-center md:gap-5">
            <label
    class="mx-auto  bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-1 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
    for="search-bar">
    <input id="search-bar" placeholder="Search Rhymes..."
        class="px-3 rounded-md flex-1 outline-none bg-white" />
    <button
        class="w-full md:w-auto px-6 py-1.5 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
        
        <div class="relative">

            {/* <!-- Loading animation change opacity to display --> */}
            <div
                class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg class="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <div class="flex items-center transition-all opacity-1 valid:"><span
                    class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                </span>
            </div>

        </div>
        
    </button>
</label>
            </div>
            <div class="flex items-center justify-end gap-3">
                <a class="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                    href="/regtype">Sign up</a>
                <a class="inline-flex items-center justify-center rounded-xl bg-black/100 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    href="/login">Login</a>
            </div>
        </div>
    </div>
</header>
    </div>
  )
}

export default HomeNavbar
