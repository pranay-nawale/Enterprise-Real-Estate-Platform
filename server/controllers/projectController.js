const Project = require('../models/Project');
const crudController = require('./crudController');
module.exports = crudController(Project);
