import { URLS, ERRORS } from './urls.js';

// Function to display the notification
function displayNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block'; // Show the notification
}


//creates a user by running the fetch on the add user api
async function create_user(url, request_configuration) {
    try {
        const response = await fetch(url, request_configuration);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(ERRORS.FETCH_ERROR);
    }
}

//Handle what happens when the register button is entered
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Use the correct variable name
    const email = formData.get('email');
    const password = formData.get('password');
    const request_configuration = {
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    }
    //Call the function to send the userdata to the server
    try {
        create_user(URLS.API_USER_ADD_POST, request_configuration).then(data => {
            if (data.error) {
                displayNotification(data.error);
            }
        })
    } catch (error) {
        displayNotification(error.message);
    }
});


document.getElementById('registration-form').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password');
    const create_account_button = document.getElementById('create_account_button')

    if (password !== confirmPassword.value) {
        confirmPassword.classList.add('error');
        create_account_button.disabled = true;
    } else {
        confirmPassword.classList.remove('error');
        create_account_button.disabled = false;
    }
});
