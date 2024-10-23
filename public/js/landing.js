document.getElementById('files').addEventListener('click', (event) => {
    let files;
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/files'; // Replace with your API endpoint
    console.log('The file button was clicked');
    // Retrieve the token from session storage
    const token = sessionStorage.getItem('authToken'); // Replace with your session storage key

    if (!token) {
        console.error('Token not found in session storage.');
        window.location.href = 'login';
        return;
    }
    try {
        //files = get_files(url, token);
        window.location.href = 'file-list'

    } catch (e) {

    }
});



