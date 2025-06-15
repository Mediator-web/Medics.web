document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.querySelector('form');

    requestForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const doctorType = document.getElementById('doctor-type').value;
        const message = document.getElementById('user-request').value;
        const email = document.getElementById('email').value;

        const newRequest = { date, doctorType, message, email };
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.push(newRequest);
        localStorage.setItem('requests', JSON.stringify(requests));

        alert('Request submitted successfully!');
        requestForm.reset();
    });
});
