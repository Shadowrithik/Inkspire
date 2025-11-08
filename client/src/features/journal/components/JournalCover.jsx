import React, { useEffect } from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const JournalCover = ({ onOpenJournal }) => {
  const currentYear = new Date().getFullYear();

  // Add keydown listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onOpenJournal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenJournal]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] p-4">
      {/* The Book Cover */}
      <div
        className="relative w-full max-w-lg h-[650px] bg-parchment-DEFAULT rounded-lg shadow-2xl
                   flex flex-col items-center justify-center p-8 text-center
                   border border-parchment-dark
                   transform transition-transform duration-500 hover:scale-[1.01] cursor-pointer
                   group overflow-hidden"
        onClick={onOpenJournal}
      >
        {/* Paper Grain Texture */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23d6d1bd" fill-opacity="0.3"%3E%3Cpath d="M40 10L20 0 0 10v20l20 10 20-10V10zm-20 4.149L4 14.93v-9.67l16-7.85 16 7.85v9.67l-16-7.86zM20 25.85L4 18.06v9.67l16 7.85 16-7.85v-9.67l-16 7.86zm0-11.719L36 21.94v-9.67L20 4.42l-16 7.85v9.67l16-7.86z"/%3E%3C/g%3E%3C/svg%3E')`,
            backgroundSize: '40px 40px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        
        {/* Border / Page Edge Effect */}
        <div className="absolute inset-0 border-[1rem] border-parchment-light rounded-lg z-10"></div>

        {/* Title and Text */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-5xl font-serif italic text-ink-dark mb-2">
            My Journal
          </h1>
          <p className="text-xl text-ink-medium font-serif italic">
            Personal thoughts and reflections
          </p>
          <div className="w-16 h-0.5 bg-ink-medium my-4"></div>
          <p className="text-lg text-ink-medium font-poppins">
            {currentYear}
          </p>
        </div>

        <div className="flex items-center gap-0.5">
          <p className="text-lg">Click to Open</p>
          <BookOpenIcon className="h-6 w-6 text-ink-dark" />
        </div>
      </div>
    </div>
  );
};

export default JournalCover;
