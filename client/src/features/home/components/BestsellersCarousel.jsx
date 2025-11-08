import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BestsellersCarousel = ({ onGradientChange }) => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // State to manage transition

  useEffect(() => {
    // Fetch initial data
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/books/bestsellers');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch bestsellers. Is the backend server running?');
      } finally {
        setLoading(false);
      }
    };
    fetchBestsellers();
  }, []);

  useEffect(() => {
    // Update gradient when index or books change, if not transitioning
    if (books.length > 0 && onGradientChange && !isTransitioning) {
      const currentBook = books[currentIndex];
      const gradient = currentBook.gradientColors;
      onGradientChange(gradient);
    }
  }, [books, currentIndex, onGradientChange, isTransitioning]);

  // Function to handle changing books with animation
  const changeBook = (newIndex) => {
    if (isTransitioning) return; // Prevent changing during animation
    setIsTransitioning(true); // Start fading out
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const nextBook = () => {
    if (books.length === 0) return;
    const newIndex = (currentIndex + 1) % books.length;
    changeBook(newIndex);
  };

  const prevBook = () => {
    if (books.length === 0) return;
    const newIndex = (currentIndex - 1 + books.length) % books.length;
    changeBook(newIndex);
  };

  if (loading) return <p className="text-center">Loading bestsellers...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (books.length === 0) return <p className="text-center">No bestsellers found.</p>;

  const currentBook = books[currentIndex];

  return (
    <div className="relative w-full max-w-xs">
      <p className="text-center font-semibold text-gray-900 mb-2">BESTSELLERS</p>

      <img
        src={currentBook.coverUrl}
        alt={currentBook.title}
        className={`w-full h-auto object-cover rounded-2xl shadow-lg ring-1 ring-blue-600
                    transition-opacity duration-1000 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
      />

      <button
        onClick={prevBook}
        disabled={isTransitioning}
        className="absolute top-1/2 left-0 -translate-x-8 -translate-y-1/2 transition hover:opacity-75 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button
        onClick={nextBook}
        disabled={isTransitioning}
        className="absolute top-1/2 right-0 translate-x-8 -translate-y-1/2 transition hover:opacity-75 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default BestsellersCarousel;