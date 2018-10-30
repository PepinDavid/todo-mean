const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird
let mongo = mongoose.connect('mongodb://127.0.0.1:27017/my_todo', { useNewUrlParser: true })
    .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/my_todo`)})
    .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/my_todo`)});

module.exports = mongo;
