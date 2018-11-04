//use in middleWare in router collecFiles post("/upload")

const mongoose = require('mongoose');
const dbUrl = require('./db.config').db;
const gridCollection = require('./db.config').gridFS;
const multer = require('multer');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');

let storage = GridFsStorage({
    url: dbUrl,
    gfs: ()=>{return Grid(mongoose.connection.db, mongoose.mongo);},
    file: (req, file)=>{
        console.log(req.params.attachmentId)
        if(!req.params.attachmentId)
            return {status: 400, message: "File must have an Id attachment"};
        let stringId = req.params.attachmentId;
        console.log(stringId)
        let id = mongoose.Types.ObjectId();
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
                attachmentId: stringId
            }
        };
        req.fileId = id.toString();
        return f;
    }
});

let collecFile = multer({storage:storage});

module.exports = collecFile.single('file');
