const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('map', {
        jsvascriptkey: '770f232b413de4c27700024cd1dfc080'
    })
})

module.exports = router