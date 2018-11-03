const express = require('express');
const CollecFilesRoute = express.Router();
let FileCtrl = require('../../controllers/collecFiles.controller');

CollecFilesRoute.get('/', FileCtrl.getFiles)
                .post('/:fileId', FileCtrl.removeFile)
                .get('/todo/:todoId', FileCtrl.getFilesByTodo)
                .post('/todo/:todoId', FileCtrl.removeAllFilesByTodo)
                .get('/download/:fileId', FileCtrl.downloadFile)
                .post('/upload/:todoId', FileCtrl.createFile);

module.exports = CollecFilesRoute;
