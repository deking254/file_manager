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

document.addEventListener('DOMContentLoaded', function () {
    // Process and display the data
    const url = 'http://127.0.0.1:5000/files';
    const token = sessionStorage.getItem('authToken'); // Replace with your session storage key
    let files;
    if (!token) {
        console.error('Token not found in session storage.');
        return;
    }
    try {
        files = get_files(url, token);
        console.log(e);
    } catch (e) {
        console.log(e);
    }
    console.log('file-list page has been loaded');
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Clear loading text
    files.forEach(file => {
        let tr = document.createElement('tr');

        let nameCell = document.createElement('td');
        nameCell.innerText = file.name;

        let typeCell = document.createElement('td');
        typeCell.innerText = file.type;

        let ownerCell = document.createElement('td');
        ownerCell.innerText = file.owner;

        let parentCell = document.createElement('td');
        parentCell.innerText = file.parent;

        let publicCell = document.createElement('td'); // Renamed from 'public' to 'publicCell'
        publicCell.innerText = file.public;

        tr.appendChild(nameCell);
        tr.appendChild(typeCell);
        tr.appendChild(ownerCell);
        tr.appendChild(parentCell);
        tr.appendChild(publicCell); // Correctly append publicCell instead of parentCell again

        dataContainer.appendChild(tr);
    });


});