import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import HeroSection from './sections/HeroSection';
import ImpactGridSection from './sections/ImpactGridSection';
import AboutSection from './sections/AboutSection';
import WorkSection from './sections/WorkSection';
import MLResearchSection from './sections/MLResearchSection';
import Footer from './components/Footer';
import ProjectsPage from './pages/ProjectsPage';
import MLResearchPage from './pages/MLResearchPage';
import { AnimatePresence } from 'framer-motion';

const HomePage: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <>
    <Header />
    <main>
      <HeroSection isLoading={isLoading} />
      <ImpactGridSection />
      <AboutSection />
      <WorkSection />
      <MLResearchSection />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time while assets and video preload underneath
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {loading && <Loader />}
      </AnimatePresence>
      
      <Router>
        <div className="text-white min-h-screen font-sans antialiased relative z-10">
          <Routes>
            <Route path="/" element={<HomePage isLoading={loading} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/ml-research" element={<MLResearchPage />} />
            <Route path="/research" element={<MLResearchPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;