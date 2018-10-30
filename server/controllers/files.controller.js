const _this = this;
const fs = require('fs');
const path = require('path');
const __uploadFoler = path.join(__dirname, '../' , '/public/');

function ERROR(e){
    if(typeof e === "string")
        return {status: 400, message: e};
    else
        return {status: 400, message: e.message};
}

exports.exportFiles = function(req, res, next) {
    console.log('dir ! '+ __uploadFoler)
    let files = [];
    fs.readdir(__uploadFoler, (err, file)=>{
        if(err)
            return res.status(400).json(ERROR(e))
        for(let i = 0; i < file.length; i++){
            files[i] = "http://localhost:3000/api/files/"+file[i];
        }
        if(files.length > 0)
            return res.status(200).json({status: 200, obj: files, message: "Successfully load files"});
        else
            return res.status(401).json({status: 401, obj: [], message: "No files found"})
    });

    // try{
    //     let files = await fs.readdir(__uploadFoler);
    //     if(!files)
    //         return res.status(401).json({status: 401, obj: [], message: "No files found"})
    //     files = files.map((f)=>{
    //         return "http://localhost:300/api/files/"+f
    //     });
    //     return res.status(200).json({status: 200, obj: files, message: "Successfully load files"});
    // }catch(e){
    //     return res.status(400).json(ERROR(e))
    // }
}

exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);
}

exports.uploadFile = (req, res) => {
	res.status(200).json({status: 200, message: 'File uploaded successfully! -> filename = ' + req.file.filename});
}
