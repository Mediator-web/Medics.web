document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Retrieve users data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if there is a user with matching email and password
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Store the logged-in user's email in localStorage
        localStorage.setItem('loggedInUserEmail', email);
        
        alert('Login successful!');
        // Redirect to Appointment.html after successful login
        window.location.href = 'Appointment.html';
    } else {
        alert('Invalid email or password!');
    }
});

// Add event listener for admin login button
document.getElementById('adminLoginButton').addEventListener('click', function() {
    // Redirect to admin login page
    window.location.href = 'admin-login.html';
});
