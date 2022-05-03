const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    res.send('hi unity')
})

router.post('/post', (req, res) => {
    console.log(req.body.message)
    if(req.body.message == 'android')
        res.send('success')
})

module.exports = router