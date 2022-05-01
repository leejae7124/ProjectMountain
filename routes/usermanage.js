const express = require('express');
const router = express.Router();
const { User } = require("../model/User");
const { auth } = require('../middleware/auth');

router.post('/register', (req, res) => {
  //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
  //그것들을  데이터 베이스에 넣어준다. 
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) {
    //err code가 11000은 중복된 값이 들어간 경우
      if (err.code == 11000) return res.json({success: false, message: 'email or name duplicate'})
      else return res.json({ success: false, err })
    }
    return res.status(200).json({
        success: true
    })
  })
})

router.post('/login', (req, res) => {
  // console.log('ping')
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // console.log('user', user)
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)
      // console.log('isMatch',isMatch)
  
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
  
        //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
  
        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, 
            userId: user._id, 
            usertoken: user.token, 
            email: req.body.email, 
            name: req.body.name})
      })
    })
  })
})

router.post('/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    phone: req.user.phone,
    userImage: req.usr.userImage,
    bord: req.user.bord,
    badge: req.user.badge
  })
})

router.post('/logout', auth, (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.status(500).json({ success: false, err }); 
      return res.status(200).send({
        success: true
      })
    })
})

module.exports = router