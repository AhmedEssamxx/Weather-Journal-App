/* Global Variables */
const apiKey = '268a3433380fd42ddfa6bbbeee213a33&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();

//...............................................................................


//the main functions :

const performAction = () => {
        const zipCode = document.getElementById('zip').value;
        const feeling = document.getElementById('feelings').value;
        const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=`;



const weatherAsync =  getWeatherData(baseURL);
weatherAsync.then((data) => {
    
// adding data to post request 
const finalData = {
    temp: data.main.temp,
    feel: feeling,
    date: newDate
}
postData('/add', finalData);
}).then(() => retrieveData())
}
//...............................................................................


// Async Get Request to get data from the openWeatherMap :

const getWeatherData = async (baseURL) => {
    const response = await fetch(baseURL+apiKey);
    try{
        const data = await response.json(); 
        return data; 
    }catch(error) {
        console.log(`error`, error);
    }
};

//...............................................................................

// Async POST Request : 

const postData = async (url ='', finalData ={}) => {

    const response = await fetch (url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(finalData),
    });

    try{
        const newData = await response.json();
console.log(newData);
    }catch(error) {
        console.log('error', error);
    }
};

//...............................................................................

// Function to GET Project Data:

const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
//...............................................................................

   // adding event to the generate button
document.getElementById('generate').addEventListener('click', performAction);
