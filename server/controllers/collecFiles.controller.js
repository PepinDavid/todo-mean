let collecFile = require('../config/multerGridFS.config');
let fs = require('fs');
const mongoose = require('mongoose');
let Grid = require('gridfs-stream');
let ToDo = require('../models/todo.model');

function ERROR(e) {
    if (typeof e === "string")
        return {
            status: 400,
            message: e
        };
    else
        return {
            status: 400,
            message: e.message
        };
}

exports.getFile = function(req, res, next) {
    if(!req.params.fileId)
        return res.status(400).json({status: 400, message: "Error, req don't has fileId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);

    var readstream = gfs.createReadStream({
      _id: req.params.id
   });
   readstream.pipe(res);
};

exports.getFiles = function(req, res, next) {
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    let filesData = [];
    let count = 0;
    gfs.find().toArray((err, files)=>{
        if(!files || files.length < 1)
            return res.status(400).json({status: 400, message: "Error, None files"});

        var readstream = gfs.createReadStream({
            filename: files[0].filename
        });
        res.set('Content-Type', files[0].contentType);
        return readstream.pipe(res);
    });
};

exports.createFile = function(req, res, next){
    collecFile(req, res, (err) => {
        if(err){
            console.log(err)
            res.status(400).json(ERROR("Upload file failed"));
            return;
        }
        res.status(200).json({status: 200, message: "Successfully file uploaded"});
    });
}
