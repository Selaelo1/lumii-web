import { Request, Response, NextFunction } from 'express';

export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Check required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['firstName', 'lastName', 'email', 'password']
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // Validate password strength
  if (password.length < 8) {
    return res.status(400).json({ 
      error: 'Password must be at least 8 characters long' 
    });
  }
  
  next();
};

export const validateCertification = (req: Request, res: Response, next: NextFunction) => {
  const { title, provider } = req.body;
  
  if (!title || !provider) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['title', 'provider']
    });
  }
  
  if (typeof title !== 'string' || typeof provider !== 'string') {
    return res.status(400).json({ 
      error: 'Title and provider must be strings' 
    });
  }
  
  next();
};