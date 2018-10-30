const multer = require('multer');
const path = require('path');
//use multer for store files in server

const DIR = path.join(__dirname, '../' , 'public/');

var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, DIR);
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage});

module.exports = upload;
