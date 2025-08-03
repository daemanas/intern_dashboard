# 🌟 Intern Dashboard

A beautiful, modern intern dashboard built with Node.js, Express, MongoDB, and vanilla JavaScript. This application provides a comprehensive platform for interns to track their progress, manage referrals, and compete on leaderboards.

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Login/Signup system with session management
- **Dashboard Overview**: Real-time statistics and progress tracking
- **Referral System**: Unique referral codes with copy functionality
- **Donation Tracking**: Total donations raised with visual indicators
- **Rewards System**: Unlockable badges and achievements
- **Leaderboard**: Competitive ranking system
- **Responsive Design**: Works perfectly on all devices

### 🎨 UI/UX Features
- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Smooth Animations**: CSS transitions and micro-interactions
- **Interactive Elements**: Hover effects and visual feedback
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Professional loading indicators

## 🛠 Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: ES6+ features
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd intern-dashboard
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will start on `http://localhost:5000`

5. **Open the frontend**
   - Navigate to the `frontend` folder
   - Open `index.html` in your browser
   - Or serve it using a local server:
     ```bash
     cd frontend
     npx http-server -p 3000
     ```

## 📁 Project Structure

```
intern-dashboard/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   └── script.js         # JavaScript functionality
└── README.md             # Project documentation
```

## 🔧 API Endpoints

### User Management
- `GET /api/user/:email` - Get user dashboard data
- `PUT /api/user/:email/donations` - Update user donations

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data

### Health Check
- `GET /api/health` - Server health status

## 🎮 Demo Features

### Login/Signup
- Use any email/password combination for demo login
- Create new accounts with custom referral codes
- Session persistence with localStorage

### Dashboard
- View personal statistics and progress
- Copy referral codes to clipboard
- Track total donations raised
- Monitor rewards and achievements

### Leaderboard
- View top performers
- Filter by time periods
- Real-time ranking updates

### Demo Functionality
- Click the "Demo: Add $50 Donation" button to simulate donations
- Watch rewards unlock as you reach milestones
- Experience the full gamification system

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: White with transparency
- **Accent**: Green for success states
- **Text**: Dark gray (#333) for readability

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Animations
- **Page Transitions**: Smooth fade-in effects
- **Hover Effects**: Subtle lift and shadow changes
- **Loading States**: Spinning indicators
- **Toast Notifications**: Slide-in animations

## 🔒 Security Features

- **CORS Configuration**: Proper cross-origin handling
- **Input Validation**: Form validation and sanitization
- **Error Handling**: Graceful error management
- **Session Management**: Secure user sessions

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Deploy to platforms like Heroku, Vercel, or AWS
3. Configure MongoDB connection string

### Frontend Deployment
1. Build and optimize assets
2. Deploy to static hosting (Netlify, Vercel, GitHub Pages)
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- MongoDB for database
- Express.js community for documentation

---

**Built with ❤️ for interns everywhere!** 