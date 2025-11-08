// client/src/features/home/components/Hero.jsx
import React from 'react';
import BestsellersCarousel from './BestsellersCarousel';

const Hero = ({ onGradientChange }) => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:w-1/2 text-center md:text-left">
        {/* Ensure NO dark/sepia classes here */}
        <h2 className="text-4xl md:text-5xl  text-gray-800 leading-tight">
          Your Digital Library, Reimagined, <br/>
          <span className="text-blue-600 font-semibold">Inkspire</span> – Where Stories Come to Life.
        </h2>
        {/* Ensure NO dark/sepia classes here */}
        <p className="mt-4 text-gray-900">
          <b className='mt-4  text-gray-900 font-bold'>Read📖. Write✒️. Inspire.✨</b> Welcome to Inkspire, a next-gen digital library where books feel real. Flip through pages with lifelike animations, explore bestsellers, and personalize your reading experience.
        </p>
        <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Start Reading ›
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <BestsellersCarousel onGradientChange={onGradientChange} />
      </div>
    </section>
  );
};

export default Hero;