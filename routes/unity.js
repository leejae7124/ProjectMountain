const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Mount = require('../model/Mountain.js');
const Mount_loc_schema = 
[   Mount.mountainSeoul, 
    Mount.mountainBusan, 
    Mount.mountainDaegu, 
    Mount.mountainIncheon, 
    Mount.mountainGwangju, 
    Mount.mountainDaejeon, 
    Mount.mountainUlsan,
    Mount.mountainGyeonggi,
    Mount.mountainGangwon,
    Mount.mountainChungcheongbuk,
    Mount.mountainChungcheongnam,
    Mount.mountainJeonbuk,
    Mount.mountainJeonnam,
    Mount.mountainGyeongbuk,
    Mount.mountainGyeongnam,
    Mount.mountainJeju
]

let locatione = null;



router.get('/get', (req, res) => {
    res.send('hi unity')
})

router.post('/post', (req, res) => {
    console.log(req.body.message)
    if(req.body.message == 'android')
        res.send('success')
})

module.exports = router