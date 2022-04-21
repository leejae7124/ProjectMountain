const express = require('express');
const fetchData = require('../fetchData/fetchData');
const router = express.Router();
const Mount = require('../model/Mountain.js');
const MountSeoul = Mount.mountainSeoul
const MountBusan = Mount.mountainBusan
const MountDaegu = Mount.mountainDaegu

/*router.post('/', async(req, res) => {  //받아오는 테스트
    try{
        const response = await fetchData('', '', '', '');
        //console.log(response.data.response.body.items)
        res.json(response.data.response.body.items.item)
    }catch(error){
        console.log(error.message)
        res.status(500).send(error)
    }
});*/

//mongodb에 저장
router.post('/init', async(req, res) => {
    try{
        const response = await fetchData('', '01', '', '');
        console.log(response.data.response.body.items)
        const mounts = response.data.response.body.items.item
        MountSeoul.collection.insertMany(mounts);
        response = await fetchData('', '02', '', '');
        mounts = response.data.response.body.items.item
        MountBusan.collection.insertMany(mounts);
        response = await fetchData('', '03', '', '');
        mounts = response.data.response.body.items.item
        MountDaegu.collection.insertMany(mounts);
        console.log('Multiple documents are inserted')
        res.send(response.data.response.body.items)
    }catch(error){
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})

//키워드 별 산
router.get('/keyword', async(req, res) => {  
    try{
        const response = await fetchData('', '', '', '');
        console.log(response.data.response.body.items)

        //if(response.data.response.body.items)

        res.json(response.data.response.body.items.item)
    }catch(error){
        console.log(error.message)
        res.status(500).send(error)
    }
});

module.exports = router