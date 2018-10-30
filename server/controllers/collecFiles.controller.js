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

/*exports.createFile = function(req, res, next) {
    if(!req.params.todoId)
        return res.status(400).json({status: 400, message: "Error, req don't has todoId"});
    var db = mongoose.connection.db;
    var mongoDriver = mongoose.mongo;
    var gfs = new Grid(db, mongoDriver);
    console.log(req.files.file)
    var writestream = gfs.createWriteStream({
        filename: req.files.file.name,
        mode: 'w',
        content_type: req.files.file.type,
        metadata: {
            filename: req.files.file.name,
            mimetype: req.files.file.type,
            todoId: req.params.todoId
        }
    });

    fs.createReadStream(req.files.file.path).pipe(writestream);

    writestream.on('close', function(file) {
        ToDo.findById(req.params.todoId, function(err, todo) {
                // handle error
                var _id = file._id.toString();
                if (todo.files.indexOf(_id) == -1)
                    todo.files.push(_id);
                todo.save(function(err, updatedTodo) {
                    // handle error
                    return res.status(200).json({
                            status: 200,
                            obj: updatedTodo,
                            message: "Successfully updated todo with _id file"
                });
        });
        fs.unlink(req.files.file.path, function(err) {
                // handle error
                console.log('success!')
            });
        });
    });
}*/


// exports.createFile ok with multer-gridfs-storage or busboy

exports.createFile = function(req, res, next){
    // let db = mongoose.connection.db;
    // let driverMongo = mongoose.mongo;
    // let gfs = new Grid(db, driverMongo);
    // req.pipe(req.busboy);
    // req.busboy.on('file', (filename, file, filedname, fileEncoding, mimetype)=>{
    //     var obj = {
    //         filename: filename,
    //         encoding: fileEncoding,
    //         mimetype: mimetype
    //     }
    //     req.busboy.on("field", (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetyped)=>{
    //         var ws = gfs.createWriteStream({
    //             _id: mongoose.Types.ObjectId().toString(),
    //             bucketName: "gfsFile",
    //             filename: filename,
    //             mode: 'w',
    //             contentType: mimetype,
    //             metadata: {
    //                 filename: obj.filename,
    //                 encoding: obj.encoding,
    //                 mimetype: obj.mimetype,
    //                 todoId: val
    //             }
    //         });
    //         //fs.createReadStream(req.files.file.path).pipe(ws);
    //         ws.on('close', function(file) {
    //             console.log('Doc Written to DB');
    //         });
    //         file.on('data', function(data) {
    //             console.log('GOT DATA');
    //         });
    //         file.pipe(ws);
    //     });
    // });
    // req.busboy.on('finish', function() {
    //     res.json({success:true, msg: 'Successfully Uploaded Doc'});
    // });

    //soltuion behind this fired fine but don't have hand on what you send in db
    collecFile(req, res, (err) => {
        if(err){
            console.log(err)
            res.status(400).json(ERROR("Upload file failed"));
            return;
        }
        res.status(200).json({status: 200, message: "Successfully file uploaded"});
    });
}
