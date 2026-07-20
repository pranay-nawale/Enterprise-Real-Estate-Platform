const Service = require('../models/Service');
const crudController = require('./crudController');
module.exports = crudController(Service);
