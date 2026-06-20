const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { createSaleTransaction } = require('../services/saleService');

exports.getSales = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      sa.sale_id,
      p.product_name,
      sa.quantity,
      sa.sale_price,
      sa.sale_date
    FROM sales sa
    INNER JOIN products p ON sa.product_id = p.product_id
    ORDER BY sa.sale_id DESC
  `);

  res.json({ success: true, data: rows });
});

exports.createSale = asyncHandler(async (req, res) => {
  const saleId = await createSaleTransaction(req.body);

  res.status(201).json({
    success: true,
    message: 'Sale recorded and stock reduced',
    id: saleId
  });
});