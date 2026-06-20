const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getProducts = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      p.product_id,
      p.sku,
      p.product_name,
      c.category_name,
      s.supplier_name,
      p.unit_price,
      p.reorder_level,
      p.current_stock,
      p.created_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.category_id
    LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id
    ORDER BY p.product_id DESC
  `);

  res.json({ success: true, data: rows });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [rows] = await pool.execute(
    'SELECT * FROM products WHERE product_id = ?',
    [id]
  );

  if (!rows.length) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({ success: true, data: rows[0] });
});

exports.createProduct = asyncHandler(async (req, res) => {
  console.log('REQ BODY =>', req.body);

  const {
    sku,
    product_name,
    category_id,
    supplier_id,
    unit_price,
    reorder_level,
    current_stock
  } = req.body;

  if (!sku || !product_name || unit_price == null) {
    return res.status(400).json({
      success: false,
      message: 'sku, product_name and unit_price are required'
    });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO products
      (sku, product_name, category_id, supplier_id, unit_price, reorder_level, current_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sku,
        product_name,
        category_id || null,
        supplier_id || null,
        unit_price,
        reorder_level || 0,
        current_stock || 0
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      id: result.insertId
    });
  } catch (dbError) {
    console.error('MYSQL INSERT ERROR =>', dbError);

    res.status(500).json({
      success: false,
      message: dbError.message
    });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    sku,
    product_name,
    category_id,
    supplier_id,
    unit_price,
    reorder_level,
    current_stock
  } = req.body;

  const [check] = await pool.execute(
    'SELECT * FROM products WHERE product_id = ?',
    [id]
  );

  if (!check.length) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  await pool.execute(
    `UPDATE products
     SET sku = ?, product_name = ?, category_id = ?, supplier_id = ?, unit_price = ?, reorder_level = ?, current_stock = ?
     WHERE product_id = ?`,
    [
      sku,
      product_name,
      category_id || null,
      supplier_id || null,
      unit_price,
      reorder_level || 0,
      current_stock || 0,
      id
    ]
  );

  res.json({
    success: true,
    message: 'Product updated successfully'
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.execute(
    'DELETE FROM products WHERE product_id = ?',
    [id]
  );

  if (!result.affectedRows) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }

  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});