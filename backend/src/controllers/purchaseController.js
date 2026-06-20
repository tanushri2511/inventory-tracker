const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');
const { createPurchaseTransaction } = require('../services/purchaseService');

exports.getPurchases = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      pu.purchase_id,
      p.product_name,
      s.supplier_name,
      pu.quantity,
      pu.purchase_price,
      pu.purchase_date
    FROM purchases pu
    INNER JOIN products p ON pu.product_id = p.product_id
    LEFT JOIN suppliers s ON pu.supplier_id = s.supplier_id
    ORDER BY pu.purchase_id DESC
  `);

  res.json({ success: true, data: rows });
});

exports.createPurchase = asyncHandler(async (req, res) => {
  const purchaseId = await createPurchaseTransaction(req.body);

  res.status(201).json({
    success: true,
    message: 'Purchase recorded and stock updated',
    id: purchaseId
  });
});