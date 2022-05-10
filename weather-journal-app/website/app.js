/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=00ec333be19532b61121063978a2efe1&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction);

/* Function called by event listener */
function performAction (event) {
    event.preventDefault();

    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // making object containing temperature, date and content
    const obj = {feel : feelings, date : newDate}

    // get wheather data from api
    getWheatherdata( baseURL, zip, apiKey )
    .then( data => { obj["temp"]= data.list[0].main.temp; })
    .then(()=> postData('/add',obj))                    
    .then(() => retrieveData() )                              
    .catch(error=> console.log(error))
}

/* Function to GET Web API Data*/
const getWheatherdata = async (baseURL , zip , key) => {
    return await fetch( baseURL + zip + key )
    .then(data=>data.json())
    .catch(error=>console.log(error));    
}
/* Function to POST data */
// Async POST
const postData = async ( url = '/add', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = 'Temperature :: ' + Math.round(allData.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = 'Content :: ' + allData.feelings;
    document.getElementById('date').innerHTML ='Date :: ' + allData.date;
    }
    catch(error) {
      console.log('error', error);
      // appropriately handle the error
    }
   }





