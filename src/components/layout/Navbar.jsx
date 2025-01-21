import { BellIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [notifications] = useState(3);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <header className={`${isLandingPage ? 'bg-transparent absolute w-full z-50' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className={`text-2xl font-bold ${isLandingPage ? 'text-white' : 'text-gray-900'}`}>
                EpiSense
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isLandingPage && (
              <button
                type="button"
                className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>
            )}
            <Link
              to="/login"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                isLandingPage
                  ? 'text-white hover:text-primary-100'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                isLandingPage
                  ? 'bg-white text-primary-600 hover:bg-primary-50'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}