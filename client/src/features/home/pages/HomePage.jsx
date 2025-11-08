import React from 'react';
import Hero from '../components/Hero' ; // <-- Import Hero
import FeaturedContent from '../components/FeaturedContent';
import LibrarySection from '../components/LibrarySection';

// The page now receives the 'onGradientChange' function as a prop
const HomePage = ({ onGradientChange }) => {
  return (
    <div>
      {/* The new Hero component now contains the text and the carousel */}
      <Hero onGradientChange={onGradientChange} />
      <FeaturedContent />
      <LibrarySection />
    </div>
  );
};

export default HomePage;