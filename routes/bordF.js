const express = require('express');
const { bordF } = require('../model/community');
const router = express.Router();
const { User } = require('../model/User');
const { auth } = require('../middleware/auth');

//자유게시판 생성
router.post('/init', auth, (req, res) => {
  const bord = new bordF(req.body)
  User.updateOne({email: req.user.email}, {$push: {bord: req.body._id}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      bord.save((err) => {
        if(err) return res.json({ success: false, err })
        else {
          bordF.updateOne({_id: req.body._id}, {$set: {nickname: req.user.nickname}}, function(error, docs){
            if(error){
                console.log(error);
            }else{
              res.send({success: true})
            }
        })
        }
      })
    }
  })
})
//자유게시판 댓글 추가
router.post('/commentIn', (req, res) => {
  const bord = new bordF(req.body.comment)
  bordF.updateOne({_id: req.body._id}, {$push: {comment: req.body.comment._id}}, function(error, docs){
    if(error){
      console.log(error);
  }else{
    bord.save((err) => {
      if(err) return res.json({ success: false, err })
      else {
        res.send({success: true})
      }
    })
  }
  })
})
//자유게시판 댓글 리스트
let array = new Array();
router.post('/commentList', (req, res) => {
  bordF.findOne({ name: req.body._id }, (err, result) => { 
    if (err) return res.status(500).send({error: 'failed'});

    for (let i = 0; i < result.comment.length; i++) {     

        bordF.find({ _id: result.comment[i]}, (err, docs) => {
            if (err) return res.status(500).send({error: 'failed'});
            if(docs.length != 0) array = array.concat(docs);

            if(i == result.comment.length - 1) res.json(array);
        })
    }
})
array = []
})
//자유게시판 댓글 삭제
router.post('/commentOut', (req, res) => {
  bordF.deleteOne({_id: req.body._id})
  bordF.updateOne({_id: req.body._id}, {$pull: {comment: req.body.comment}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//자유게시판 수정
router.post('/update', (req, res) => {
  bordF.updateOne({_id: req.body._id}, {$set: {title: req.body.title, text: req.body.text}}, function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//자유게시판 리스트
router.get('/list', (req, res) => {
  bordF.find(function(error, docs){
    if(error){
        console.log(error);
    }else{
      res.send(docs)
    }
  })
})
//자유게시판 삭제
router.post('/delete', (req, res) => {
  bordF.deleteOne({_id: req.body.id}, function(err, result){
    if(error){
        console.log(error);
    }else{
      res.send("delete success")
    }
  })
})
//자유게시판 검색
router.post('/search', (req, res) => {
  bordF.find({ title: new RegExp('.*' + req.body.search + '.*')}, (err, docs) => {
    if (err) return res.status(500).send({error: 'failed'});
    else res.send(docs)
  })
})

module.exports = router