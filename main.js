const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

// Get references to HTML elements
var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

// Define the path for file operations
let pathName = path.join(__dirname, 'Files')

// Event listener for the "CREATE" button
btnCreate.addEventListener('click', function(){  
  // Create a text file when the user clicks the CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was created")    
    console.log("The file was created")
  })  
})

// Event listener for the "READ" button
btnRead.addEventListener('click', function(){  
  // Read contents of the created text file
  let file = path.join(pathName, fileName.value)
 
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    console.log("The file was read!")
  })  
})

// Event listener for the "DELETE" button
btnDelete.addEventListener('click', function(){  
  // Delete the specified text file
  let file = path.join(pathName, fileName.value)
 
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The file was deleted!")
  })  
})
