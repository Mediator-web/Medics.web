document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const adminEmail = document.getElementById('adminEmail').value;
    const adminPassword = document.getElementById('adminPassword').value;
    
   
    const adminCredentials = {
        email: 'oc123@gmail.com',
        password: '1111'
    };
    
   
    if (adminEmail === adminCredentials.email && adminPassword === adminCredentials.password) {
        alert('Login successful!');
        
        localStorage.setItem('isAdminLoggedIn', 'true');

        
        window.location.href = 'admin.html';
    } else {
        alert('Invalid email or password!');
    }
});
