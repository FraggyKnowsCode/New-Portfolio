import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import HeroSection from './sections/HeroSection';
import WorkSection from './sections/WorkSection';
import AboutSection from './sections/AboutSection';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import { AnimatePresence } from 'framer-motion';

const HomePage: React.FC = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <WorkSection />
      <AboutSection />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      
      {!loading && (
        <Router>
          <div className="text-white min-h-screen font-sans antialiased relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;