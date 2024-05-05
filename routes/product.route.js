const express = require("express");
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller.js');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', createProduct);

//update Product

router.put('/:id', updateProduct);

//delete Product
router.delete('/:id', deleteProduct);

module.exports = router;
