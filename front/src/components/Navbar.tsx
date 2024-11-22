import React from 'react';
import { Film, Search, Bell, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Film className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              CineClub
            </span>
          </div>
          
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clubs, movies, or shows..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-800">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-gray-800">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}