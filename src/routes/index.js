const express = require('express');
const productRouter = require('./product.router');
const cityRouter = require('./city.router');
const userRouter = require('./user.router');
const carRouter = require('./car.router');
const router = express.Router();

// colocar las rutas aquí
router.use(productRouter);
router.use(cityRouter);
router.use(userRouter);
router.use(carRouter);

module.exports = router;