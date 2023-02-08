// REQUIREMENTS

// Router
const {Router} = require('express');
const router = Router();

// Controllers
const {
  getAllUsersController,
  createUserController,
  loginController
} = require('../controller/users');


// ROUTES

// getAll
router.get(
  '/users',
  getAllUsersController
);

// create
router.post(
  '/users',
  createUserController
);

// put - login
router.put(
  '/users',
  loginController
);


// EXPORTS
module.exports = router;