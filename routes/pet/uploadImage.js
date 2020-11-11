const router = require('express').Router()
const formidable = require('formidable');
const AWS = require('aws-sdk');
const {createUUID} = require('../../utility')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

router.post('/', (req, res) => {
    const form = formidable({ 
        multiples: false
     });
 
    form.parse(req, (error, fields, files) => {
        if (error) {
            console.log(error);
            res.json({status: false})
        } else {
            jwt.verify(fields.token, process.env.SECRET, (error, decoded) => {
                if (!error && decoded && decoded.userUUID) {
                    const s3 = new AWS.S3();
                    const bucket = process.env.S3_BUCKET
                    const params = {
                        Bucket: bucket,
                        Key: createUUID() + path.extname(files.image.name),
                        Body: fs.createReadStream(files.image.path)
                    };
                    s3.upload(params, (error, data) => {
                        if (error) {
                            fs.unlinkSync(files.image.path)
                            throw error;
                        } else {
                            fs.unlinkSync(files.image.path)
                            res.json({status: true, imageURL: data.Location})
                        }
                    });
                } else {
                    fs.unlinkSync(files.image.path)
                    console.log("fail");
                }
            })
        }
    });
});

module.exports = router;