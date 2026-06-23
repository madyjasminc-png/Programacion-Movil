import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import DiscoverHub from './pages/DiscoverHub';
import JourneyMap from './pages/JourneyMap';
import CommunityProfile from './pages/CommunityProfile';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const finishOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <Router>
      <div className="app-container">
        {showOnboarding ? (
          <Onboarding onFinish={finishOnboarding} />
        ) : (
          <>
            <div style={{ paddingBottom: '60px' }}> {/* Space for bottom nav */}
              <Routes>
                <Route path="/" element={<Navigate to="/hub" />} />
                <Route path="/hub" element={<DiscoverHub />} />
                <Route path="/journey" element={<JourneyMap />} />
                <Route path="/community" element={<CommunityProfile />} />
              </Routes>
            </div>
            <Navigation />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
