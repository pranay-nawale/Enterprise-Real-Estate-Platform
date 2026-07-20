const express = require('express');
const router = express.Router();

const hero = require('../controllers/heroController');
const about = require('../controllers/aboutController');
const service = require('../controllers/serviceController');
const property = require('../controllers/propertyController');
const project = require('../controllers/projectController');
const testimonial = require('../controllers/testimonialController');
const faq = require('../controllers/faqController');
const contact = require('../controllers/contactController');
const inquiry = require('../controllers/inquiryController');

// Hero routes
router.route('/hero').get(hero.getAll).post(hero.create);
router.route('/hero/:id').get(hero.getOne).put(hero.update).delete(hero.delete);

// About routes
router.route('/about').get(about.getAll).post(about.create);
router.route('/about/:id').get(about.getOne).put(about.update).delete(about.delete);

// Service routes
router.route('/services').get(service.getAll).post(service.create);
router.route('/services/:id').get(service.getOne).put(service.update).delete(service.delete);

// Property routes
router.route('/properties').get(property.getAll).post(property.create);
router.route('/properties/:id').get(property.getOne).put(property.update).delete(property.delete);

// Project routes
router.route('/projects').get(project.getAll).post(project.create);
router.route('/projects/:id').get(project.getOne).put(project.update).delete(project.delete);

// Testimonial routes
router.route('/testimonials').get(testimonial.getAll).post(testimonial.create);
router.route('/testimonials/:id').get(testimonial.getOne).put(testimonial.update).delete(testimonial.delete);

// FAQ routes
router.route('/faq').get(faq.getAll).post(faq.create);
router.route('/faq/:id').get(faq.getOne).put(faq.update).delete(faq.delete);

// Contact routes
router.route('/contact').get(contact.getAll).post(contact.create);
router.route('/contact/:id').get(contact.getOne).put(contact.update).delete(contact.delete);

// Inquiry routes
router.route('/inquiries').get(inquiry.getAll).post(inquiry.create);
router.route('/inquiries/:id').get(inquiry.getOne).delete(inquiry.delete);

module.exports = router;
