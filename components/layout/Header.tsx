'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/button/Index';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50 -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="group relative">
            <div className="relative flex items-center space-x-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">Posta</span>
                <span className="text-xs text-gray-500 -mt-1">
                  Share your story
                </span>
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-colors group"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/posts/new"
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-colors group"
            >
              <span className="relative z-10">Write</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/sign-in"
              className="relative text-gray-600 hover:text-gray-900 font-medium transition-colors group"
            >
              <span className="relative z-10">Sign In</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/sign-up">
              <Button className="!w-auto">Get Started</Button>
            </Link>
          </nav>

          {/* Enhanced Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <nav className="flex flex-col space-y-4 py-4 border-t border-gray-100">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1 hover:bg-gray-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/posts/new"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1 hover:bg-gray-50 rounded-lg"
            >
              Write
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-2 py-1 hover:bg-gray-50 rounded-lg"
            >
              Sign In
            </Link>
            <Link href="/signup" className="block">
              <Button className="w-full">Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
