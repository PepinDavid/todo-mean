const express = require('express');
const CollecFilesRoute = express.Router();
var passport = require('passport');
let FileCtrl = require('../../controllers/collecFiles.controller');

CollecFilesRoute.get('/', passport.authenticate('jwt', {session: false}), FileCtrl.getFiles)
                .post('/:fileId', passport.authenticate('jwt', {session: false}), FileCtrl.removeFile)
                .get('/attachment/:attachmentId', passport.authenticate('jwt', {session: false}), FileCtrl.getFilesByAttachment)
                .post('/attachment/:attachmentId', passport.authenticate('jwt', {session: false}), FileCtrl.removeAllFilesByAttachment)
                .get('/download/:fileId', passport.authenticate('jwt', {session: false}), FileCtrl.downloadFile)
                .post('/upload/:attachmentId', passport.authenticate('jwt', {session: false}), FileCtrl.createFile);

module.exports = CollecFilesRoute;

function debugPassport(a,b,c){
    console.log(a)
    console.log(b)
    console.log(c)
    return;
}
