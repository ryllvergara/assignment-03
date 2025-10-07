import { $ } from '../common.js';

const signupFn = () => {
    const signupButton = $('#signupBtn');
    
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            // 1. Get Values
            const firstName = $('#firstName').value.trim();
            const lastName = $('#lastName').value.trim();
            const email = $('#email').value.trim();
            const password = $('#password').value;
            const repassword = $('#repassword').value;

            // Simple client-side validation
            if (!firstName || !lastName || !email || !password || !repassword) {
                alert("Please fill in all fields.");
                return;
            }

            // 2. Password Match Validation (client-side check for immediate feedback)
            if (password !== repassword) {
                alert("Passwords do not match. Please re-enter.");
                // Optionally clear the password fields
                $('#password').value = '';
                $('#repassword').value = '';
                return;
            }

            // 3. Make API call to the server
            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send all required form data
                body: JSON.stringify({ 
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    repassword // Server uses this for validation too
                })
            })
            // Handle the response and status code
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 201) { // 201 Created is the expected success status from the server
                    alert("Registration successful! You can now log in.");
                    console.log("Registered user:", body.user);
                    // Clear the form fields upon success
                    $('#signupForm').reset();
                    // *** Next Step: Navigate the user to the Login page here ***
                } else if (status === 400 || status === 409) {
                    // Handle password mismatch (400) or existing user (409)
                    alert(`Registration failed: ${body.message}`);
                } else {
                    // Handle other server errors
                    alert(`An unexpected error occurred (Status: ${status}).`);
                }
            })
            .catch(error => {
                console.error('Network or server error:', error);
                alert('Could not connect to the server for registration.');
            });
        });
    }
};

export default signupFn;