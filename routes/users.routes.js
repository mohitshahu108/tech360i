module.exports = (app) =>{
    const users = require('../controllers/users.controller');

    //Create a new User
    app.post('/users', users.create);

    //Retrieve all users
    app.get('/users', users.findAll);

    //Retrieve a single user with userID
    app.get('/users/:userID', users.findOne);

    //Update a user with userID
    app.put('/users/:userID', users.update);

    //Delete a User with userID
    app.delete('/users/:userID', users.delete);


     //singin user
    app.post('/users/signin', users.signin);
    
    
}