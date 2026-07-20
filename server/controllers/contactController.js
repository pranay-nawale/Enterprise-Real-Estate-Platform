const Contact = require('../models/Contact');
const crudController = require('./crudController');
module.exports = crudController(Contact);
