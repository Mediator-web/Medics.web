document.addEventListener('DOMContentLoaded', () => {
    const viewRequestsButton = document.getElementById('viewRequestsButton');
    const viewUsersButton = document.getElementById('viewUsersButton');
    const viewAppointmentsButton = document.getElementById('viewAppointmentsButton');
    const scheduleAppointmentButton = document.getElementById('scheduleAppointmentButton');
    const requestsSection = document.getElementById('requestsSection');
    const usersSection = document.getElementById('usersSection');
    const appointmentsSection = document.getElementById('appointmentsSection');
    const scheduleAppointmentSection = document.getElementById('scheduleAppointmentSection');

    // Toggle section visibility
    const handleSectionVisibility = (section) => {
        requestsSection.style.display = 'none';
        usersSection.style.display = 'none';
        appointmentsSection.style.display = 'none';
        scheduleAppointmentSection.style.display = 'none';

        if (section === 'requests') {
            requestsSection.style.display = 'block';
            loadAllRequests();
        } else if (section === 'users') {
            usersSection.style.display = 'block';
            loadUsers();
        } else if (section === 'appointments') {
            appointmentsSection.style.display = 'block';
            loadAppointments();
        } else if (section === 'schedule') {
            scheduleAppointmentSection.style.display = 'block';
        }
    };

    // Event listeners for navigation buttons
    viewRequestsButton.addEventListener('click', () => handleSectionVisibility('requests'));
    viewUsersButton.addEventListener('click', () => handleSectionVisibility('users'));
    viewAppointmentsButton.addEventListener('click', () => handleSectionVisibility('appointments'));
    scheduleAppointmentButton.addEventListener('click', () => handleSectionVisibility('schedule'));

    // Load Requests
    const loadAllRequests = () => {
        const tableBody = document.getElementById('requestsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        let requests = JSON.parse(localStorage.getItem('requests')) || [];

        if (requests.length === 0) {
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 6;
            cell.textContent = 'No requests submitted yet.';
        } else {
            requests.forEach((request, i) => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = request.date;
                row.insertCell(1).textContent = request.doctorType;
                row.insertCell(2).textContent = request.message;
                row.insertCell(3).textContent = request.email;
                row.insertCell(4).textContent = request.approved ? 'Approved' : 'Pending';
                const actionCell = row.insertCell(5);
                actionCell.innerHTML = request.approved 
                    ? `<button onclick="deleteRequest(${i})">Delete</button>`
                    : `<button onclick="approveRequest(${i})">Approve</button>`;
            });
        }
    };

    // Load Users
    const loadUsers = () => {
        const tableBody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.length === 0) {
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 4;
            cell.textContent = 'No registered users.';
        } else {
            users.forEach((user, i) => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = user.firstName;
                row.insertCell(1).textContent = user.lastName;
                row.insertCell(2).textContent = user.email;
                const actionCell = row.insertCell(3);
                actionCell.innerHTML = `<button onclick="deleteUser(${i})">Delete</button>`;
            });
        }
    };

    // Load Appointments
    const loadAppointments = () => {
        const tableBody = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

        if (appointments.length === 0) {
            const row = tableBody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 6;
            cell.textContent = 'No appointments found.';
        } else {
            appointments.forEach((appt, i) => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = appt.date;
                row.insertCell(1).textContent = appt.time;
                row.insertCell(2).textContent = appt.doctorType;
                row.insertCell(3).textContent = appt.patientEmail;
                row.insertCell(4).textContent = appt.location;
                const actionCell = row.insertCell(5);
                actionCell.innerHTML = `<button onclick="deleteAppointment(${i})">Delete</button>`;
            });
        }
    };

    // Submit New Appointment
    document.getElementById('appointmentForm').addEventListener('submit', e => {
        e.preventDefault();
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const doctorType = document.getElementById('doctorType').value;
        const email = document.getElementById('patientEmail').value;
        const location = document.getElementById('location').value;

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push({ date, time, doctorType, patientEmail: email, location });
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert('Appointment scheduled!');
        document.getElementById('appointmentForm').reset();
        loadAppointments();
    });

    // Action handlers
    window.deleteRequest = (index) => {
        let requests = JSON.parse(localStorage.getItem('requests')) || [];
        requests.splice(index, 1);
        localStorage.setItem('requests', JSON.stringify(requests));
        loadAllRequests();
    };

    window.approveRequest = (index) => {
        let requests = JSON.parse(localStorage.getItem('requests')) || [];
        if (requests[index]) {
            requests[index].approved = true;
            localStorage.setItem('requests', JSON.stringify(requests));
            loadAllRequests();
        }
    };

    window.deleteUser = (index) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    window.deleteAppointment = (index) => {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    };
});
