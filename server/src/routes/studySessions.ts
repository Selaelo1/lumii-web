import express from 'express';
import { StudySession, studySessions } from '../models/StudySession';

const router = express.Router();

// GET /api/study-sessions
router.get('/', (req, res) => {
  const userId = 'user_1'; // Mock user ID
  const userSessions = studySessions.filter(s => s.userId === userId);
  
  res.json({
    message: 'Study sessions retrieved successfully',
    data: userSessions,
    count: userSessions.length
  });
});

// GET /api/study-sessions/today
router.get('/today', (req, res) => {
  const userId = 'user_1'; // Mock user ID
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todaySessions = studySessions.filter(s => 
    s.userId === userId &&
    new Date(s.scheduledDate) >= today &&
    new Date(s.scheduledDate) < tomorrow
  );
  
  res.json({
    message: 'Today\'s study sessions retrieved successfully',
    data: todaySessions,
    count: todaySessions.length
  });
});

// POST /api/study-sessions
router.post('/', (req, res) => {
  const { certificationId, title, scheduledDate, duration, notes } = req.body;
  
  if (!certificationId || !title || !scheduledDate) {
    return res.status(400).json({ 
      error: 'Certification ID, title, and scheduled date are required' 
    });
  }
  
  const newSession: StudySession = {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: 'user_1', // Mock user ID
    certificationId,
    title,
    scheduledDate: new Date(scheduledDate),
    duration: duration || 60, // Default 1 hour
    status: 'scheduled',
    notes,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  studySessions.push(newSession);
  
  res.status(201).json({
    message: 'Study session created successfully',
    data: newSession
  });
});

// PUT /api/study-sessions/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const sessionIndex = studySessions.findIndex(s => s.id === id);
  
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Study session not found' });
  }
  
  const updatedSession = {
    ...studySessions[sessionIndex],
    ...req.body,
    updatedAt: new Date()
  };
  
  studySessions[sessionIndex] = updatedSession;
  
  res.json({
    message: 'Study session updated successfully',
    data: updatedSession
  });
});

// DELETE /api/study-sessions/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sessionIndex = studySessions.findIndex(s => s.id === id);
  
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Study session not found' });
  }
  
  studySessions.splice(sessionIndex, 1);
  
  res.json({ message: 'Study session deleted successfully' });
});

export default router;