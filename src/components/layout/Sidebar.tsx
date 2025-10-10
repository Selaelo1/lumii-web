import React from 'react';
import { 
  Dashboard, 
  Certificate, 
  Analytics, 
  Calendar, 
  Settings, 
  User,
  ChevronRight
} from '@carbon/icons-react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'dashboard', onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', icon: Dashboard, label: 'Dashboard' },
    { id: 'certifications', icon: Certificate, label: 'Certifications' },
    { id: 'analytics', icon: Analytics, label: 'Analytics' },
    { id: 'study-plan', icon: Calendar, label: 'Study Plan' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="bg-gradient-to-r from-violet to-purpleAccent bg-clip-text text-transparent">
          <h2 className="text-2xl font-bold">Lumii</h2>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-violet text-white shadow-sm' 
                  : 'text-charcoal hover:bg-offWhite hover:text-violet'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} 
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;