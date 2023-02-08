// REQUIREMENTS

// model
const products = require('../../models').products;


// CONTROLLERS

// createProductController
const createProductController = (req, res) => {
  const { name, description, price, image } = req.body;
  return products.create({
      name: name,
      description: description,
      price: price,
      image: image
  })
  .then(products => res.status(201).send(products))
  .catch(error => res.status(500).json(error));
};

// getAllProductsController
const getAllProductsController = (req, res) => {
  return products.findAll()
  .then(products => res.status(200).send(products))
  .catch(error => res.status(404).send(error));
};

// getOneProductController
const getOneProductController = (req, res) => {
  const foundProduct = async () => {
    const { id } = req.params;
    return products.findOne(
        { where : { id:id } }
    )
    .then(product => res.json(product))
    .catch(error => res.json(error));
  };

  foundProduct();
};

// updateProductController
const updateProductController = (req, res) => {
  const foundProduct = async () => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    products.update(
      {
          name: name,
          description: description,
          price: price,
          image: image
      },{
          where: { id: id }
      }
    );

    return res.json({"todo": "ok"});
  };

  foundProduct();
};

// deleteOneProductController
const deleteOneProductController = (req, res) => {
  const foundProduct = async () => {
    const { id } = req.params;

    products.destroy({
      where: { id: id }
    });

    return res.json({"todo": "ok"});
  };

  foundProduct();
};

// EXPORTS
module.exports = {
  createProductController,
  getAllProductsController,
  getOneProductController,
  updateProductController,
  deleteOneProductController
}