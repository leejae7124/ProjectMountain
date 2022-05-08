const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('map', {
        javascriptkey: '770f232b413de4c27700024cd1dfc080',
        x: 37.44447311198552,
        y: 126.96388893520306
    })
})

module.exports = router