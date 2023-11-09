const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

// Get references to HTML elements
var btnAppend = document.getElementById('btnCreate'); 
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

// Define the path for file operations
let pathName = path.join(__dirname, 'Files');

// Event listener for the "CREATE" button
btnCreate.addEventListener('click', function () {
  // Get the file path and contents
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

  // Check if the file already exists
  if (fs.existsSync(file)) {
    // If the file exists, append the contents with a newline character
    contents = '\n' + contents; 
    fs.appendFile(file, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = document.getElementById('fileName').value;
      alert(' Meal Plan has been added! '); // Display success message
      console.log('Meal Plan has been added!');
    });
  } else {
    alert('File does not exist.'); // Display an error message if the file does not exist
  }
});
