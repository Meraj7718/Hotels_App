const mongoose = require('mongoose');

//Define the Person Schema

const Personschema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    age:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    email:{
        type: String,
        unique: true
    },
    mobileNumber:{
        type: Number,
        unique: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
});

//create Person Model

const Person =  mongoose.model('Person', Personschema);
module.exports = Person;