const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: 'AKIATXM7D6M33S6VWN7C', 
    secretAccessKey: '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', 
    region: 'ap-northeast-2',
});

module.exports = s3;
