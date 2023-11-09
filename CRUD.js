// Import required modules
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// Get references to HTML elements
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

// Define the path for storing files
let pathName = path.join(__dirname, 'Files');

// Event listener for the "Read" button
btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);

    // Read the file asynchronously
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return console.log(err);
        }
        fileContents.value = data;

        // Split the file content into lines
        const lines = data.split('\n');

        const tableBody = document.getElementById('fileTableBody');
        tableBody.innerHTML = '';

        // Iterate through the lines and add them to the table
        lines.forEach(function(line) {
            addContentToTable(line);
        });

        console.log("Meal Plan has been Read!");
    });
});

// Event listener for the "Update" button
btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    // Write the updated content back to the file
    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Meal Plan was updated!");
        alert("Meal Plan was updated!");
    });
});

// Function to add content to the table
function addContentToTable(content) {
    const newRow = document.createElement('tr');

    const contentCell = document.createElement('td');
    contentCell.textContent = content;

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Event listener for the "Delete" button
    deleteButton.addEventListener('click', function() {
        const row = this.parentNode.parentNode;
        const rowIndex = row.rowIndex;

        row.remove();

        // Read the file, remove the specified line, and write the updated content
        const file = path.join(pathName, fileName.value);
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return console.log(err);
            }
            const lines = data.split('\n');
            lines.splice(rowIndex - 1, 1);
            const updatedData = lines.join('\n');
            fs.writeFile(file, updatedData, 'utf8', function(err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    });

    deleteCell.appendChild(deleteButton);

    newRow.appendChild(contentCell);
    newRow.appendChild(deleteCell);

    const tableBody = document.getElementById('fileTableBody');
    tableBody.appendChild(newRow);
}
