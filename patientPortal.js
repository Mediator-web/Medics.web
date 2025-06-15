document.addEventListener('DOMContentLoaded', () => {
    const viewRequestsButton = document.getElementById('viewRequestsButton');
    const viewAppointmentsButton = document.getElementById('viewAppointmentsButton');
    const requestsSection = document.getElementById('requestsSection');
    const appointmentsSection = document.getElementById('appointmentsSection');

    const loadRequests = () => {
        const requestsTable = document.getElementById('requestsTable').getElementsByTagName('tbody')[0];
        const requests = JSON.parse(localStorage.getItem('requests')) || [];
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

        console.log('All Requests:', requests);  // Debugging: Log all requests
        console.log('Logged In User Email:', loggedInUserEmail);  // Debugging: Log logged-in user email

        requestsTable.innerHTML = ''; // Clear existing rows

        // Filter requests by the logged-in user's email
        const userRequests = requests.filter(request => request.email === loggedInUserEmail);

        console.log('Filtered Requests for User:', userRequests);  // Debugging: Log filtered requests

        if (userRequests.length === 0) {
            const row = requestsTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 4;
            cell.textContent = 'You have no requests.';
        } else {
            userRequests.forEach(request => {
                const row = requestsTable.insertRow();
                row.insertCell(0).textContent = request.date;
                row.insertCell(1).textContent = request.doctorType;
                row.insertCell(2).textContent = request.message;
                row.insertCell(3).textContent = request.approved ? 'Approved' : 'Pending';
            });
        }
    };

    const loadAppointments = () => {
        const appointmentsTable = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

        console.log('All Appointments:', appointments);  // Debugging: Log all appointments
        console.log('Logged In User Email:', loggedInUserEmail);  // Debugging: Log logged-in user email

        appointmentsTable.innerHTML = ''; // Clear existing rows

        // Filter appointments by the logged-in user's email
        const userAppointments = appointments.filter(appointment => appointment.patientEmail === loggedInUserEmail);

        console.log('Filtered Appointments for User:', userAppointments);  // Debugging: Log filtered appointments

        if (userAppointments.length === 0) {
            const row = appointmentsTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.textContent = 'You have no appointments.';
        } else {
            userAppointments.forEach(appointment => {
                const row = appointmentsTable.insertRow();
                row.insertCell(0).textContent = appointment.date;
                row.insertCell(1).textContent = appointment.time;
                row.insertCell(2).textContent = appointment.doctorType;
                row.insertCell(3).textContent = appointment.location;
            });
        }
    };

    const handleSectionVisibility = (showSection) => {
        requestsSection.style.display = 'none';
        appointmentsSection.style.display = 'none';

        if (showSection === 'requests') {
            requestsSection.style.display = 'block';
            loadRequests();
        } else if (showSection === 'appointments') {
            appointmentsSection.style.display = 'block';
            loadAppointments();
        }
    };

    viewRequestsButton.addEventListener('click', () => handleSectionVisibility('requests'));
    viewAppointmentsButton.addEventListener('click', () => handleSectionVisibility('appointments'));
});
