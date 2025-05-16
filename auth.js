// Authentication constants
const adminAccountKey = 'admin_account';
const sessionKey = 'inventory_session';

// Initialize admin account if it doesn't exist
function initializeAdminAccount() {
    if (!localStorage.getItem(adminAccountKey)) {
        // Create default admin account (username: admin, password: admin123)
        const defaultAdmin = {
            username: 'admin',
            password: 'admin123'
        };
        localStorage.setItem(adminAccountKey, JSON.stringify(defaultAdmin));
        console.log('Default admin account created');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const storedAdmin = JSON.parse(localStorage.getItem(adminAccountKey));
    
    if (username === storedAdmin.username && password === storedAdmin.password) {
        // Create session
        localStorage.setItem(sessionKey, JSON.stringify({
            isLoggedIn: true,
            username: username,
            loginTime: new Date().toISOString()
        }));
        
        // Redirect to index page
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password');
    }
}

// Check if user is logged in
function checkUserAuthentication() {
    const session = JSON.parse(localStorage.getItem(sessionKey));
    
    if (!session || !session.isLoggedIn) {
        // User is not logged in, redirect to login page
        console.log("User not authenticated. Redirecting to login page...");
        window.location.replace('login.html');
        return false;
    }
    return true;
}

// Handle logout
function logout() {
    // Clear session
    localStorage.removeItem(sessionKey);
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Handle change password on separate page
function handleChangePassword(event) {
    event.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    const storedAdmin = JSON.parse(localStorage.getItem(adminAccountKey));

    if (oldPassword === storedAdmin.password) {
        storedAdmin.password = newPassword;
        localStorage.setItem(adminAccountKey, JSON.stringify(storedAdmin));
        alert('Password changed successfully!');
        window.location.href = 'login.html'; // Redirect to login
    } else {
        alert('Old password is incorrect.');
    }
}

// Initialization
initializeAdminAccount();

// Determine if current page is a protected page
function isProtectedPage() {
    const currentUrl = window.location.href.toLowerCase();
    const protectedPages = [
        'index.html',
        'add_product.html',
        'edit_product.html',
        'list_product.html',
        'delete_product.html'
    ];
    
    // Check if any protected page name is in the current URL
    return protectedPages.some(page => currentUrl.includes(page));
}

// Check if current page is login or change password page
function isAuthPage() {
    const currentUrl = window.location.href.toLowerCase();
    return currentUrl.includes('login.html') || currentUrl.includes('change_password.html');
}

// Execute immediately - protection logic
if (isProtectedPage() && !isAuthPage()) {
    console.log("Protected page detected. Checking authentication...");
    // Force immediate redirection if not authenticated
    if (!checkUserAuthentication()) {
        console.log("Authentication failed, redirecting...");
    } else {
        console.log("User is authenticated.");
    }
}

// Event bindings
document.addEventListener('DOMContentLoaded', function() {
    // Bind login form handler
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
    
    // Bind change password form handler
    if (document.getElementById('change-password-form')) {
        document.getElementById('change-password-form').addEventListener('submit', handleChangePassword);
    }
});


