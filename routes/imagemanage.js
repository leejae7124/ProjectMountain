const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3')
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ 
    accessKeyId: 'AKIATXM7D6M33S6VWN7C', 
    secretAccessKey: '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', 
    region: 'ap-northeast-2', 
});

const storage = multerS3({ 
    s3: s3,
    bucket: 'project-mountain-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname }) 
    },
    key: function (req, file, cb) { 
        cb(null, `uploads/${Date.now()}_${file.originalname}`)
    },
})
upload = multer({ storage: storage });

router.post('/uploadOne', upload.single('img'), (req, res) => {
    try {
        //console.log(req.file)
        //let location = { url: req.file.location};
        //res.status(200).send(location)
        res.status(200).send(req.file.location);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error');
    }  
})

module.exports = router
