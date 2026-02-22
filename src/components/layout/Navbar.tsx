// components/layout/Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, Close, } from '@carbon/icons-react';
import Button from '../ui/Button';

interface NavbarProps {
  isAuthenticated?: boolean;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isAuthenticated = false, 
  onMenuToggle,
  isMobileMenuOpen = false 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      sticky top-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100/50' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Now with proper lockup */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center transform transition-all group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-purple-200">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            </div>
            
            {/* Wordmark */}
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent leading-tight">
                Lumii
              </span>
              <span className="text-[10px] text-purple-400 font-medium tracking-wider hidden sm:block">
                CERTIFICATION VAULT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on home page, shown on dashboard */}
          {!isHomePage && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="text-gray-700 hover:text-purple-700 transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-purple-700 transition-colors">
                Pricing
              </Link>
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm" className="border-purple-200 hover:border-purple-300">
                    Dashboard
                  </Button>
                </Link>
                <button className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center hover:bg-purple-200 transition-colors">
                  <User size={20} className="text-purple-700" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="text-gray-700 hover:text-purple-700 hover:bg-purple-50/50"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md shadow-purple-200 hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Start Tracking
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2.5 text-gray-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-purple-100/50 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-3">
              {!isHomePage && (
                <>
                  <Link to="/features" className="block px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-xl transition-all">
                    Features
                  </Link>
                  <Link to="/pricing" className="block px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-xl transition-all">
                    Pricing
                  </Link>
                </>
              )}
              
              <div className="border-t border-purple-100/50 my-4"></div>
              
              {isAuthenticated ? (
                <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:text-purple-700 hover:bg-purple-50/50 rounded-xl transition-all">
                  Dashboard
                </Link>
              ) : (
                <div className="space-y-2 px-4">
                  <Link to="/login">
                    <Button variant="secondary" size="lg" className="w-full justify-center">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="lg" className="w-full justify-center bg-gradient-to-r from-purple-600 to-purple-500">
                      Start Tracking
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;