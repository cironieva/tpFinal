// REQUIREMENTS

// model
const users = require('../../models').users;

// bcrypt
const bcrypt = require('bcryptjs');


// CONTROLLERS

// getAllUsersController
const getAllUsersController = (req, res) => {
  return users.findAll()
  .then(users => res.status(200).send(users))
  .catch(error => res.status(404).send(error));
  };


// createUserController
const createUserController = (req, res) => {
  
  const foundUser = async () => {
    
    const { email } = req.body;
    
    const userFound = await users.findOne(
      { where : { email: email} }
    );

    if (userFound) {
      res.json({"error": "email ya registrado"});
    }

    else {
      const { name, email, password } = req.body;
      const hash = bcrypt.hashSync(password, 10);

      return users.create({
          name: name,
          email: email,
          hash: hash
      });
    };
  };

  foundUser();
};

// loginController

const loginController = (req, res) => {

  const foundUser = async () => {
    
    const { email } = req.body;
    
    const userFound = await users.findOne(
      { where : { email: email} }
    );

    if (userFound) {
      const { password } = req.body;
      const correctPassword = bcrypt.compareSync(password, userFound.hash);

      if (correctPassword) {
        res.json({"password": "correct"});
      }

      else {
        res.json({"password": "incorrect"});
      }
    }

    else {
      res.json({"password": "incorrect"});
    };
  };

  foundUser();
};

// EXPORTS
module.exports = {
  getAllUsersController,
  createUserController,
  loginController
};