import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({ onEnquireClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-dark/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-primary-dark/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="flex items-center space-x-2">
              <div className="border border-accent p-1 rounded-sm bg-primary-dark/50">
                <span className="text-white font-extrabold text-xl tracking-tighter">one</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold tracking-widest leading-none">CODENAME</span>
                <span className="text-accent text-[10px] tracking-widest leading-none uppercase font-semibold">CHEMBUR</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About Project', id: 'about' },
              { label: 'Connectivity', id: 'connectivity' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Amenities', id: 'amenities' },
              { label: 'Floor Plans', id: 'floorplans' },
              { label: 'Developer', id: 'developer' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-beige-dark hover:text-white transition-colors duration-200 text-xs font-medium uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-primary hover:bg-primary-light text-beige border border-accent/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-beige hover:text-white hover:bg-primary-light/35 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary-dark border-t border-primary-light/20 px-4 pt-2 pb-4 space-y-1">
          {[
            { label: 'Home', id: 'home' },
            { label: 'About Project', id: 'about' },
            { label: 'Connectivity', id: 'connectivity' },
            { label: 'Gallery', id: 'gallery' },
            { label: 'Amenities', id: 'amenities' },
            { label: 'Floor Plans', id: 'floorplans' },
            { label: 'Developer', id: 'developer' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left px-3 py-2 text-beige-dark hover:text-white hover:bg-primary-light/20 text-sm font-semibold uppercase tracking-wider rounded-md"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-primary-light/20 mt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavClick('contact');
              }}
              className="w-full bg-primary hover:bg-primary-light text-beige py-3 text-center text-xs font-bold uppercase tracking-widest rounded-md"
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
