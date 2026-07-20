const Faq = require('../models/Faq');
const crudController = require('./crudController');
module.exports = crudController(Faq);
