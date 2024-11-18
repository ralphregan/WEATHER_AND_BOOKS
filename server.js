import express from "express"
import axios from "axios"
import ejs from "ejs"
import { log } from "console"


const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
const port = 3000
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const API3_URL = "http://api.openweathermap.org/geo/1.0/reverse?"
//for OPEN WEATHER
const API2_URL = "https://api.tomorrow.io/v4/weather/realtime?"
//FOR TOMORROW.IO
const API_KEY = "53cb22bad1aa5993ba5c6da408cdc47e"
const API_KEY2 = "81ZgeOUzZ3IL3J81uHTr6SUHjnwKI6e5"
app.get("/",(req, res)=>{
    res.render("index.ejs")
})

app.post("/locate2", async(req,res) =>{
    console.log(req.body.longitude)
    console.log(req.body.latitude);
    const lat = req.body.latitude
    const long = req.body.longitude
    
            try {
                const response = await axios.get(`${API_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
                const result = response.data
               const response2 = await axios.get(`${API2_URL}location=${lat},${long}&apikey=${API_KEY2}`)
               const result2 = response2.data
               const response3 = await axios.get(`${API3_URL}lat=${lat}&lon=${long}&appid=${API_KEY}`)
               const result3 = response3.data
               
               
               // console.log(JSON.stringify(result.weather))
                //console.log(JSON.stringify(result2));
                

               console.log(JSON.stringify(result.weather[0].description));
        
                
                var content ={
                    temp: Math.round(result.main.temp),
                    feels: Math.round(result.main.feels_like),
                    humidity: result.main.humidity,
                    location : result3[0].name,
                    locationC: result3[0].country,
                    wind : Math.round(result.wind.speed),
                    icon: `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`,
                    desc : result.weather[0].description,


                }
                res.render("index.ejs", {content : content})
                
                
            } catch (error) {
                console.log(error)
                
            }
    
    })
app.listen(port,(req, res)=>{
    console.log(`I am listening on port ${port}`);
    
})
