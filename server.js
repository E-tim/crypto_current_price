
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const cors = require('cors');

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// connecting public to server js
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());

function getWeather(req, res, next) {
    req.isWeather = false;
    next();
}



app.get('/', getWeather, async(req, res)=> {


    // if (req.isWeather) {
    //     res.send('It is rainning , come another day')
    // } else {
    //     res.send('You are welcome to this page')
    // }

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').
    then( results => {
        res.render("index", {
            data: results.data
        })
    } )
  
    
})

app.post('/users', (req, res)=> {
    if (req.body.name === 'tim' && req.body.age === 22) {
        res.send('This is correct');
    } else {
        res.send('This is wrong')
    }
})




app.listen( process.env.PORT || 3000);