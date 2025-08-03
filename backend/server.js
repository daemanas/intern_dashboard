const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data for when MongoDB is not available
const dummyUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    referralCode: 'johndoe2025',
    totalDonations: 1250,
    rewards: ['Bronze Badge', 'First Donation', 'Referral Master']
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    referralCode: 'sarah2025',
    totalDonations: 2500,
    rewards: ['Bronze Badge', 'Silver Badge', 'Gold Badge', 'Referral Master']
  }
];

const dummyLeaderboard = [
  { name: 'Sarah Johnson', referralCode: 'sarah2025', totalDonations: 2500, rank: 1 },
  { name: 'Mike Chen', referralCode: 'mike2025', totalDonations: 2100, rank: 2 },
  { name: 'Emily Davis', referralCode: 'emily2025', totalDonations: 1800, rank: 3 },
  { name: 'Alex Rodriguez', referralCode: 'alex2025', totalDonations: 1500, rank: 4 },
  { name: 'John Doe', referralCode: 'johndoe2025', totalDonations: 1250, rank: 5 }
];

let User, Leaderboard;
let useMongoDB = false;

// Try to connect to MongoDB, fallback to dummy data if not available
mongoose.connect('mongodb://localhost:27017/intern-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  useMongoDB = true;
  
  // User Schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    referralCode: String,
    totalDonations: Number,
    rewards: [String]
  });

  User = mongoose.model('User', userSchema);

  // Leaderboard Schema
  const leaderboardSchema = new mongoose.Schema({
    name: String,
    referralCode: String,
    totalDonations: Number,
    rank: Number
  });

  Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
})
.catch(err => {
  console.log('⚠️ MongoDB connection failed, using dummy data');
  console.log('MongoDB error:', err.message);
  useMongoDB = false;
});

// Helper function to find user
function findUser(email) {
  if (useMongoDB) {
    return User.findOne({ email: email });
  } else {
    return Promise.resolve(dummyUsers.find(user => user.email === email) || null);
  }
}

// Helper function to save user
function saveUser(userData) {
  if (useMongoDB) {
    const user = new User(userData);
    return user.save();
  } else {
    dummyUsers.push(userData);
    return Promise.resolve(userData);
  }
}

// Helper function to update user
function updateUser(email, updateData) {
  if (useMongoDB) {
    return User.findOneAndUpdate({ email: email }, updateData, { new: true });
  } else {
    const userIndex = dummyUsers.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      dummyUsers[userIndex] = { ...dummyUsers[userIndex], ...updateData };
      return Promise.resolve(dummyUsers[userIndex]);
    }
    return Promise.resolve(null);
  }
}

// Helper function to get leaderboard
function getLeaderboard() {
  if (useMongoDB) {
    return Leaderboard.find().sort({ totalDonations: -1 });
  } else {
    return Promise.resolve(dummyLeaderboard);
  }
}

// Routes

// Get user dashboard data
app.get('/api/user/:email', async (req, res) => {
  try {
    const user = await findUser(req.params.email);
    if (!user) {
      // Create dummy user if not found
      const dummyUser = {
        name: 'John Doe',
        email: req.params.email,
        referralCode: req.params.email.split('@')[0] + '2025',
        totalDonations: 1250,
        rewards: ['Bronze Badge', 'First Donation', 'Referral Master']
      };
      await saveUser(dummyUser);
      return res.json(dummyUser);
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update donations
app.put('/api/user/:email/donations', async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await updateUser(req.params.email, { 
      $inc: { totalDonations: amount } 
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating donations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Intern Dashboard API is running',
    database: useMongoDB ? 'MongoDB' : 'Dummy Data'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    database: useMongoDB ? 'MongoDB' : 'Dummy Data'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: ${useMongoDB ? 'MongoDB' : 'Dummy Data'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
}); 