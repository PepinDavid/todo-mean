const express = require('express');
const CollecFilesRoute = express.Router();
let FileCtrl = require('../../controllers/collecFiles.controller');
CollecFilesRoute.get('/', FileCtrl.getFiles)
                .get('/download/:fileId', FileCtrl.getFile)
                .post('/upload/:todoId', FileCtrl.createFile);

module.exports = CollecFilesRoute;
