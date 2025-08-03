// Global variables
let currentUser = null;
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const loginPage = document.getElementById('loginPage');
const signupPage = document.getElementById('signupPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    document.getElementById(pageId).classList.add('active');
}

// Show content section
function showContent(contentId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target content
    document.getElementById(contentId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the corresponding nav link
    const activeLink = document.querySelector(`[data-page="${contentId.replace('Content', '')}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showPage('dashboardPage');
        loadDashboard();
    }
    
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Signup form submission
    signupForm.addEventListener('submit', handleSignup);
    
    // Navigation links
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('signupPage');
    });
    
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('loginPage');
    });
    
    // Dashboard navigation
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showContent(page + 'Content');
        });
    });
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
});

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Show loading state
    const submitBtn = loginForm.querySelector('.login-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Signing in...';
    submitBtn.disabled = true;
    
    try {
        // For demo purposes, we'll use any email/password combination
        // In a real app, you'd validate credentials with the backend
        const response = await fetch(`${API_BASE_URL}/user/${email}`);
        
        if (response.ok) {
            const userData = await response.json();
            currentUser = userData;
            
            // Save user to localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Show success message
            showToast('Login successful!', 'success');
            
            // Navigate to dashboard
            showPage('dashboardPage');
            loadDashboard();
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Handle Signup
async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Show loading state
    const submitBtn = signupForm.querySelector('.login-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Creating account...';
    submitBtn.disabled = true;
    
    try {
        // For demo purposes, we'll simulate account creation
        // In a real app, you'd send this data to the backend
        const userData = {
            name: name,
            email: email,
            referralCode: name.toLowerCase().replace(/\s+/g, '') + '2025',
            totalDonations: 0,
            rewards: []
        };
        
        currentUser = userData;
        
        // Save user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Show success message
        showToast('Account created successfully!', 'success');
        
        // Navigate to dashboard
        showPage('dashboardPage');
        loadDashboard();
    } catch (error) {
        console.error('Signup error:', error);
        showToast('Signup failed. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Handle Logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('loginPage');
    
    // Clear forms
    loginForm.reset();
    signupForm.reset();
    
    showToast('Logged out successfully!', 'success');
}

// Load Dashboard Data
async function loadDashboard() {
    if (!currentUser) return;
    
    try {
        // Update user info
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('referralCode').textContent = currentUser.referralCode;
        document.getElementById('totalDonations').textContent = `$${currentUser.totalDonations.toLocaleString()}`;
        document.getElementById('rewardsCount').textContent = currentUser.rewards.length;
        
        // Load rewards
        loadRewards();
        
        // Load leaderboard
        loadLeaderboard();
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showToast('Error loading dashboard data', 'error');
    }
}

// Load Rewards
function loadRewards() {
    const rewardsGrid = document.getElementById('rewardsGrid');
    const rewards = currentUser.rewards || [];
    
    // Define available rewards
    const availableRewards = [
        { name: 'Bronze Badge', icon: 'fas fa-medal', description: 'First donation milestone', unlocked: rewards.includes('Bronze Badge') },
        { name: 'Silver Badge', icon: 'fas fa-medal', description: 'Reach $500 in donations', unlocked: rewards.includes('Silver Badge') },
        { name: 'Gold Badge', icon: 'fas fa-medal', description: 'Reach $1000 in donations', unlocked: rewards.includes('Gold Badge') },
        { name: 'Referral Master', icon: 'fas fa-users', description: 'Get 5 referrals', unlocked: rewards.includes('Referral Master') },
        { name: 'Donation Champion', icon: 'fas fa-trophy', description: 'Top 10 on leaderboard', unlocked: rewards.includes('Donation Champion') },
        { name: 'Community Hero', icon: 'fas fa-heart', description: 'Make 20 donations', unlocked: rewards.includes('Community Hero') }
    ];
    
    rewardsGrid.innerHTML = availableRewards.map(reward => `
        <div class="reward-item ${reward.unlocked ? 'unlocked' : ''}">
            <i class="${reward.icon}"></i>
            <h4>${reward.name}</h4>
            <p>${reward.description}</p>
        </div>
    `).join('');
}

// Load Leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/leaderboard`);
        const leaderboardData = await response.json();
        
        const leaderboardList = document.getElementById('leaderboardList');
        
        leaderboardList.innerHTML = leaderboardData.map((entry, index) => {
            const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'other';
            const rankIcon = index === 0 ? 'fas fa-crown' : index === 1 ? 'fas fa-medal' : index === 2 ? 'fas fa-medal' : 'fas fa-hashtag';
            
            return `
                <div class="leaderboard-item">
                    <div class="leaderboard-rank ${rankClass}">
                        <i class="${rankIcon}"></i>
                    </div>
                    <div class="leaderboard-info">
                        <h4>${entry.name}</h4>
                        <p>${entry.referralCode}</p>
                    </div>
                    <div class="leaderboard-amount">
                        $${entry.totalDonations.toLocaleString()}
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        showToast('Error loading leaderboard', 'error');
    }
}

// Copy Referral Code
function copyReferralCode() {
    const referralCode = document.getElementById('referralCode').textContent;
    
    navigator.clipboard.writeText(referralCode).then(() => {
        showToast('Referral code copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = referralCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Referral code copied to clipboard!', 'success');
    });
}

// Show Toast Notification
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// Simulate donation update (for demo purposes)
function simulateDonation(amount) {
    if (!currentUser) return;
    
    currentUser.totalDonations += amount;
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    document.getElementById('totalDonations').textContent = `$${currentUser.totalDonations.toLocaleString()}`;
    
    // Check for new rewards
    checkRewards();
    
    showToast(`Donation of $${amount} received!`, 'success');
}

// Check for new rewards based on donations
function checkRewards() {
    const rewards = currentUser.rewards || [];
    const newRewards = [];
    
    if (currentUser.totalDonations >= 100 && !rewards.includes('Bronze Badge')) {
        newRewards.push('Bronze Badge');
    }
    
    if (currentUser.totalDonations >= 500 && !rewards.includes('Silver Badge')) {
        newRewards.push('Silver Badge');
    }
    
    if (currentUser.totalDonations >= 1000 && !rewards.includes('Gold Badge')) {
        newRewards.push('Gold Badge');
    }
    
    if (newRewards.length > 0) {
        currentUser.rewards = [...rewards, ...newRewards];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loadRewards();
        
        newRewards.forEach(reward => {
            showToast(`🎉 New reward unlocked: ${reward}!`, 'success');
        });
    }
}

// Add some demo functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add a demo button to simulate donations (for testing)
    const demoButton = document.createElement('button');
    demoButton.textContent = 'Demo: Add $50 Donation';
    demoButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1000;
        font-size: 12px;
    `;
    demoButton.addEventListener('click', () => simulateDonation(50));
    document.body.appendChild(demoButton);
});

// Handle leaderboard filter buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // In a real app, you'd filter the leaderboard data here
        showToast('Filter applied!', 'info');
    }
}); 