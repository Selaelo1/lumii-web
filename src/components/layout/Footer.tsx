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
  Information,
  Blog as BlogIcon,
  Phone,
  Help,
  User,
  CaretRight
} from '@carbon/icons-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    product: [
      { name: 'Dashboard', href: '/dashboard', description: 'Track your progress' },
      { name: 'Certificates', href: '/certificates', description: 'Manage certifications' },
      { name: 'Study Tools', href: '/study-tools', description: 'Resources & materials' },
      { name: 'Tracker', href: '/tracker', description: 'Daily study logs' },
      { name: 'Groups', href: '/groups', description: 'Study with peers' },
    ],
    company: [
      { name: 'About', href: '/about', description: 'Our story' },
      { name: 'Blog', href: '/blog', description: 'Latest updates' },
      { name: 'Contact', href: '/contact', description: 'Get in touch' },
      { name: 'Careers', href: '/careers', description: 'Join our team' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy', description: 'Your data rights' },
      { name: 'Terms of Service', href: '/terms', description: 'Terms & conditions' },
      { name: 'Cookie Policy', href: '/cookies', description: 'Cookie preferences' },
    ],
    resources: [
      { name: 'Help Center', href: '/help', description: 'Guides & tutorials', icon: Help },
      { name: 'Community', href: '/community', description: 'Forums & discussions', icon: User },
      { name: 'FAQs', href: '/faqs', description: 'Common questions', icon: Information },
      { name: 'Support', href: '/support', description: 'Get assistance', icon: Email },
    ]
  };

  const socials = [
    { name: 'GitHub', icon: LogoGithub, href: 'https://github.com/lumii', username: '@lumii' },
    { name: 'Twitter', icon: LogoTwitter, href: 'https://twitter.com/lumii', username: '@lumii' },
    { name: 'LinkedIn', icon: LogoLinkedin, href: 'https://linkedin.com/company/lumii', username: 'Lumii' },
  ];

  const contactInfo = [
    { icon: Email, text: 'support@lumii.app', href: 'mailto:support@lumii.app', label: 'Email us' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567', label: 'Call us' },
  ];

  const quickLinks = [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-700 to-purple-900 text-white mt-auto relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12 text-purple-800"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column - 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Certificate size={24} className="text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Lumii</span>
                <span className="block text-xs text-white/60 font-medium tracking-wide">Learn Smarter, Achieve More</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-white/80 leading-relaxed max-w-md">
              Your certification vault + exam readiness. Track streaks, take mocks, 
              and pass with confidence. Join thousands of learners mastering their 
              professional certifications with Lumii.
            </p>
            
            {/* Stats Badge */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-purple-600 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">👤</span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/70">
                <span className="font-bold text-white">10,000+</span> learners
              </span>
            </div>

            {/* Contact Info with hover effects */}
            <div className="space-y-3 pt-2">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-sm text-white/70 hover:text-white transition-all group"
                  aria-label={item.label}
                >
                  <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <item.icon size={16} />
                  </span>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links with hover effects */}
            <div className="flex items-center space-x-3 pt-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.name}
                >
                  <div className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:rotate-3 duration-200">
                    <social.icon size={20} className="text-white" />
                  </div>
                  {/* Tooltip on hover */}
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns - 8 columns on large screens */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product Column */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-purple-400 mr-2"></span>
                Product
              </h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="group flex items-start space-x-2 text-sm"
                    >
                      <CaretRight size={14} className="text-purple-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <div>
                        <span className="text-white/70 group-hover:text-white transition-colors block">
                          {item.name}
                        </span>
                        <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-purple-400 mr-2"></span>
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="group flex items-start space-x-2 text-sm"
                    >
                      <CaretRight size={14} className="text-purple-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <div>
                        <span className="text-white/70 group-hover:text-white transition-colors block">
                          {item.name}
                        </span>
                        <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-purple-400 mr-2"></span>
                Resources
              </h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="group flex items-start space-x-2 text-sm"
                    >
                      <item.icon size={14} className="text-purple-300 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <span className="text-white/70 group-hover:text-white transition-colors block">
                          {item.name}
                        </span>
                        <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-0.5 bg-purple-400 mr-2"></span>
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="group flex items-start space-x-2 text-sm"
                    >
                      <CaretRight size={14} className="text-purple-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                      <div>
                        <span className="text-white/70 group-hover:text-white transition-colors block">
                          {item.name}
                        </span>
                        <span className="text-xs text-white/40 group-hover:text-white/60 transition-colors">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Stay updated</h4>
              <p className="text-sm text-white/60">Get the latest news and study tips</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-white text-purple-700 rounded-r-lg font-medium hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-white/70">
                © {currentYear} Lumii. All rights reserved.
              </p>
              <p className="text-xs text-white/40 flex items-center justify-center lg:justify-start mt-1">
                Made with <Earth size={12} className="inline text-white mx-1" /> for learners worldwide
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs font-medium text-white/90">🔒</span>
                <span className="text-xs text-white/70">SSL Secure</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs font-medium text-white/90">⭐</span>
                <span className="text-xs text-white/70">4.9/5</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
                <span className="text-xs font-medium text-white/90">🛡️</span>
                <span className="text-xs text-white/70">GDPR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;