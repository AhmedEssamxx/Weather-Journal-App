// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


//...................................................................................
// GET Route data to the main page:

app.get('/', (request, response) => {
    response.send(projectData)
})

//...................................................................................


// POST Route to post data to the server : 


const postData = (request, response) => {
projectData = request.body;
response.send(projectData);
console.log(projectData);
};
app.post('/add', postData);

//...................................................................................


// GET Route data from api on local URL :
app.get('/all', function getAll (request, response){
    response.send(projectData);
    console.log(projectData);
});


//...................................................................................

// Setup Server
const port = 4000;

app.listen(port, listening); 

function listening(){
    console.log(`Server Running On localhost :${port}`);
}
