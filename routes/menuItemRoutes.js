const express = require('express');
const router = express.Router();
const MenuItem = require('./../module/MenuItem');

router.post('/', async (req, res) =>{
    try{
   
       const data = req.body // Assuming the request body contain person data
   
       const newMenu = new MenuItem(data);
       // new_person.name = data.name;
       // new_person.age  = data.age;
       // new_person.email = data.email;
   
       // save the new Person  data 
       const response = await newMenu.save();
       console.log('data Saved');
       res.status(200).json(response);
   
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server error'});
   
    } 
   })

   router.get('/', async (req, res) =>{
      try {
            const data = await MenuItem.find();
            console.log('data fetched');
            res.status(200).json(data);
      } catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal Server Error'});

      }
})

module.exports = router;