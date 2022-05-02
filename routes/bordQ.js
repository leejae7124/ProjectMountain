const express = require('express');
const { bordQ } = require('../model/community');
const router = express.Router();
const { User } = require('../model/User');

//질문게시판
router.post('/init', (req, res) => {
  const bord = new bordQ(req.body)
  User.updateOne({name: req.body.name}, {$push: {bord: req.body._id}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      bord.save((err) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({success: true})
      })
    }
  })
})
router.post('/comment', (req, res) => {
  const bord = new bordF(req.body)
  bordQ.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.post('/update', (req, res) => {
  bordQ.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.get('/list', (req, res) => {
  bordQ.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.post('/delete', (req, res) => {
  bordQ.deleteOne({id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})
router.post('/serch', (req, res) => {
  bordQ.find({ title: new RegExp('.*' + req.body.search + '.*')}, (err, docs) => {
    if (err) return res.status(500).send({error: 'failed'});
    else res.send(docs)
  })
})

module.exports = router