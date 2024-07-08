const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://localhost:27017/hotels'  //db is my database name
// const mongoURL = 'mongodb+srv://meraj5849:Meraj7718@hotels.crgu5fn.mongodb.net/';
const mongoURL = process.env.MONGODB_URL
// const mongoURL = process.env.MONGODB_URL_LOCAL 


//setup MongoDB Connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//get the Default Connection
const db = mongoose.connection;

//Define event Listner for database connection

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB server connection error:', err);
});


db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
});


//Export the Database Connection

module.exports = db;