const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels'  //db is my database name

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