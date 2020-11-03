const router = require('express').Router()
const formidable = require('formidable');
const AWS = require('aws-sdk');
const {createUUID} = require('../../utility')
const path = require('path')
const fs = require('fs')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

router.post('/', (req, res) => {
    const form = formidable({ 
        multiples: false
     });
 
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.json({status: false})
        } else {
            // if fields.token valid proceed with the upload logic
            // if token invalid -> remove the temp image with fs.unlinkSync(files.image.path) and response with res.json({status: false})
            /*
                use the jwt token decoder logic to validate the token:
                jwt.verify(fields.token, process.env.SECRET, (error, decoded) => {
                    if (!error && decoded && decoded.userUUID) {
                        // proceed with the upload
                    } else {
                        // fail with res.json({status: false})
                    }
                })
            */

            const s3 = new AWS.S3();
            const bucket = process.env.S3_BUCKET
            const params = {
                Bucket: bucket,
                Key: createUUID() + path.extname(files.image.name),
                Body: fs.createReadStream(files.image.path)
            };
        
            s3.upload(params, (err, data) => {
                if (err) {
                    fs.unlinkSync(files.image.path)
                    throw err;
                } else {
                    fs.unlinkSync(files.image.path)
                    res.json({status: true, imageURL: data.Location})
                    console.log(fields); // fields are interesting for authentication
                }
            });
        }
    });
});

module.exports = router;