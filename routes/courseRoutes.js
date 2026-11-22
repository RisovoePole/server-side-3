const express = require('express');

const courseController = require('../controllers/courseController');
const validateCourse = require('../middleware/validateCourse');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/courses'));

router.get('/courses', courseController.index);
router.get('/courses/new', courseController.newForm);
router.post('/courses', validateCourse, courseController.create);
router.get('/courses/:id', courseController.details);
router.get('/courses/:id/edit', courseController.editForm);
router.post('/courses/:id/edit', validateCourse, courseController.update);
router.post('/courses/:id/delete', courseController.remove);

module.exports = router;
