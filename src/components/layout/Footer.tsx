// components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LogoGithub, 
  LogoTwitter, 
  LogoLinkedin,
  Earth,
  Certificate,
  Email,
  Blog as BlogIcon,
  Phone
} from '@carbon/icons-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Certificates', href: '/certificates' },
      { name: 'Study Tools', href: '/study-tools' },
      { name: 'Tracker', href: '/tracker' },
      { name: 'Groups', href: '/groups' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Support', href: '/support' },
    ]
  };

  const socials = [
    { name: 'GitHub', icon: LogoGithub, href: 'https://github.com/lumii' },
    { name: 'Twitter', icon: LogoTwitter, href: 'https://twitter.com/lumii' },
    { name: 'LinkedIn', icon: LogoLinkedin, href: 'https://linkedin.com/company/lumii' },
    { name: 'Email', icon: Email, href: 'mailto:support@lumii.app' },
  ];

  const contactInfo = [
    { icon: Email, text: 'support@lumii.app', href: 'mailto:support@lumii.app' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-700 to-purple-900 text-white mt-auto">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-10">
        <svg
          className="relative block w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column - spans 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Certificate size={20} className="text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Lumii</span>
                <span className="block text-xs text-white/60">Learn Smarter, Achieve More</span>
              </div>
            </div>
            
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Your certification vault + exam readiness. Track streaks, take mocks, 
              and pass with confidence. Join thousands of learners mastering their 
              certifications with Lumii.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <item.icon size={16} />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="text-white" />
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
                    className="text-sm text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
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
                    className="text-sm text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links Row (for mobile) */}
        <div className="mt-8 lg:hidden">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Legal
          </h3>
          <div className="flex flex-wrap gap-4">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <p className="text-sm text-white/70">
                © {currentYear} Lumii. All rights reserved.
              </p>
              <p className="text-xs text-white/50 flex items-center">
                Made with <Earth size={12} className="inline text-white mx-1" /> for learners worldwide
              </p>
            </div>
            
            {/* Legal Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs text-white/80">🔒 SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs text-white/80">⭐ 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Additional Links Row */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-white/40">
            <span>Accessibility</span>
            <span>•</span>
            <span>Sitemap</span>
            <span>•</span>
            <span>Cookie Preferences</span>
            <span>•</span>
            <span>Do Not Sell My Info</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;