const Hero = require('../models/Hero');
const crudController = require('./crudController');
module.exports = crudController(Hero);
