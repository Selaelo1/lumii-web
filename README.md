# Lumii - Certification Tracking Platform

A comprehensive full-stack web application for managing professional certifications, tracking study progress, and optimizing exam preparation.

## 🚀 Features

### Frontend
- **Modern React + TypeScript** architecture with responsive design
- **Beautiful UI** with custom Lumii brand colors and Carbon Icons
- **Landing Page** with hero section and feature highlights
- **Authentication** system (login, signup, forgot password)
- **Dashboard** with analytics, certification tracking, and study planning
- **Responsive Design** optimized for desktop and mobile devices

### Backend
- **RESTful API** built with Node.js, Express, and TypeScript
- **Authentication** with JWT tokens and bcrypt password hashing
- **Mock Database** with comprehensive data models ready for database integration
- **Error Handling** and validation middleware
- **API Endpoints** for auth, certifications, analytics, and study sessions

## 🏗️ Project Structure

```
lumii/
├── client/                  # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page views (Landing, Auth, Dashboard)
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
├── server/                  # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── models/         # Data models with mock data
│   │   ├── middleware/     # Auth, validation, error handling
│   │   └── utils/          # Helper functions
└── package.json            # Root package.json for scripts
```

## 🎨 Design System

### Brand Colors
- **Deep Violet**: `#5B2C98` (primary brand)
- **Light Lavender**: `#C8A2FF` (secondary brand)
- **Bright Purple**: `#8E44EC` (CTA highlights)
- **Charcoal**: `#2D2D2D` (neutral text)
- **Muted Blue**: `#6C8AE4` (analytics & buttons)
- **Success**: `#27AE60`, **Warning**: `#F1C40F`, **Error**: `#E74C3C`
- **Off White**: `#F9F9FB` (backgrounds)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone and install dependencies:**
```bash
npm run setup
```

2. **Start development servers:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/profile` - Get user profile (protected)

#### Certifications
- `GET /api/certifications` - Get all certifications
- `POST /api/certifications` - Create new certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

#### Analytics
- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/progress/:certificationId` - Get certification progress
- `POST /api/analytics` - Log study session analytics

#### Study Sessions
- `GET /api/study-sessions` - Get all study sessions
- `GET /api/study-sessions/today` - Get today's sessions
- `POST /api/study-sessions` - Schedule new study session
- `PUT /api/study-sessions/:id` - Update study session

## 🛠️ Development

### Available Scripts

```bash
# Start both frontend and backend in development mode
npm run dev

# Start only frontend
npm run client:dev

# Start only backend
npm run server:dev

# Build frontend for production
npm run build

# Build backend for production
npm run build:server

# Run linting
npm run lint
```

### Mock Data

The application comes with comprehensive mock data for:
- **Users**: Sample user accounts with hashed passwords
- **Certifications**: AWS, CompTIA, Microsoft, Google Cloud certifications
- **Analytics**: Study progress and performance metrics
- **Study Sessions**: Scheduled and completed study sessions

## 🗄️ Database Integration

The application is designed to easily integrate with your preferred database:

1. **PostgreSQL** (recommended for relational data)
2. **MongoDB** (for document-based storage)
3. **SQLite** (for development/testing)

Replace the mock data arrays in `/server/src/models/` with actual database queries using your ORM of choice (Prisma, TypeORM, Mongoose, etc.).

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Proper error responses without data leakage
- **CORS Configuration**: Cross-origin request handling

## 🚀 Production Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
cd server
npm run build
# Deploy with NODE_ENV=production
```

### Environment Variables
Copy `server/.env.example` to `server/.env` and configure:
- `JWT_SECRET`: Strong secret key for JWT tokens
- `DATABASE_URL`: Your database connection string
- `PORT`: Server port (default: 5000)

## 📱 Features Overview

### For Users
- **Dashboard**: Comprehensive overview of certification progress
- **Study Planning**: Schedule and track study sessions
- **Progress Analytics**: Detailed insights into study patterns
- **Certification Management**: Add, update, and track multiple certifications
- **Practice Test Tracking**: Monitor test scores and improvement

### For Developers
- **Type Safety**: Full TypeScript implementation
- **Modular Architecture**: Clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Error Handling**: Comprehensive error management
- **API Documentation**: Well-documented REST endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Future Enhancements

- **Real-time notifications** for study reminders
- **Social features** for study groups and progress sharing
- **AI-powered recommendations** for study optimization
- **Integration with certification providers** for official exam scheduling
- **Mobile app** with React Native
- **Advanced analytics** with data visualization
- **Gamification** with achievements and leaderboards

---

**Built with ❤️ using React, TypeScript, Node.js, and modern web technologies.**