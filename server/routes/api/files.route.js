const express = require('express');
const FilesRoute = express.Router();
let multerConfig = require('../../config/multer.config');
let FileCtrl = require('../../controllers/files.controller');

FilesRoute.get('/', FileCtrl.exportFiles)
        .get('/:filename', FileCtrl.downloadFile)
        .post('/upload', multerConfig.single('file'), FileCtrl.uploadFile);
        // .post('/upload', middleWare);

var middleWare = function(req, res, next){
    req.form.complete((err, files)=>{
        if(err)
            res.status(400).json({message: 'Error from formData'})
        console.log("upload file %s and %s", files.image.filename, files.image.path);
    });

    req.form.on('progress', (byteReceived, byteExpected)=>{
        var percentReceived = (byteReceived / byteExpected * 100) | 0;
         process.stdout.write('Uploading: %' + percent + '\r');
    });
}
module.exports = FilesRoute;
