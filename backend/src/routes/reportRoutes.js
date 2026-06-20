const express = require('express');
const {
  getDashboardSummary,
  getLowStockProducts,
  getStockMovements
} = require('../controllers/reportController');

const router = express.Router();

router.get('/summary', getDashboardSummary);
router.get('/low-stock', getLowStockProducts);
router.get('/movements', getStockMovements);

module.exports = router;