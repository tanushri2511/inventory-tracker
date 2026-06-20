const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getSuppliers = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM suppliers ORDER BY supplier_name ASC'
  );

  res.json({ success: true, data: rows });
});

exports.createSupplier = asyncHandler(async (req, res) => {
  const { supplier_name, contact_person, phone, email, address } = req.body;

  if (!supplier_name) {
    return res.status(400).json({
      success: false,
      message: 'supplier_name is required'
    });
  }

  const [result] = await pool.execute(
    `INSERT INTO suppliers (supplier_name, contact_person, phone, email, address)
     VALUES (?, ?, ?, ?, ?)`,
    [supplier_name, contact_person || null, phone || null, email || null, address || null]
  );

  res.status(201).json({
    success: true,
    message: 'Supplier created',
    id: result.insertId
  });
});