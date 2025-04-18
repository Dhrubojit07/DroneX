document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authLinks = document.getElementById('authLinks');
    const userProfile = document.getElementById('userProfile');
    const username = document.getElementById('username');
    const logoutLink = document.getElementById('logoutLink');

    // Auth Functions
    function generateVerificationToken() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    function updateAuthUI() {
        const user = JSON.parse(localStorage.getItem('dronexUser'));
        if (user) {
            authLinks.style.display = 'none';
            userProfile.style.display = 'flex';
            username.textContent = user.name;
        } else {
            authLinks.style.display = 'flex';
            userProfile.style.display = 'none';
        }
    }

    // Signup Handler
    if (document.getElementById('signupForm')) {
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const newUser = {
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                password: document.getElementById('signupPassword').value,
                verified: false,
                verificationToken: generateVerificationToken()
            };

            // Password validation
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            if (newUser.password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Check existing users
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            if (existingUsers.some(u => u.email === newUser.email)) {
                alert('User already exists!');
                return;
            }

            // Store temporary verification data
            localStorage.setItem('pendingVerification', JSON.stringify({
                email: newUser.email,
                token: newUser.verificationToken
            }));

            // Show simulated verification email
            alert(`Verification code sent to ${newUser.email} (simulated): ${newUser.verificationToken}`);

            // Save user and redirect
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            window.location.href = `verify-email.html?email=${encodeURIComponent(newUser.email)}`;
        });
    }

    // Email Verification Handler
    if (document.getElementById('verifyEmailForm')) {
        document.getElementById('verifyEmailForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = new URLSearchParams(window.location.search).get('email');
            const code = document.getElementById('verificationCode').value;

            const pending = JSON.parse(localStorage.getItem('pendingVerification'));
            const users = JSON.parse(localStorage.getItem('users'));

            if (pending && pending.email === email && pending.token === code) {
                const userIndex = users.findIndex(u => u.email === email);
                
                // Update verification status
                users[userIndex].verified = true;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.removeItem('pendingVerification');
                
                // Auto-login and redirect
                localStorage.setItem('dronexUser', JSON.stringify(users[userIndex]));
                window.location.href = 'index.html';
            } else {
                alert('Invalid verification code!');
            }
        });
    }

    // Signin Handler
    if (document.getElementById('signinForm')) {
        document.getElementById('signinForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                if (!user.verified) {
                    alert('Please verify your email first!');
                    window.location.href = `verify-email.html?email=${encodeURIComponent(email)}`;
                    return;
                }
                localStorage.setItem('dronexUser', JSON.stringify(user));
                updateAuthUI();
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }

    // Logout Handler
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('dronexUser');
            updateAuthUI();
            window.location.href = 'index.html';
        });
    }

    // Password Reset Handler
    if (document.getElementById('forgotPasswordForm')) {
        document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.some(u => u.email === email)) {
                const resetToken = generateVerificationToken();
                localStorage.setItem('passwordResetToken', JSON.stringify({
                    email,
                    token: resetToken,
                    expires: Date.now() + 3600000 // 1 hour
                }));
                alert(`Password reset link sent (simulated): ${resetToken}`);
                window.location.href = `reset-password.html?token=${resetToken}`;
            } else {
                alert('Email not found');
            }
        });
    }

    // Initial UI Update
    updateAuthUI();

    // Storage Event Listener
    window.addEventListener('storage', updateAuthUI);
});