const express = require("express");
const Product = require("./models/product.model.js");
const router = express.Router();
const {getProducts}=require('../controller/product.controller.js');

router.get('/', getProducts );
