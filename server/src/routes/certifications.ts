import express from 'express';
import { Certification, certifications } from '../models/Certification';

const router = express.Router();

// GET /api/certifications
router.get('/', (req, res) => {
  res.json({
    message: 'Certifications retrieved successfully',
    data: certifications,
    count: certifications.length
  });
});

// GET /api/certifications/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const certification = certifications.find(c => c.id === id);
  
  if (!certification) {
    return res.status(404).json({ error: 'Certification not found' });
  }
  
  res.json({
    message: 'Certification retrieved successfully',
    data: certification
  });
});

// POST /api/certifications
router.post('/', (req, res) => {
  const { title, provider, targetDate, status = 'in-progress' } = req.body;
  
  if (!title || !provider) {
    return res.status(400).json({ error: 'Title and provider are required' });
  }
  
  const newCertification: Certification = {
    id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: 'user_1', // Mock user ID
    title,
    provider,
    progress: 0,
    status,
    targetDate: targetDate ? new Date(targetDate) : undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  certifications.push(newCertification);
  
  res.status(201).json({
    message: 'Certification created successfully',
    data: newCertification
  });
});

// PUT /api/certifications/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const certificationIndex = certifications.findIndex(c => c.id === id);
  
  if (certificationIndex === -1) {
    return res.status(404).json({ error: 'Certification not found' });
  }
  
  const updatedCertification = {
    ...certifications[certificationIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  certifications[certificationIndex] = updatedCertification;
  
  res.json({
    message: 'Certification updated successfully',
    data: updatedCertification
  });
});

// DELETE /api/certifications/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const certificationIndex = certifications.findIndex(c => c.id === id);
  
  if (certificationIndex === -1) {
    return res.status(404).json({ error: 'Certification not found' });
  }
  
  certifications.splice(certificationIndex, 1);
  
  res.json({ message: 'Certification deleted successfully' });
});

export default router;