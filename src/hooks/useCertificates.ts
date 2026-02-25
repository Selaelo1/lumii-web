// hooks/useCertificates.ts
import { useState, useEffect } from 'react';
import { Certificate } from '../types';

export const useCertificates = (userId?: string) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchCertificates();
    }
  }, [userId]);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockCertificates: Certificate[] = [
        {
          id: '1',
          name: 'AWS Certified Solutions Architect',
          provider: 'coursera',
          progress: 75,
          startDate: new Date('2024-01-15'),
          targetDate: new Date('2024-06-15'),
          examDate: new Date('2024-07-01'),
          status: 'in-progress',
          totalHours: 120,
          completedHours: 90
        },
        {
          id: '2',
          name: 'Google Cloud Professional',
          provider: 'udemy',
          progress: 100,
          startDate: new Date('2023-11-01'),
          targetDate: new Date('2024-02-01'),
          status: 'completed',
          totalHours: 80,
          completedHours: 80
        },
        {
          id: '3',
          name: 'Python for Data Science',
          provider: 'edx',
          progress: 45,
          startDate: new Date('2024-02-01'),
          targetDate: new Date('2024-05-01'),
          status: 'in-progress',
          totalHours: 60,
          completedHours: 27
        }
      ];

      setCertificates(mockCertificates);
      
      const total = mockCertificates.reduce((acc, cert) => acc + cert.progress, 0);
      setOverallProgress(total / mockCertificates.length);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCertificate = async (certificate: Omit<Certificate, 'id'>) => {
    // API call to add certificate
    const newCert: Certificate = {
      ...certificate,
      id: Date.now().toString()
    };
    setCertificates(prev => [...prev, newCert]);
  };

  const updateProgress = async (certificateId: string, progress: number) => {
    setCertificates(prev =>
      prev.map(cert =>
        cert.id === certificateId
          ? { ...cert, progress, completedHours: (cert.totalHours * progress) / 100 }
          : cert
      )
    );
  };

  return {
    certificates,
    isLoading,
    overallProgress,
    addCertificate,
    updateProgress,
    refresh: fetchCertificates
  };
};