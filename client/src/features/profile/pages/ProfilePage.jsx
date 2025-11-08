import React from 'react';
import { BookOpenIcon, BookmarkIcon, HeartIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/solid';

const ProfilePage = () => {
  const gradientColors = ['from-sky-100', 'via-indigo-100', 'to-cyan-200'];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientColors.join(' ')} font-poppins text-gray-800 transition-all duration-700 ease-in-out`}>
      {/* Header Section */}
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src="/images/profile/PFP image.png"
            alt="User Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-200"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Rithik kumar S</h1>
            <p className="text-gray-600 italic max-w-lg">
              “Words are not just ink on paper — they are the soul’s fingerprints.”
            </p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md text-center">
            <BookOpenIcon className="w-8 h-8 mx-auto text-indigo-600" />
            <h3 className="font-semibold mt-2 text-lg">Books Read</h3>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md text-center">
            <HeartIcon className="w-8 h-8 mx-auto text-pink-500" />
            <h3 className="font-semibold mt-2 text-lg">Liked Books</h3>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md text-center">
            <BookmarkIcon className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold mt-2 text-lg">Bookmarked</h3>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md text-center">
            <StarIcon className="w-8 h-8 mx-auto text-yellow-500" />
            <h3 className="font-semibold mt-2 text-lg">Pages Read</h3>
            <p className="text-2xl font-bold text-gray-900">4,203</p>
          </div>
        </div>

        {/* Liked Books */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HeartIcon className="w-6 h-6 text-pink-500" /> Liked Books
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[150px] bg-white/80 rounded-xl shadow-md p-3 hover:scale-105 transition">
                <img
                  src={`https://picsum.photos/200/300?random=${i}`}
                  alt="Book"
                  className="rounded-lg mb-2"
                />
                <h4 className="font-medium text-gray-700 truncate">Book Title {i + 1}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarked Books */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookmarkIcon className="w-6 h-6 text-blue-600" /> Bookmarked Books
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[150px] bg-white/80 rounded-xl shadow-md p-3 hover:scale-105 transition">
                <img
                  src={`https://picsum.photos/200/300?random=${i + 10}`}
                  alt="Book"
                  className="rounded-lg mb-2"
                />
                <h4 className="font-medium text-gray-700 truncate">Bookmarked {i + 1}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-indigo-600" /> Achievements
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>🌟 Reached 1000 pages milestone</li>
            <li>🔥 Completed “Soul of Ink” Collection</li>
            <li>💫 Gained Inkspirit Silver Rank</li>
          </ul>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-2xl p-8 text-center shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Unlock Inkspirit Premium ✨</h3>
          <p className="mb-4 text-indigo-100">Get early access to exclusive books, AI-powered insights, and limitless journals.</p>
          <button className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-lg hover:bg-indigo-100 transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
