// // var prompt = require('prompt-sync')();

// // var num1 = prompt("Enther first number:");
// // var num2 = prompt("Enter second number:");
// // const result = num1 + num2;
// // console.log("the sume of a+b is ", result);

// const express = require('express');
// const app = express(); 
// const db = require('./db');
// require('dotenv').config();

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// const PORT = process.env.PORT   || 3000;

// // const Person = require('./module/person');
// // const MenuItem = require('./module/MenuItem');

// //Middelware Function
// const logRequest = (req, res, next) =>{
//     console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.orignalUrl}`);
//     next (); // Move on the next phase
// }

// app.use(logRequest);
// app.get('/khan', function (req, res) {
//     res.send("Welcome to Mehraj World");
// }) 

// app.get('/home', (req, res) =>{
//     var familyMember = {
//         name : "Mehraj",
//         age : "24" ,
//         gender : "M",
// }
//     res.send(familyMember)
// })

// // app.get('/person', async (req, res) => {
// //    try {
// //    // Use the Mongoose model to fetch all persons from the
// //    const result = await Person.find();

// //    // Send the list of persons as a JSON response
// //    res.json(result);
// //    } catch (error) {
// //    console.error('Error fetching persons:', error);
// //    res.status(500).json({ error: 'Internal server error' });
// //    }
// //    })



// // app.post('/person', async (req, res) =>{
// //  try{

// //     const data = req.body // Assuming the request body contain person data

// //     const new_person = new Person(data);
// //     // new_person.name = data.name;
// //     // new_person.age  = data.age;
// //     // new_person.email = data.email;

// //     // save the new Person  data 
// //     const response = await new_person.save();
// //     console.log('data Saved');
// //     res.status(200).json(response);

// //  }
// //  catch(err){
// //     console.log(err);
// //     res.status(500).json({error: 'Internal server error'});

// //  } 
// // })

// // app.post('/menu', async (req, res) =>{
// //     try{
   
// //        const data = req.body // Assuming the request body contain person data
   
// //        const newMenu = new MenuItem(data);
// //        // new_person.name = data.name;
// //        // new_person.age  = data.age;
// //        // new_person.email = data.email;
   
// //        // save the new Person  data 
// //        const response = await newMenu.save();
// //        console.log('data Saved');
// //        res.status(200).json(response);
   
// //     }
// //     catch(err){
// //        console.log(err);
// //        res.status(500).json({error: 'Internal server error'});
   
// //     } 
// //    })

// //    app.get('/menu', async (req, res) =>{
// //       try {
// //             const data = await MenuItem.find();
// //             console.log('data fetched');
// //             res.status(200).json(data);
// //       } catch(err){
// //          console.log(err);
// //          res.status(500).json({error: 'Internal Server Error'});

// //       }
// // })
// // app.get('/person/:workType', async(req, res)=>{
// // try {
// //    const workType = req.params.workType;  // // Extract  the Worktype from the URL parameter
// //    if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
// //       const response = await Person.find({work: workType});
// //       console.log('response fetched');
// //       res.status(200).json(response);
// //    }else{
// //       res.status(404).json({error: 'Invalid work Type'});
// //    }
   
// // } catch(err){
// //    console.log(err);
// //    res.status(500).json({error: 'Internal Server Error'});
    
// // }

// // })

// // Import the Router files
// const personRoutes = require('./routes/personRoutes');
// const menuItemRoutes = require('./routes/menuItemRoutes');
// // use the Routes
// app.use('/person', personRoutes);
// app.use('/menu', menuItemRoutes);



// // Your Express.js code here
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// var prompt = require('prompt-sync')();

// var num1 = prompt("Enther first number:");
// var num2 = prompt("Enter second number:");
// const result = num1 + num2;
// console.log("the sume of a+b is ", result);

const express = require('express');
const app = express(); 
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;



const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// const Person = require('./module/person');
// const MenuItem = require('./module/MenuItem');

//Middelware Function
// 
// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);
// passport.use(new localStrategy(async (USERNAME, password, done) => {
//     // authentication logic here
//     try{
//         console.log('Received credentials:',USERNAME, password);
//         const user = await Person.findOne({username: USERNAME});
//         if(!user)
//             return done(null, false, { message: 'Incorrect username.'});
//         const isPasswordMatch = user.password === password ? true  : false;
//         if(isPasswordMatch){
//             return done(null, user);    
//         }else{
//             return done(null, false, { message: 'Incorrect password.'});
//         }
//     }catch (err){
//         return done(err);
//     }

// }))
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/',function (req, res) {
    res.send("Welcome to Mehraj World");
}) 

app.get('/home', (req, res) =>{
    var familyMember = {
        name : "Mehraj",
        age : "24" ,
        gender : "M",
}
    res.send(familyMember)
})

// app.get('/person', async (req, res) => {
//    try {
//    // Use the Mongoose model to fetch all persons from the
//    const result = await Person.find();

//    // Send the list of persons as a JSON response
//    res.json(result);
//    } catch (error) {
//    console.error('Error fetching persons:', error);
//    res.status(500).json({ error: 'Internal server error' });
//    }
//    })



// app.post('/person', async (req, res) =>{
//  try{

//     const data = req.body // Assuming the request body contain person data

//     const new_person = new Person(data);
//     // new_person.name = data.name;
//     // new_person.age  = data.age;
//     // new_person.email = data.email;

//     // save the new Person  data 
//     const response = await new_person.save();
//     console.log('data Saved');
//     res.status(200).json(response);

//  }
//  catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal server error'});

//  } 
// })

// app.post('/menu', async (req, res) =>{
//     try{
   
//        const data = req.body // Assuming the request body contain person data
   
//        const newMenu = new MenuItem(data);
//        // new_person.name = data.name;
//        // new_person.age  = data.age;
//        // new_person.email = data.email;
   
//        // save the new Person  data 
//        const response = await newMenu.save();
//        console.log('data Saved');
//        res.status(200).json(response);
   
//     }
//     catch(err){
//        console.log(err);
//        res.status(500).json({error: 'Internal server error'});
   
//     } 
//    })

//    app.get('/menu', async (req, res) =>{
//       try {
//             const data = await MenuItem.find();
//             console.log('data fetched');
//             res.status(200).json(data);
//       } catch(err){
//          console.log(err);
//          res.status(500).json({error: 'Internal Server Error'});

//       }
// })
// app.get('/person/:workType', async(req, res)=>{
// try {
//    const workType = req.params.workType;  // // Extract  the Worktype from the URL parameter
//    if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
//       const response = await Person.find({work: workType});
//       console.log('response fetched');
//       res.status(200).json(response);
//    }else{
//       res.status(404).json({error: 'Invalid work Type'});
//    }
   
// } catch(err){
//    console.log(err);
//    res.status(500).json({error: 'Internal Server Error'});
    
// }

// })

// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const Person = require('./module/person');
// use the Routes
app.use('/person', personRoutes);
// app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


// Your Express.js code here
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
