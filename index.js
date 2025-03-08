import OpenAI from "openai"
//import { getCurrentWeather, getLocation, functions } from "./tools.js"
//import { renderNewMessage } from "./dom.js"
import dotenv from "dotenv"
const express = require('express')
const app = express()
const port = 3000
dotenv.config() 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})


