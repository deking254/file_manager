//const urls = require('./urls');
import { URLS } from './urls.js';


async function get_files(url, token) {
    try {
        const response = await fetch(url, {
            method: 'GET', // Change to POST if needed
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json' // Adjust if needed
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('There was a problem with the fetch operation:', error);
    }
}

//A function responsible for creating the tr and td elements to represent the file table
function create_file_table_elements(files) {
    // const dataContainer = document.getElementById('data-container');
    // dataContainer.innerHTML = ''; // Clear loading text
    // Reference to the container where items will be added
    const container = document.querySelector('.container');

    // Loop through the filenames array
    files.forEach(file => {
        // Create a div element with class 'item'
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Create an img element for the SVG
        const logo = document.createElement('img');
        // Create the hidden ellipsis that appears when the pointer is hovered over the item
        const ellipsis = document.createElement('img');
        ellipsis.src = '../assets/ellipsis-vertical.svg';
        if (file.type === 'file') {
            logo.src = '../assets/file.svg'; // Update the path as needed
        } else if (file.type === 'folder') {
            logo.src = '../assets/folder.svg';
        }
        logo.alt = 'Icon';
        logo.classList.add('icon');
        ellipsis.alt = 'Options';
        ellipsis.classList.add('ellipsis');
        ellipsis.addEventListener('click', (event) => {
            const { top, left, height } = ellipsis.getBoundingClientRect();
            const dropdown = document.getElementsByClassName("dropdown");
            console.log(dropdown.style);
            dropdown.style.left = `${left}px`;
            dropdown.style.top = `${top + height}px`;

            // Toggle display
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

        })

        // Create a text node for the filename
        const textNode = document.createTextNode(file.name);

        // Append the img and text to the item div
        itemDiv.appendChild(ellipsis);
        itemDiv.appendChild(logo);
        itemDiv.appendChild(textNode);

        // Append the item div to the container
        container.appendChild(itemDiv);
    });
    // files.forEach(file => {
    //     let tr = document.createElement('tr');

    //     let nameCell = document.createElement('td');
    //     nameCell.innerText = file.name;

    //     let typeCell = document.createElement('td');
    //     typeCell.innerText = file.type;

    //     // let ownerCell = document.createElement('td');
    //     // ownerCell.innerText = file.owner;

    //     // let parentCell = document.createElement('td');
    //     // parentCell.innerText = file.parent;

    //     let publicCell = document.createElement('td'); // Renamed from 'public' to 'publicCell'
    //     publicCell.innerText = file.isPublic;

    //     tr.appendChild(nameCell);
    //     tr.appendChild(typeCell);
    //     // tr.appendChild(ownerCell);
    //     // tr.appendChild(parentCell);
    //     tr.appendChild(publicCell); // Correctly append publicCell instead of parentCell again

    //     dataContainer.appendChild(tr);
    // });
}

document.addEventListener('DOMContentLoaded', function () {

    const token = sessionStorage.getItem('authToken'); // Replace with your session storage key
    if (!token) {
        console.error('Token not found in session storage.');
        return;
    }
    try {
        let files = get_files(URLS.API_FILES_GET, token).then(data => {
            create_file_table_elements(data);
        }).catch(error => {
            console.log('Error', error);
        });
    } catch (e) {
        console.log(e);
    }
});

