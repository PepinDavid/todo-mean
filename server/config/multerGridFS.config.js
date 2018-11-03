//use in middleWare in router collecFiles post("/upload")

const mongoose = require('mongoose');
const dbUrl = require('./db.config').db;
const gridCollection = require('./db.config').gridFS;
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const multer = require('multer');

let storage = GridFsStorage({
    url: dbUrl,
    gfs: ()=>{return Grid(mongoose.connection.db, mongoose.mongo);},
    file: (req, file)=>{
        if(!req.params.todoId)
            return null;
        var id = mongoose.Types.ObjectId();
        let f = {
            id: id,
            filename: file.originalname.split('.')[0]+"_"+Date.now()+"."+file.originalname.split('.')[1],
            bucketName: gridCollection,
            uploadDate: Date.now(),
            metadata: {
                originalname: file.originalname,
                mimetype: file.mimetype,
                encoding: file.encoding,
                fieldname: file.fieldname,
                todoId: req.params.todoId
            }
        };
        console.log(id.toString())
        req.fileId = id.toString();
        return f;
    }
});

var collecFile = multer({storage:storage});

module.exports = collecFile.single('file');
