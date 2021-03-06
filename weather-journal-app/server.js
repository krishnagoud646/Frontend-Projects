// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000

const server = app.listen(port , ()=>{
    console.log(`Your server is running on port: ${port}`);
} )

// GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
  })
// POST Route
app.post('/add',addData);

function addData(req,res){
    let data = req.body;
    projectData["date"]=data.date;
    projectData["temperature"]=data.temp;
    projectData["feelings"]=data.feel; 
    res.send(projectData);
}



