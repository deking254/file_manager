

function get_files(url, token) {
    fetch(url, {
        method: 'GET', // Change to POST if needed
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json' // Adjust if needed
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('files').addEventListener('click', (event) => {
    let files;
    event.preventDefault();
    const url = 'http://127.0.0.1:5000/files'; // Replace with your API endpoint
    console.log('The file button was clicked');
    // Retrieve the token from session storage
    const token = sessionStorage.getItem('authToken'); // Replace with your session storage key

    if (!token) {
        console.error('Token not found in session storage.');
        return;
    }
    try {
        //files = get_files(url, token);
        files = [
            { name: "Pirates of the carribean.mov", type: "file", Owner: "dekingsky@gmail.com", Parent: "Movies", public: false },
            { name: "Harry potter.pdf", type: "file", Owner: "dekingsky@gmail.com", Parent: "Books", public: false },
            { name: "passport.jpb", type: "image", Owner: "dekingsky@gmail.com", Parent: "images", public: true },
            { name: "Bandit ft Tokyo sauce.mp3", type: "file", Owner: "dekingsky@gmail.com", Parent: "Music", public: false },
            { name: "Books", type: "folder", Owner: "dekingsky@gmail.com", Parent: "null", public: false }
        ]
        window.location.href = 'file-list'
        document.addEventListener('DOMContentLoaded', function () {
            // Process and display the data
            console.log('file-list page has been loaded');
            const dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = ''; // Clear loading text
            files.forEach(file => {
                let tr = document.createElement('tr');
                let name = document.createElement('td').innerText(file.name);
                let type = document.createElement('td').innerText(file.type);
                let owner = document.createElement('td').innerText(file.owner);
                let parent = document.createElement('td').innerText(file.parent);
                let public = document.createElement('td').innerText(file.public);
                tr.appendChild(name);
                tr.appendChild(type);
                tr.appendChild(owner);
                tr.appendChild(parent);
                tr.appendChild(parent);
                dataContainer.appendChild(tr);
            });


        });

    } catch (e) {

    }
});



