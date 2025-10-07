import { $ } from './common.js';
import loginFn from './login/login.js';
import signupFn from './signup/signup.js';

// Function to handle fetching and insertion
const loadTemplate = (path, callback) => {
    fetch(path)
        .then((response) => response.text())
        // Insert the HTML into the container
        .then((fragments) => {
            $('#contentContainer').innerHTML = fragments;
        })
        // Execute the callback function (loginFn or signupFn)
        .then(callback)
        .catch(error => {
            console.error('Error loading template or executing function:', error);
        });
};

// Listener for the Login link
$('#loginPageBtn').addEventListener('click', () => {
    loadTemplate('./templates/login.html', loginFn);
});

// Listener for the Signup link
$('#signupPageBtn').addEventListener('click', () => {
    // FIX: Call signupFn after loading the signup template
    loadTemplate('./templates/signup.html', signupFn); 
});