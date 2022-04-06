const express = require('express')
const app = express()
const port = 5000
const fetchData = require('./fetchData/fetchData')
const parser = require('xml2json')

app.use(express.json({extened: false}))

app.get('/', (req, res)=> {
    res.json({message: "welcome"});
})

app.get('/fetch', async(req, res)=> {
    try{
        const response = await fetchData()
        //console.log(response.data.response.body.items)
        res.send(response.data.response.body.items) 
    }catch(error){
        console.log(error.message)
        res.status(500).send(error)
    }
})



app.listen(port, () => console.log('Server is running'));