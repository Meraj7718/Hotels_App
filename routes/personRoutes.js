const express = require('express');
const router = express.Router();
const Person = require('./../module/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// // ProfileRoute
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data:", userData);

        // Assuming the JWT payload contains an 'id' field
        const userId = userData.id;
        const user = await Person.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });

    } catch (err) {
        console.error('Error fetching person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// router.get('/profile', jwtAuthMiddleware, async (req, res) => {
//     try{
//         const userData = req.user;
//         console.log("User Data:", userData);

//         const userId = userData.id;
//         const user = await Person.findById(userId);

//         res.status(200).json({user});

//     }catch(err){
//         console.error('Error fetching persons:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })



//GET Method to get Person Data 
router.get('/', jwtAuthMiddleware, async (req, res) => {
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

    router.post('/signup', async (req, res) =>{
        try{
       
           const data = req.body // Assuming the request body contain person data
       
           const new_person = new Person(data);
           // new_person.name = data.name;
           // new_person.age  = data.age;
           // new_person.email = data.email;
       
           // save the new Person  data 
           const response = await new_person.save();
           console.log('data Saved');

           const payload = {
                id: response.id,
                username: response.username
           }
           console.log(JSON.stringify(payload));
           const token = generateToken(payload);
           console.log("Token is: ", token);


           res.status(200).json({response: response, token: token});
       
        }
        catch(err){
           console.log(err);
           res.status(500).json({error: 'Internal server error'});
       
        } 
       })

       //login Route
       router.post('/login', async (req, res) => {
        try {
            // Extract the username & password from the request body
            const { username, password } = req.body;
    
            // Find the user by username
            const user = await Person.findOne({ username: username });
    
            // If user doesn't exist or password doesn't match, return error
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }
    
            // Generate token
            const payload = {
                id: user.id,
                username: user.username,
            };
            const token = generateToken(payload);
    
            // Return token as a response
            res.json({ token });
    
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    

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