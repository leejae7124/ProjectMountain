const express = require('express');
const { bordR } = require('../model/community');
const router = express.Router();
const { User } = require('../model/User');

//모집게시판 생성
router.post('/init', (req, res) => {
  const bord = new bordR(req.body)
  User.updateOne({nickname: req.body.nickname}, {$push: {bord: req.body._id}}, function(error, docs){
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
//모집게시판 댓글 추가
router.post('/comment', (req, res) => {
  bordR.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//모집게시판 댓글 삭제
router.post('/commentOut', (req, res) => {
  const bord = new bordF(req.body)
  bordR.updateOne({_id: req.body._id}, {$pull: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//모집게시판 수정
router.post('/update', (req, res) => {
  bordR.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//모집게시판 리스트
router.get('/list', (req, res) => {
  bordR.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//모집게시판 삭제
router.post('/delete', (req, res) => {
  bordR.deleteOne({_id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})
//자유게시판 검색
router.post('/serch', (req, res) => {
  bordR.find({ title: new RegExp('.*' + req.body.search + '.*')}, (err, docs) => {
    if (err) return res.status(500).send({error: 'failed'});
    else res.send(docs)
  })
})

module.exports = router