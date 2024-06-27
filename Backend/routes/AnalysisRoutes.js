const express = require('express');
const router = express.Router();
const uploadMulter = require('../middleware/uploadMulter');
const fileController = require('../controllers/fileController');
const analysisController = require('../controllers/AnalysisController');

router.post('/upload', fileController.uploadFile);

router.post('/averageheight', analysisController.averageHeight);
router.post('/averagewidth', analysisController.averageWidth);
router.post('/distributionmap', analysisController.distributionMap);
module.exports = router;
