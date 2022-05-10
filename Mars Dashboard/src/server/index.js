require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { application } = require('express')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
const api_key = process.env.API_KEY
// example API call
app.post('/images', async (req, res) => {
    let data= req.body;
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.body.data}/photos?sol=1000&api_key=${api_key}`)
        .then(res => res.json())
        res.send(image.photos )
    } catch (err) {
        console.log('error:', err);
    }
})
app.post('/data',async(req,res)=>{
    let data = req.body;
    try{
        const url =await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.body.data}/photos?earth_date=2015-6-3&api_key=${api_key}`)
        .then(res => res.json())
        res.send({url})
    }
    catch(error){
            console.log('error:',error);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))