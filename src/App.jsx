import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ExperiencePage from './pages/ExperiencePage';
import AboutPage from './pages/AboutPage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';
import AdminPortal from './pages/AdminPortal';

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPortal />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </PortfolioProvider>
    </ThemeProvider>
  );
}
