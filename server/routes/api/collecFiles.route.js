const express = require('express');
const CollecFilesRoute = express.Router();
<<<<<<< HEAD
let FileCtrl = require('../../controllers/collecFiles.controller');
CollecFilesRoute.get('/', FileCtrl.getFiles)
                .get('/download/:fileId', FileCtrl.getFile)
=======
var multiparty = require('connect-multiparty')();
let FileCtrl = require('../../controllers/collecFiles.controller');
CollecFilesRoute.get('/', FileCtrl.getFiles)
                .get('/download/:fileId', FileCtrl.getFile)
                // .post('/upload/:todoId', multiparty, FileCtrl.createFile);
>>>>>>> testMultipleGridFSSolution
                .post('/upload/:todoId', FileCtrl.createFile);

module.exports = CollecFilesRoute;
