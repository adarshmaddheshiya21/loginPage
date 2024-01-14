require('dotenv').config()
const express = require("express")
const app = express()

app.get('/', (req, res)=> {
    res.send('hello world')
})
app.get('/twitter', (req, res)=> {
    res.send("adarsdotcom")
})

app.get('/login', (req, res)=> {
    res.send('<h1>Pleaes provide password and username</h1>')
})
app.get('/chai', (req, res) => {
    res.send('<h1>Chai aur code</h1>')
})

app.listen(process.env.PORT, ()=> {
    console.log(`The server is listening on port ${process.env.PORT}...`)
})