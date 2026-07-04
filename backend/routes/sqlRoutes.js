const express = require('express');
const sqlController = require('../controllers/sqlController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.post('/generate', sqlController.generateSQL);
router.post('/explain', sqlController.explainSQL);
router.post('/run', sqlController.runSQL);
router.get('/quiz', sqlController.quiz);

module.exports = router;