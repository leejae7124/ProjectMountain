const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const key = require('../config/javascriptkey')

// Define Schemes
const schema = new mongoose.Schema({
  x: { type: Number},
  y: { type: Number },
});
const map = mongoose.model('loc', schema)

router.post('/set', (req, res, next) => {
    map.collection.insertOne({token: req.body.token, x: req.body.x, y: req.body.y}, function(error, docs){
        if(error){
            console.log(error);
        }else{
          res.send({message: 'yes'})
        }
    })
})

router.get('/:token', (req, res, next) => {
    map.collection.findOne({token: req.params.token}, function(error, docs){
        if(error){
            console.log(error);
        }else{
            res.render('map', {
                javascriptkey: key.javascriptkey,
                x: parseFloat(docs.x),
                y: parseFloat(docs.y)
            })
        }
    })
})

module.exports = router