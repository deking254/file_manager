//This is the js file that handles all the functionality of the login page.
import { URLS, ERRORS } from './urls.js';
//This is a function that logs in the user asynchronously
async function login(url, request_configuration) {
    try {
        const response = await fetch(url, request_configuration);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Network Error');
    }
}
//This function returns an authorization for basic authentication
export function authorization(email, password) {
    try {
        const auth = btoa(email + ':' + password);
        return `Basic ${auth}`
    } catch (error) {
        return null;
    }
}

// Function to display the notification
function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block'; // Show the notification
}



document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Use the correct variable name
    const email = formData.get('email');
    const password = formData.get('password');
    const request_configuration = {
        method: 'GET',
        headers: {
            'Authorization': authorization(email, password),
        }
    }
    login(URLS.API_LOGIN_GET, request_configuration).then(data => {
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
            window.location.href = 'file-list';
        }
        if (data.error) {
            displayNotification(data.error);
        }
    })
        .catch((error) => {
            displayNotification(error.message);
        });
});