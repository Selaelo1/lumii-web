import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import { Certificate, Calendar } from '@carbon/icons-react';

interface CertificationCardProps {
  title: string;
  provider: string;
  progress: number;
  examDate?: string;
  status: 'in-progress' | 'completed' | 'scheduled';
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  provider,
  progress,
  examDate,
  status
}) => {
  const statusColors = {
    'in-progress': 'bg-mutedBlue text-white',
    'completed': 'bg-success text-white',
    'scheduled': 'bg-warning text-charcoal'
  };

  const statusLabels = {
    'in-progress': 'In Progress',
    'completed': 'Completed',
    'scheduled': 'Scheduled'
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Certificate size={24} className="text-purpleAccent" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">{title}</h3>
            <p className="text-sm text-gray-500">{provider}</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <ProgressBar 
        percentage={progress} 
        size="md" 
        color={status === 'completed' ? 'success' : 'primary'}
        className="mb-4"
      />

      {examDate && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          Exam Date: {examDate}
        </div>
      )}

      <div className="flex space-x-2">
        <Button variant="primary" size="sm" className="flex-1">
          Continue Study
        </Button>
        <Button variant="secondary" size="sm">
          Details
        </Button>
      </div>
    </Card>
  );
};

export default CertificationCard;