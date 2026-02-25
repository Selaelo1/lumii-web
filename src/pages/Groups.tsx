// pages/Groups.tsx
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { 
  Group, 
  Add, 
  Search, 
  Book,
  Trophy,
  Chat,
  User,
  Time,
  
} from '@carbon/icons-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  certificates: string[];
  isPrivate: boolean;
  coverImage?: string;
  createdAt: Date;
  activeToday: number;
  studyStreak: number;
}

const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data - replace with real data from API
  const groups: StudyGroup[] = [
    {
      id: '1',
      name: 'AWS Certified Solutions Architects',
      description: 'A community for aspiring AWS Solutions Architects. Share resources, tips, and study together!',
      members: 234,
      maxMembers: 500,
      certificates: ['AWS Solutions Architect'],
      isPrivate: false,
      createdAt: new Date('2024-01-15'),
      activeToday: 45,
      studyStreak: 15
    },
    {
      id: '2',
      name: 'Google Cloud Professional',
      description: 'Study group for Google Cloud certifications. Weekly study sessions and mock exams.',
      members: 156,
      maxMembers: 300,
      certificates: ['Google Cloud Professional'],
      isPrivate: true,
      createdAt: new Date('2024-02-01'),
      activeToday: 28,
      studyStreak: 8
    },
    {
      id: '3',
      name: 'Python for Data Science',
      description: 'Learn Python and Data Science together. From basics to advanced concepts.',
      members: 89,
      maxMembers: 200,
      certificates: ['Python Data Science'],
      isPrivate: false,
      createdAt: new Date('2024-03-10'),
      activeToday: 15,
      studyStreak: 5
    },
    {
      id: '4',
      name: 'CISSP Study Group',
      description: 'Preparing for CISSP? Join us for daily discussions and practice questions.',
      members: 67,
      maxMembers: 150,
      certificates: ['CISSP'],
      isPrivate: true,
      createdAt: new Date('2024-02-20'),
      activeToday: 12,
      studyStreak: 12
    },
  ];

  const categories = [
    { id: 'all', name: 'All Groups', icon: Group },
    { id: 'aws', name: 'AWS', icon: Book },
    { id: 'google', name: 'Google Cloud', icon: Book },
    { id: 'python', name: 'Python', icon: Book },
    { id: 'security', name: 'Security', icon: Book },
    { id: 'data-science', name: 'Data Science', icon: Book },
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
          <p className="text-gray-600 mt-1">Learn together, grow together. Join a study group today!</p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
        >
          <Add size={18} />
          <span>Create Group</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Group size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-500">Active Groups</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-xs text-gray-500">Total Members</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Chat size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500">Discussions Today</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search groups by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon size={16} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} variant="interactive" className="overflow-hidden">
            {/* Cover Image Placeholder */}
            <div className="h-24 bg-gradient-to-r from-purple-600 to-purple-400 relative">
              {group.isPrivate && (
                <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full">
                  <Time size={14} className="text-purple-600" />
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Group Icon */}
              <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center -mt-10 mb-4">
                <Group size={24} className="text-purple-600" />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">{group.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{group.description}</p>

              {/* Certificates */}
              <div className="flex flex-wrap gap-2 mb-4">
                {group.certificates.map((cert) => (
                  <span key={cert} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{group.members}</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-green-600">{group.activeToday}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-orange-600">{group.studyStreak}</p>
                  <p className="text-xs text-gray-500">Streak</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Capacity</span>
                  <span className="text-gray-700">{Math.round((group.members / group.maxMembers) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                  />
                </div>
              </div>

              {/* Join Button */}
              <Button 
                variant="secondary" 
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                {group.isPrivate ? 'Request to Join' : 'Join Group'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Group Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a Study Group"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-purple-600 hover:bg-purple-700">
              Create Group
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Group Name"
            placeholder="e.g., AWS Certified Solutions Architects"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Describe what your group is about..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Focus Certificates</label>
            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
              <option value="aws">AWS Solutions Architect</option>
              <option value="google">Google Cloud Professional</option>
              <option value="python">Python Data Science</option>
              <option value="cissp">CISSP</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Members</label>
              <input
                type="number"
                placeholder="50"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Type</label>
              <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="rules" className="rounded border-gray-300 text-purple-600" />
            <label htmlFor="rules" className="text-sm text-gray-600">
              I agree to moderate this group and follow community guidelines
            </label>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Groups;