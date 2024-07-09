const express = require('express');
const router = express.Router();
const uploadMulter = require('../middleware/uploadMulter');
const fileController = require('../controllers/fileController');
const analysisController = require('../controllers/AnalysisController');

router.post('/upload', fileController.uploadFile);

router.post('/averageheight', analysisController.averageHeight);
router.post('/averagewidth', analysisController.averageWidth);
router.post('/diversitymap', analysisController.diversityMap);
router.post('/pie_distribution', analysisController.pieDistribution);
router.post('/heatmap_carbonseq', analysisController.heatMap);
router.post('/summary_tree', analysisController.summaryTree);
module.exports = router;
