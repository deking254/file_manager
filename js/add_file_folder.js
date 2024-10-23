//here we use the api to gather a list of all public folders as well as add the functionality of enabling/disabling
//the data input tag depending on if the file/folder is selected in the type input
import { URLS } from './urls.js';
const token = sessionStorage.getItem('authToken');

async function get_folders(token) {
    try {
        const response = await fetch(URLS.API_PUBLIC_FOLDERS_GET, {
            method: 'GET',
            headers: {
                'X-Token': token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.folders;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}

async function add_file_folder(form_data, token) {
    // Sending the POST request using Fetch API


    fetch(URLS.API_ADD_FILE_FOLDER_POST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Token': token
        },
        body: JSON.stringify(form_data)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


//This function goes through the folders returned from the get_folders function and creates an option element for each folder then dynamically add 
// the value of the option to be the _id field and the innertext of the option to be the name of the folder.
function create_parent_list(folders) {
    const parentSelector = document.getElementById('parent');
    folders.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder._id; // Set the value to the id field
        option.innerText = folder.name; // Set the inner text to the name field
        parentSelector.appendChild(option); // Append the option to the select element
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const typeElement = document.getElementById("type");
    const dataField = document.getElementById("data");
    const folders = get_folders(token).then(data => {
        //call the create_parent_list function to create the options for the parent_selector
        create_parent_list(data);
    })
        .catch((error) => {
            console.error('Error:', error);
        });;
    typeElement.addEventListener("change", function () {
        console.log(typeElement.value);
        if (typeElement.value === "folder") {
            dataField.disabled = true; // Disable the input field
        } else if (typeElement.value === "file") {
            dataField.disabled = false; // Enable the input field
        } else {
            dataField.disabled = false; // Reset if no valid option is selected
        }
    });
    document.getElementById('file-folder-add-form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Capture form data
        const name = document.getElementById('name').value;
        const type = document.getElementById('type').value;
        const parentId = document.getElementById('parent').value;
        const data = window.btoa(document.getElementById('data').value);
        const isPublic = () => { if (document.getElementById('isPublic').value === 'Yes') { return true } return false };
        const form_data = { name: name, type: type, parentId: parentId, data: data, isPublic: isPublic() }
        add_file_folder(form_data, token);
        //Redirect back to file_list page
        window.location.href = 'file-list';
    })
});