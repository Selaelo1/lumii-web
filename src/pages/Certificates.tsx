// pages/Certificates.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCertificates } from '../hooks/useCertificates';
import CertificateGrid from '../components/dashboard/CertificateGrid';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Card from '../components/ui/Card';
import { 
  Search, 
  Filter, 
  Add, 
  ArrowDown, 
  ArrowUp,
  Certificate as CertificateIcon,
  Time,
  Checkmark,
  Warning,
  Grid,
  List,
  Download,
  Share
} from '@carbon/icons-react';

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'progress' | 'startDate' | 'examDate';
type SortOrder = 'asc' | 'desc';

const Certificates: React.FC = () => {
  const { user } = useAuth();
  const { certificates, isLoading, addCertificate, updateProgress } = useCertificates(user?.id);
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Stats
  const stats = {
    total: certificates.length,
    completed: certificates.filter(c => c.status === 'completed').length,
    inProgress: certificates.filter(c => c.status === 'in-progress').length,
    examReady: certificates.filter(c => c.status === 'exam-ready').length,
    totalHours: certificates.reduce((acc, c) => acc + c.totalHours, 0),
    completedHours: certificates.reduce((acc, c) => acc + c.completedHours, 0)
  };

  // Filter and sort certificates
  const filteredCertificates = certificates
    .filter(cert => {
      // Search filter
      const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
      
      // Provider filter
      const matchesProvider = providerFilter === 'all' || cert.provider === providerFilter;
      
      return matchesSearch && matchesStatus && matchesProvider;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case 'examDate':
          if (!a.examDate && !b.examDate) comparison = 0;
          else if (!a.examDate) comparison = 1;
          else if (!b.examDate) comparison = -1;
          else comparison = new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Toggle sort
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Get unique providers for filter
  const providers = ['all', ...new Set(certificates.map(c => c.provider))];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all your learning certifications
          </p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
        >
          <Add size={18} />
          <span>Add Certificate</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500">Total</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-xs text-gray-500">Completed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
          <p className="text-xs text-gray-500">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.examReady}</p>
          <p className="text-xs text-gray-500">Exam Ready</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
          <p className="text-xs text-gray-500">Total Hours</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {Math.round((stats.completedHours / stats.totalHours) * 100) || 0}%
          </p>
          <p className="text-xs text-gray-500">Overall</p>
        </Card>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search certificates by name or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="exam-ready">Exam Ready</option>
              <option value="completed">Completed</option>
              <option value="not-started">Not Started</option>
            </select>

            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 bg-white"
            >
              {providers.map(provider => (
                <option key={provider} value={provider}>
                  {provider === 'all' ? 'All Providers' : provider.charAt(0).toUpperCase() + provider.slice(1)}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">Sort by:</span>
          <button
            onClick={() => toggleSort('name')}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              sortField === 'name' ? 'text-purple-600 font-medium' : 'text-gray-600'
            }`}
          >
            <span>Name</span>
            {sortField === 'name' && (
              sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
            )}
          </button>
          <button
            onClick={() => toggleSort('progress')}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              sortField === 'progress' ? 'text-purple-600 font-medium' : 'text-gray-600'
            }`}
          >
            <span>Progress</span>
            {sortField === 'progress' && (
              sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
            )}
          </button>
          <button
            onClick={() => toggleSort('startDate')}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              sortField === 'startDate' ? 'text-purple-600 font-medium' : 'text-gray-600'
            }`}
          >
            <span>Start Date</span>
            {sortField === 'startDate' && (
              sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
            )}
          </button>
          <button
            onClick={() => toggleSort('examDate')}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              sortField === 'examDate' ? 'text-purple-600 font-medium' : 'text-gray-600'
            }`}
          >
            <span>Exam Date</span>
            {sortField === 'examDate' && (
              sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Showing {filteredCertificates.length} of {certificates.length} certificates
        </p>
        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-purple-600 transition-colors">
            <Download size={18} />
          </button>
          <button className="text-gray-500 hover:text-purple-600 transition-colors">
            <Share size={18} />
          </button>
        </div>
      </div>

      {/* Certificates Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCertificates.length > 0 ? (
        viewMode === 'grid' ? (
          <CertificateGrid certificates={filteredCertificates} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                          <CertificateIcon size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                          <div className="text-xs text-gray-500">Started {new Date(cert.startDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">{cert.provider}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit space-x-1 ${
                        cert.status === 'completed' ? 'text-green-600 bg-green-100' :
                        cert.status === 'exam-ready' ? 'text-purple-600 bg-purple-100' :
                        cert.status === 'in-progress' ? 'text-blue-600 bg-blue-100' :
                        'text-gray-600 bg-gray-100'
                      }`}>
                        {cert.status === 'completed' && <Checkmark size={12} />}
                        {cert.status === 'exam-ready' && <Warning size={12} />}
                        {cert.status === 'in-progress' && <Time size={12} />}
                        <span>{cert.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{cert.progress}%</span>
                          <span className="text-gray-400">{cert.completedHours}/{cert.totalHours}h</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cert.examDate ? new Date(cert.examDate).toLocaleDateString() : 'Not set'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-700 mr-3">Edit</button>
                      <button className="text-gray-400 hover:text-gray-600">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CertificateIcon size={32} className="text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first certificate</p>
          <Button 
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Add size={18} className="mr-2" />
            Add Certificate
          </Button>
        </div>
      )}

      {/* Add Certificate Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Certificate"
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-purple-600 hover:bg-purple-700">
              Add Certificate
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Certificate Name"
            placeholder="e.g., AWS Certified Solutions Architect"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200">
                <option value="coursera">Coursera</option>
                <option value="udemy">Udemy</option>
                <option value="edx">edX</option>
                <option value="aws">AWS</option>
                <option value="google">Google</option>
                <option value="microsoft">Microsoft</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <Input
              label="Total Hours"
              type="number"
              placeholder="e.g., 120"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              required
            />
            <Input
              label="Target Date (Optional)"
              type="date"
            />
          </div>

          <Input
            label="Exam Date (Optional)"
            type="date"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL (Optional)</label>
            <input
              type="url"
              placeholder="https://"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              rows={3}
              placeholder="Add any notes about this certificate..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Certificates;