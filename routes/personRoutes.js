const express = require('express');
const router = express.Router();
const Person = require('./../module/person');

router.get('/', async (req, res) => {
    try {
    // Use the Mongoose model to fetch all persons from the
    const result = await Person.find();
 
    // Send the list of persons as a JSON response
    res.json(result);
    } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
    })

    router.post('/', async (req, res) =>{
        try{
       
           const data = req.body // Assuming the request body contain person data
       
           const new_person = new Person(data);
           // new_person.name = data.name;
           // new_person.age  = data.age;
           // new_person.email = data.email;
       
           // save the new Person  data 
           const response = await new_person.save();
           console.log('data Saved');
           res.status(200).json(response);
       
        }
        catch(err){
           console.log(err);
           res.status(500).json({error: 'Internal server error'});
       
        } 
       })

       router.get('/:workType', async(req, res)=>{
        try {
           const workType = req.params.workType;  // // Extract  the Worktype from the URL parameter
           if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
              const response = await Person.find({work: workType});
              console.log('response fetched');
              res.status(200).json(response);
           }else{
              res.status(404).json({error: 'Invalid work Type'});
           }
           
        } catch(err){
           console.log(err);
           res.status(500).json({error: 'Internal Server Error'});
            
        }
        
        })

        //update Querise

        router.put('/:id', async (req, res)=>{
            try {
                const personId = req.params.id; //Extract the Id from the URL Parameters
                const updatePersonData = req.body; //Update data fron the Persons.

                const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
                    new: true, //Return the Updated document
                    runValidators: true, // Run Mongoose validations
                })

                if (!response) {
                    return res.status(404).json({ error: 'Person not Found' });
                }
                console.log('data Updated');
                res.status(200).json(response);

            } catch (err){
                console.log(err);
                res.status(500).json({error: 'Internal Server Error'});
            }

        })
        // patch Method
        
        router.patch('/:id', async (req, res)=>{
            try {
                const personId = req.params.id; //Extract the Id from the URL Parameters
                const updatePersonData = req.body; //Update data fron the Persons.

                const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
                    new: true, //Return the Updated document
                    runValidators: true, // Run Mongoose validations
                })

                if (!response) {
                    return res.status(404).json({ error: 'Person not Found' });
                }
                console.log('data Updated');
                res.status(200).json(response);

            } catch (err){
                console.log(err);
                res.status(500).json({error: 'Internal Server Error'});
            }

        })

        //Delete Method

        router.delete('/:id', async (req, res)=>{
            try {
                const personId = req.params.id; //Extract the Id from the URL Parameters

                //Assuming you have a person model
                const response = await Person.findByIdAndDelete(personId);

                if (!response) {
                    return res.status(404).json({ error: 'Person not Found' });
                }
                console.log('data Deleted');
                res.status(200).json(response);

            } catch (err){
                console.log(err);
                res.status(500).json({error: 'Internal Server Error'});
                
            }

        })

        module.exports = router;