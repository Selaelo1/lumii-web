// components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LogoGithub, 
  LogoTwitter, 
  LogoLinkedin,
  Earth,
  Certificate
} from '@carbon/icons-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Certificates', href: '/certificates' },
      { name: 'Study Tools', href: '/study-tools' },
      { name: 'Tracker', href: '/tracker' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ]
  };

  const socials = [
    { name: 'GitHub', icon: LogoGithub, href: 'https://github.com/lumii' },
    { name: 'Twitter', icon: LogoTwitter, href: 'https://twitter.com/lumii' },
    { name: 'LinkedIn', icon: LogoLinkedin, href: 'https://linkedin.com/company/lumii' },
  ];

  return (
    <footer className="bg-[#A24BF3] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Certificate size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Lumii</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Your certification vault + exam readiness. Track streaks, take mocks, and pass with confidence.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/70">
              © {currentYear} Lumii. Made with <Earth size={12} className="inline text-white mx-0.5" /> for learners.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm text-white/70 hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="text-sm text-white/70 hover:text-white">
                Terms
              </Link>
              <a href="mailto:support@lumii.app" className="text-sm text-white/70 hover:text-white">
                support@lumii.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;