import React from 'react';
import { User, Menu, Close } from '@carbon/icons-react';
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
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-violet to-purpleAccent bg-clip-text text-transparent">
              <h1 className="text-2xl font-bold">Lumii</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-charcoal hover:text-violet transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-charcoal hover:text-violet transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-charcoal hover:text-violet transition-colors">
              About
            </a>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button variant="secondary" size="sm">
                  <User size={16} className="mr-2" />
                  Profile
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="text-charcoal hover:text-violet transition-colors p-2"
            >
              {isMobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-charcoal hover:text-violet transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-charcoal hover:text-violet transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-charcoal hover:text-violet transition-colors">
              About
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="secondary" size="sm" className="w-full">
                Sign In
              </Button>
              <Button variant="primary" size="sm" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;