// REQUIREMENTS

// Router
const {Router} = require('express');
const router = Router();

// Controllers
const {
  createProductController,
  getAllProductsController,
  getOneProductController,
  updateProductController,
  deleteOneProductController
} = require('../controller/products');


// ROUTES

// Create
router.post(
  '/products',
  createProductController
);

// Read
router.get(
  '/products',
  getAllProductsController
);

// Get One
router.get(
  '/products/:id',
  getOneProductController
);

// Update
router.put(
  '/products/:id',
  updateProductController
);

// Delete
router.delete(
  '/products/:id',
  deleteOneProductController
);

// EXPORTS
module.exports = router;