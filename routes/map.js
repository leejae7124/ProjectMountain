const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Schemes
const schema = new mongoose.Schema({
  x: { type: Number},
  y: { type: Number },
});
const map = mongoose.model('loc', schema)

router.get('/add', (req, res) => {
    map.collection.insertOne(req.body)
    res.send('fin')
})

router.get('/', (req, res, next) => {
    map.collection.updateOne({_id: "map"},{$set: {x: req.body.x, y: req.body.y}}, function(error, docs){
        if(error){
            console.log(error);
        }else{
          console.log('yes')
        }
    })
    map.collection.findOne({_id: "map"}, function(error, docs){
        if(error){
            console.log(error);
        }else{
            res.render('map', {
                javascriptkey: '770f232b413de4c27700024cd1dfc080',
                x: parseFloat(docs.x),
                y: parseFloat(docs.y)
            })
        }
    })
})

module.exports = router