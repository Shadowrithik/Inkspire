import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

// Static data (representing personalized books for now)
const libraryBooks = [
  { id: 1, title: "You've reached Sam", coverUrl: "/images/covers/you-reached-sam.jpg" },
  { id: 2, title: "Metamorphosis", coverUrl: "/images/covers/metamorphosis.jpg" },
  { id: 3, title: "You Can", coverUrl: "/images/covers/you-can.jpg" },
  { id: 4, title: "Art of War", coverUrl: "/images/covers/art-of-war.jpg" },
  { id: 5, title: "Crime and Punishment", coverUrl: "/images/covers/crime-punishment.jpg" },
  { id: 6, title: "Pride and Prejudice", coverUrl: "/images/covers/pride-and.jpg" },
  { id: 7, title: "1984", coverUrl: "/images/covers/1984.jpg" },
  { id: 8, title: "Demons", coverUrl: "/images/covers/demons.jpg" },
  { id: 9, title: "To Kill a Mockingbird", coverUrl: "/images/covers/to-kill.jpg" },
  { id: 10, title: "Fourth Wing", coverUrl: "/images/covers/fourth-wing.jpg" },
  { id: 11, title: "Don Quixote", coverUrl: "/images/covers/don-quixote.jpg" },
  { id: 12, title: "The Count of Monte Cristo", coverUrl: "/images/covers/monte-cristo.jpg" },
  { id: 13, title: "The Idiot", coverUrl: "/images/covers/the-idiot.jpg" },
  { id: 14, title: "Twisted Love", coverUrl: "/images/covers/twisted-love.jpg" },
  { id: 15, title: "Twisted Hate", coverUrl: "/images/covers/twisted-hate.jpg" },
  { id: 16, title: "White Nights", coverUrl: "/images/covers/white-nights.jpg" },
  { id: 17, title: "The Great Gatsby", coverUrl: "/images/covers/great-gatsby.jpg" }
];

const BOOKS_PER_PAGE = 4; // Show 4 books at a time

const LibrarySection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const totalBooks = libraryBooks.length;
  const canGoNext = startIndex + BOOKS_PER_PAGE < totalBooks;
  const canGoPrev = startIndex > 0;

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(startIndex + BOOKS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex(startIndex - BOOKS_PER_PAGE);
    }
  };

  // Get the slice of books to display
  const visibleBooks = libraryBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 mt-12 mb-12">
      <div className="flex justify-between items-center mb-6">
        {/* Title is now a Link */}
        <Link to="/library">
          <h2 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            Your Library ›
          </h2>
        </Link>
        {/* Navigation Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition ${
              canGoPrev
                ? 'bg-white/70 hover:bg-white text-gray-600'
                : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Previous books"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition ${
              canGoNext
                ? 'bg-white/70 hover:bg-white text-gray-600'
                : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Next books"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
      {/* Books Grid (now showing only visibleBooks) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {visibleBooks.map(book => (
          <div key={book.id} className="text-center group">
            <div className="relative">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full rounded-lg shadow-lg aspect-[2/3] object-cover ring-1 ring-blue-600 transition-transform duration-300 group-hover:scale-105"
              />
              {/* Like Button */}
              <button
                className="absolute top-2 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Like this book"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </button>
              {/* Bookmark Button */}
              <button
                className="absolute top-11 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-500 hover:text-blue-500 hover:bg-white transition opacity-0 group-hover:opacity-100 duration-300"
                aria-label="Bookmark this book"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            <h3 className="mt-3 font-semibold text-gray-700">{book.title}</h3>
          </div>
        ))}
        {/* Add placeholders if less than 4 books are visible to maintain layout */}
        {visibleBooks.length < BOOKS_PER_PAGE && Array(BOOKS_PER_PAGE - visibleBooks.length).fill(null).map((_, index) => (
          <div key={`placeholder-${index}`} className="aspect-[2/3]"></div> // Empty div to keep grid spacing
        ))}
      </div>
    </section>
  );
};

export default LibrarySection;