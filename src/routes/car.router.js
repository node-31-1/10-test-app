const { getAll, create } = require('../controllers/car.controllers');
const express = require('express');
const upload = require('../utils/multer');

const carRouter = express.Router();

carRouter.route('/cars')
    .get(getAll)
    .post(upload.single('foto'), create);

module.exports = carRouter;