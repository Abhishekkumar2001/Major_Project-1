const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/major_development').then(() =>{
    console.log("MongoDB connected with the database")
}).catch((err) => {
    console.log(err);
});

const db = mongoose.connection;


module.exports = db;