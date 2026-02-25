// components/layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Dashboard, 
  Certificate, 
  ChartLine, 
  Pen,
  Group,
  Settings,
  User,
  Close,
  Bookmark,
  Calendar,
  Time
} from '@carbon/icons-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
    { name: 'Certificates', href: '/certificates', icon: Certificate },
    { name: 'Tracker', href: '/tracker', icon: ChartLine },
    { name: 'Study Tools', href: '/study-tools', icon: Pen },
    { name: 'Groups', href: '/groups', icon: Group },
  ];

  const quickLinks = [
    { name: 'Upcoming Exams', icon: Calendar, count: 3 },
    { name: 'Study Goals', icon: Settings, count: 2 },
    { name: 'Recent Sessions', icon: Time, count: 5 },
    { name: 'Saved Resources', icon: Bookmark, count: 12 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-purple-100/50
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header - Mobile only */}
          <div className="flex items-center justify-between p-4 border-b border-purple-100/50 lg:hidden">
            <span className="font-semibold text-gray-900">Menu</span>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <Close size={20} className="text-gray-600" />
            </button>
          </div>

          {/* User Info - Mobile only */}
          <div className="p-4 border-b border-purple-100/50 lg:hidden">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <User size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Alex Chen</p>
                <p className="text-xs text-gray-500">7 day streak 🔥</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => onClose()}
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all
                      ${isActive(item.href)
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.name}</span>
                    
                    {/* Active Indicator */}
                    {isActive(item.href) && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 px-3">
              <div className="border-t border-purple-100/50" />
            </div>

            {/* Quick Links */}
            <div className="px-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">
                Quick Access
              </p>
              <div className="space-y-1">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.name}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={18} />
                        <span>{link.name}</span>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                        {link.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Study Progress */}
            <div className="px-3 mt-6">
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-700">Weekly Goal</span>
                  <span className="text-xs text-purple-600">4/5 days</span>
                </div>
                <div className="h-1.5 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-purple-600 rounded-full" />
                </div>
                <p className="text-xs text-purple-600 mt-2">🔥 1 day to goal</p>
              </div>
            </div>
          </nav>

          {/* Footer Links */}
          <div className="p-4 border-t border-purple-100/50">
            <Link
              to="/profile"
              onClick={() => onClose()}
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all"
            >
              <User size={20} />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <Link
              to="/settings"
              onClick={() => onClose()}
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-all"
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </Link>
            
            {/* Version */}
            <p className="text-xs text-gray-400 text-center mt-4">Lumii v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;