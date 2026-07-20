const Inquiry = require('../models/Inquiry');
const crudController = require('./crudController');
module.exports = crudController(Inquiry);
