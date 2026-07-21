const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { login } = require('../controllers/authController');

const hero = require('../controllers/heroController');
const about = require('../controllers/aboutController');
const service = require('../controllers/serviceController');
const property = require('../controllers/propertyController');
const project = require('../controllers/projectController');
const contact = require('../controllers/contactController');
const inquiry = require('../controllers/inquiryController');

// ─── Auth route (public) ───────────────────────────────────────────────────
router.post('/auth/login', login);

// ─── Image upload route (protected) ────────────────────────────────────────
router.post('/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided.' });
  }
  // Return the public URL for the uploaded file
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// Multer error handler for this router
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large. Maximum size is 5 MB.' });
  }
  if (err.message) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

// ─── Hero routes ───────────────────────────────────────────────────────────
router.get('/hero', hero.getAll);
router.get('/hero/:id', hero.getOne);
router.post('/hero', protect, hero.create);
router.put('/hero/:id', protect, hero.update);
router.delete('/hero/:id', protect, hero.delete);

// ─── About routes ──────────────────────────────────────────────────────────
router.get('/about', about.getAll);
router.get('/about/:id', about.getOne);
router.post('/about', protect, about.create);
router.put('/about/:id', protect, about.update);
router.delete('/about/:id', protect, about.delete);

// ─── Service routes ────────────────────────────────────────────────────────
router.get('/services', service.getAll);
router.get('/services/:id', service.getOne);
router.post('/services', protect, service.create);
router.put('/services/:id', protect, service.update);
router.delete('/services/:id', protect, service.delete);

// ─── Property routes ───────────────────────────────────────────────────────
router.get('/properties', property.getAll);
router.get('/properties/:id', property.getOne);
router.post('/properties', protect, property.create);
router.put('/properties/:id', protect, property.update);
router.delete('/properties/:id', protect, property.delete);

// ─── Project routes ────────────────────────────────────────────────────────
router.get('/projects', project.getAll);
router.get('/projects/:id', project.getOne);
router.post('/projects', protect, project.create);
router.put('/projects/:id', protect, project.update);
router.delete('/projects/:id', protect, project.delete);

// ─── Contact routes ────────────────────────────────────────────────────────
router.get('/contact', contact.getAll);
router.get('/contact/:id', contact.getOne);
router.post('/contact', protect, contact.create);
router.put('/contact/:id', protect, contact.update);
router.delete('/contact/:id', protect, contact.delete);

// ─── Inquiry routes ────────────────────────────────────────────────────────
// POST is public (visitors submit inquiries from the landing page)
router.get('/inquiries', protect, inquiry.getAll);
router.post('/inquiries', inquiry.create);
router.get('/inquiries/:id', protect, inquiry.getOne);
router.delete('/inquiries/:id', protect, inquiry.delete);

module.exports = router;
