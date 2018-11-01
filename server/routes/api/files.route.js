const express = require('express');
const FilesRoute = express.Router();
let multerConfig = require('../../config/multer.config');
let FileCtrl = require('../../controllers/files.controller');

FilesRoute.get('/', FileCtrl.exportFiles)
        .get('/download/:filename', FileCtrl.downloadFile)
        .post('/upload', multerConfig.single('file'), FileCtrl.uploadFile);

module.exports = FilesRoute;
