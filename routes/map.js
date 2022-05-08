const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.body)
    res.render('map', {
        javascriptkey: '770f232b413de4c27700024cd1dfc080',
        x: Number(req.body.x),
        y: Number(req.body.y)
    })
    res.json({message: 'yes'})
})

module.exports = router