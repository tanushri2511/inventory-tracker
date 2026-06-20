const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboardSummary = asyncHandler(async (req, res) => {
  const [[summary]] = await pool.query(`
    SELECT
      COUNT(*) AS total_products,
      SUM(current_stock) AS total_stock_units,
      SUM(current_stock * unit_price) AS inventory_value
    FROM products
  `);

  res.json({ success: true, data: summary });
});

exports.getLowStockProducts = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(`
    SELECT product_id, sku, product_name, current_stock, reorder_level
    FROM products
    WHERE current_stock <= reorder_level
    ORDER BY current_stock ASC
  `);

  res.json({ success: true, data: rows });
});

exports.getStockMovements = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(`
    SELECT
      sm.movement_id,
      p.product_name,
      sm.movement_type,
      sm.quantity,
      sm.notes,
      sm.created_at
    FROM stock_movements sm
    INNER JOIN products p ON sm.product_id = p.product_id
    ORDER BY sm.movement_id DESC
  `);

  res.json({ success: true, data: rows });
});