// components/dashboard/CertificateGrid.tsx
import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import type { Certificate } from '../../types';
import { ArrowRight, Time, Checkmark, Warning } from '@carbon/icons-react';

interface CertificateGridProps {
  certificates: Certificate[];
}

const CertificateGrid: React.FC<CertificateGridProps> = ({ certificates }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'exam-ready': return 'text-purple-600 bg-purple-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'not-started': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Certificate['status']) => {
    switch (status) {
      case 'completed': return <Checkmark size={16} />;
      case 'exam-ready': return <Warning size={16} />;
      case 'in-progress': return <Time size={16} />;
      default: return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="cursor-pointer"
          >
            <Card variant="interactive">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.provider} className="w-8 h-8 rounded" />
                  ) : (
                    <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">
                        {cert.provider[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{cert.provider}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(cert.status)}`}>
                  {getStatusIcon(cert.status)}
                  <span>{cert.status.replace('-', ' ')}</span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{cert.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-gray-500">
                  {cert.completedHours}/{cert.totalHours} hours
                </span>
                <button className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1">
                  <span>View details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Certificate Details Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.name || ''}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setSelectedCert(null)}>
              Close
            </Button>
            <Button variant="primary" className="bg-purple-600 hover:bg-purple-700">
              Continue Studying
            </Button>
          </div>
        }
      >
        {selectedCert && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">
                  {selectedCert.provider[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 capitalize">{selectedCert.provider}</p>
                <p className="text-lg font-semibold mt-1">{selectedCert.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium mt-1">
                  {new Date(selectedCert.startDate).toLocaleDateString()}
                </p>
              </div>
              {selectedCert.examDate && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Exam Date</p>
                  <p className="font-medium mt-1 text-purple-600">
                    {new Date(selectedCert.examDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Study Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">{selectedCert.completedHours} hours</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${selectedCert.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedCert.totalHours - selectedCert.completedHours} hours remaining
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CertificateGrid;