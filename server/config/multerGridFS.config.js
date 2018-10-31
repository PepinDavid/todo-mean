//use in middleWare in router collecFiles post("/upload")

const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1:27017/my_todo';
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
const multer = require('multer');

let storage = GridFsStorage({
    url: dbUrl,
    gfs: ()=>{return Grid(mongoose.connection.db, mongoose.mongo);},
    file: (req, file)=>{
        if(!req.params.todoId)
            return null;
        let f = {
            filename: file.originalname.split('.')[0]+"_"+Date.now()+"."+file.originalname.split('.')[1],
            bucketName: "gfsFile",
            uploadDate: Date.now(),
            metadata: {
                originalname: file.originalname,
                mimetype: file.mimetype,
                encoding: file.encoding,
                fieldname: file.fieldname,
                todoId: req.params.todoId
            }
        };
        return f;
    }
});

var collecFile = multer({storage:storage});

module.exports = collecFile.single('file');
