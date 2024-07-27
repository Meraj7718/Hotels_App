const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

Personschema.pre('save', async function(next){
const person = this;

// hash the password only if it has been modified (or is new)
if(!person.isModified('password'))  return next();

try {

//hash password generation
const salt = await bcrypt.genSalt(10);

// hash password
const hashedPassword = await bcrypt.hash(person.password, salt);


//overide the plian password with the hashed one
person.password = hashedPassword;

next();

}catch(err){
    return next(err);
    
}


})

Personschema.methods.comparePassword = async function(candidatePassword){
try {

//use bcrypt password the provide password with hashnode password
const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;        

} catch(err){
        
    throw err;
        
}}


//create Person Model

const Person =  mongoose.model('Person', Personschema);
module.exports = Person;