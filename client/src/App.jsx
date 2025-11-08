import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './features/home/pages/HomePage.jsx';
import Register from './features/auth/pages/Register.jsx';
import Navbar from './features/home/components/layout/Navbar.jsx';
import LibraryPage from './features/home/components/LibrarySection.jsx';
import JournalPage from './features/journal/pages/JournalPage.jsx';
import ProfilePage from './features/profile/pages/ProfilePage.jsx';


function App() {
  const [backgroundGradient, setBackgroundGradient] = useState(['from-blue-100', 'via-purple-100', 'to-indigo-200']);

  const handleGradientChange = (newGradient) => {
    if (newGradient && newGradient.length > 0) {
      setBackgroundGradient(newGradient);
    }
  };

  const gradientClasses = `bg-gradient-to-br ${backgroundGradient[0]} ${backgroundGradient[1]} ${backgroundGradient[2]}`;

  return (
    <div className={`min-h-screen font-poppins transition-all duration-700 ease-in-out ${gradientClasses}`}>
      <Navbar />
      {/* Add pb-12 (padding-bottom: 3rem) here */}
      <main className="flex-grow pb-12"> {/* <-- Added pb-12 */}
        <Routes>
          <Route path="/" element={<HomePage onGradientChange={handleGradientChange} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;