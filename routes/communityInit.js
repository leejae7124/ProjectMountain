const express = require('express');
const { bordF } = require('../model/community');
const router = express.Router();
const Commu = require('../model/community');
const { User } = require('../model/User');
const Commu_schema = [   
  Commu.bordC,
  Commu.bordF,
  Commu.brdQ,
]

//자유게시판
router.post('/freeInit', (req, res) => {
  const bord = new bordF(req.body)
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
router.post('/freeComment', (req, res) => {
  const bord = new bordF(req.body)
  bordF.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.post('/freeUpdate', (req, res) => {
  bordF.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.get('/freeList', (req, res) => {
  bordF.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
router.post('/freeDelete', (req, res) => {
  bordF.deleteOne({id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})


module.exports = router