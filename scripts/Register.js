document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];


        const emailExists = storedUsers.some(user => user.email === email);
        if (emailExists) {
            alert('This email is already registered!');
            return;
        }


        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        alert('Registration successful!');
        signUpForm.reset();
        
    });
});
