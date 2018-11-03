const mongoose = require('mongoose');
const gridCollection = require('../config/db.config').gridFS;
let collecFile = require('../config/multerGridFS.config');
let fs = require('fs');
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
function removeChunks(connexion, id, response){
    connection.collection(gridCollection+".chunks", function (error, collection) {
        if(error)response.status(400).json(ERROR("Connexion to "+gridCollection+".chunks failed"));
        collection.removeMany({files_id: id}, function(err, respCollec){
            if(err) response.status(400).json(ERROR("Remove file failed"));
            response.status(200).json({status: 200, message: "Successfully remove file"});
        });
   });
}

exports.downloadFile = function(req, res, next) {
    if(!req.params.fileId)
        return res.status(400).json({status: 400, message: "Error, req don't has fileId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    gfs.collection(gridCollection);
    let id = mongoose.Types.ObjectId(req.params.fileId);
    gfs.files.find({_id: id}).toArray((err, files)=>{
        if(!files || files.length < 1)
            return res.status(404).json({status: 404, message: "Error, None files"});
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: gridCollection
        });
        res.set('Content-Type', files[0].contentType);

        return readstream.pipe(res);
    });
};

exports.getFilesByTodo = function(req, res, next) {
    if(!req.params.todoId)
        return res.status(400).json({status: 400, message: "Error, req don't has todoId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    let filesData = [];
    let count = 0;
    gfs.collection(gridCollection);
    let id = req.params.todoId;
    console.log("idTodo : "+id)
    gfs.files.find({"metadata.todoId": id}).toArray((err, files)=>{
        if(!files || files.length < 1)
            return res.status(404).json({status: 404, message: "Error, None files"});
        files.forEach((file) => {
            filesData[count++] = {
                id: file._id.toString(),
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType,
                mimetype: file.metadata.mimetype
            }
        });
        res.json(filesData);
    });
};

exports.getFiles = function(req, res, next){
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    let filesData = [];
    let count = 0;
    gfs.collection(gridCollection);
    gfs.files.find().toArray((err, files)=>{
        if(!files || files.length < 1)
            return res.status(404).json({status: 404, message: "Error, None files"});

        files.forEach((file) => {
            filesData[count++] = {
                id: file._id.toString(),
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType,
                mimetype: file.metadata.mimetype
            }
        });
        res.json(filesData);
    });
}
exports.createFile = function(req, res, next){
    collecFile(req, res, (err) => {
        console.log(req.fileId);
        if(err){
            console.log(err)
            res.status(400).json(ERROR("Upload file failed"));
            return;
        }
        res.status(200).json({status: 200, obj: {_id: req.fileId}, message: "Successfully file uploaded"});
    });
}

exports.removeAllFilesByTodo = function(req, res, next){
    if(!req.params.todoId)
        return res.status(400).json({status: 400, message: "Error, req don't has todoId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    let filesData = [];
    let count = 0;
    gfs.collection(gridCollection);
    let id = req.params.todoId;
    gfs.files.remove({"metadata.todoId": id}, function (err, gridStore) {
        if(err){
            console.log(err)
            res.status(400).json(ERROR("Remove file failed"));
            return;
        }
        res.status(200).json({status: 200, message: "Successfully remove file"});
    });
}

exports.removeFile = function(req, res, next){
    if(!req.params.fileId)
        return res.status(400).json({status: 400, message: "Error, req don't has fileId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    let filesData = [];
    let count = 0;
    gfs.collection(gridCollection)
    let id = mongoose.Types.ObjectId(req.params.fileId);
    gfs.files.remove({_id: id}, function (err, gridStore) {
        if(err) res.status(400).json(ERROR("Remove file failed"));

    });
}
