const Testimonial = require('../models/Testimonial');
const crudController = require('./crudController');
module.exports = crudController(Testimonial);
