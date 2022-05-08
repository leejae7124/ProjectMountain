const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('map', {
        javascriptkey: '770f232b413de4c27700024cd1dfc080',
        x: req.body.x,
        y: req.body.y
    })
    res.json({message: 'yes'})
})

module.exports = router