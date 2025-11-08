import React, { useState, useEffect } from 'react';

const quotes = [
    { text: "Peace is not absence of war. It is the absence of need to be seen as right.", author: "Rithik kumar S" },
    { text: "Books are a uniquely portable magic.", author: "Stephen King" },
    { text: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.", author: "George R.R. Martin" },
    { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
    { text: "So many books, so little time.", author: "Frank Zappa" },
    { text: "A heart that's hard and heavy was once blown away.", author: "Rithik kumar S" },
    { text: "I saw her from afar, like dreams behind a bar, her beauty burned my soul and left a scar.", author: "Rithik kumar S" }
];

const FeaturedContent = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 mt-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1: Removed dark/sepia classes */}
        <div className="md:col-span-2 bg-white/40 backdrop-blur-xl p-8 rounded-2xl ring-1 ring-blue-600 shadow-lg flex flex-col justify-between">
          <div>
            <p className="text-2xl text-gray-800 italic">"{currentQuote.text}"</p>
            <p className="text-right font-semibold text-gray-900 mt-2">-{currentQuote.author}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Journaling 🪄✨</h3>
            <p className="mt-2 text-gray-600">
              Capture your thoughts 💭 and reflections 😊 in our beautiful ✨, intuitive journal interface 🧾 that feels like writing on paper 📝. Express yourself freely, track your journey, and find clarity in every word you write. Let your ideas 💡 flow effortlessly, just like ink on a page 📖.
            </p>
          </div>
          <div className="flex justify-end items-center mt-6">
              {/* Removed dark/sepia classes from span if any were added */}
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Write Now ›
              </button>
          </div>
        </div>
        {/* Card 2: Removed dark/sepia classes */}
        <div className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl ring-1 ring-blue-600 shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Your Reading Journey</h3>
            <div className="flex items-center justify-center">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            {/* Stat Boxes: Removed dark/sepia classes */}
            <div className="bg-gray-100/70 p-4 rounded-lg ring-1 ring-blue-400">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-500">Books Read</p>
            </div>
            <div className="bg-gray-100/70 p-4 rounded-lg ring-1 ring-blue-400">
              <p className="text-2xl font-bold text-blue-600">3000</p>
              <p className="text-sm text-gray-500">Pages Read</p>
            </div>
            <div className="bg-gray-100/70 p-4 rounded-lg ring-1 ring-blue-400">
              <p className="text-2xl font-bold text-blue-600">86</p>
              <p className="text-sm text-gray-500">Hours Read</p>
            </div>
            <div className="bg-gray-100/70 p-4 rounded-lg ring-1 ring-blue-400">
              {/* Note: Kept text-yellow-500 as it might be intentional */}
              <p className="text-2xl font-bold text-yellow-500">28</p>
              <p className="text-sm text-gray-500">Days Streak</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;