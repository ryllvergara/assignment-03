import { $ } from '../common.js';

const loginFn =() => {
    const loginButton = $('#loginBtn');
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const username = $('#username').value.trim();
            const password = $('#password').value;

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            // Find user by email
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    alert(body.message); // Login successful!
                    // Navigate to dashboard
                } else {
                    alert(`Login failed: ${body.message}`); // Invalid credentials
                }
            })
            .catch(error => {
                console.error('Network or server error:', error);
                alert('Could not connect to the server.');
            });
        });
    }
};

export default loginFn;