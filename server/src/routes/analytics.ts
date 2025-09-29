import express from 'express';
import { Analytics, analytics } from '../models/Analytics';

const router = express.Router();

// GET /api/analytics/dashboard
router.get('/dashboard', (req, res) => {
  const userId = 'user_1'; // Mock user ID
  const userAnalytics = analytics.filter(a => a.userId === userId);
  
  // Calculate dashboard stats
  const totalStudyHours = userAnalytics.reduce((sum, a) => sum + a.studyHours, 0);
  const averageScore = userAnalytics.length > 0 
    ? userAnalytics.reduce((sum, a) => sum + a.averageScore, 0) / userAnalytics.length 
    : 0;
  
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);
  
  const thisWeekAnalytics = userAnalytics.filter(
    a => new Date(a.date) >= thisWeekStart
  );
  const weeklyStudyHours = thisWeekAnalytics.reduce((sum, a) => sum + a.studyHours, 0);
  
  res.json({
    message: 'Dashboard analytics retrieved successfully',
    data: {
      totalStudyHours: Math.round(totalStudyHours * 10) / 10,
      averageScore: Math.round(averageScore * 10) / 10,
      weeklyStudyHours: Math.round(weeklyStudyHours * 10) / 10,
      totalPracticeTests: userAnalytics.reduce((sum, a) => sum + a.practiceTests, 0),
      weeklyPracticeTests: thisWeekAnalytics.reduce((sum, a) => sum + a.practiceTests, 0),
      recentProgress: userAnalytics.slice(-7) // Last 7 days
    }
  });
});

// GET /api/analytics/progress/:certificationId
router.get('/progress/:certificationId', (req, res) => {
  const { certificationId } = req.params;
  const certificationAnalytics = analytics.filter(
    a => a.certificationId === certificationId
  );
  
  res.json({
    message: 'Certification progress retrieved successfully',
    data: {
      analytics: certificationAnalytics,
      totalStudyHours: certificationAnalytics.reduce((sum, a) => sum + a.studyHours, 0),
      averageScore: certificationAnalytics.length > 0 
        ? certificationAnalytics.reduce((sum, a) => sum + a.averageScore, 0) / certificationAnalytics.length 
        : 0
    }
  });
});

// POST /api/analytics
router.post('/', (req, res) => {
  const { certificationId, studyHours, practiceTests, averageScore } = req.body;
  
  if (!certificationId || studyHours === undefined || averageScore === undefined) {
    return res.status(400).json({ 
      error: 'Certification ID, study hours, and average score are required' 
    });
  }
  
  const newAnalytics: Analytics = {
    id: `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: 'user_1', // Mock user ID
    certificationId,
    date: new Date(),
    studyHours,
    practiceTests: practiceTests || 0,
    averageScore,
    createdAt: new Date()
  };
  
  analytics.push(newAnalytics);
  
  res.status(201).json({
    message: 'Analytics entry created successfully',
    data: newAnalytics
  });
});

export default router;