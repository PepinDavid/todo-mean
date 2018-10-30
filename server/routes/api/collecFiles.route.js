const express = require('express');
const CollecFilesRoute = express.Router();
var multiparty = require('connect-multiparty')();
let FileCtrl = require('../../controllers/collecFiles.controller');
CollecFilesRoute.get('/', FileCtrl.getFiles)
                .get('/download/:fileId', FileCtrl.getFile)
                // .post('/upload/:todoId', multiparty, FileCtrl.createFile);
                .post('/upload/:todoId', FileCtrl.createFile);

module.exports = CollecFilesRoute;
