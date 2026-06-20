const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getCategories = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM categories ORDER BY category_name ASC'
  );

  res.json({ success: true, data: rows });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({
      success: false,
      message: 'category_name is required'
    });
  }

  const [result] = await pool.execute(
    'INSERT INTO categories (category_name) VALUES (?)',
    [category_name]
  );

  res.status(201).json({
    success: true,
    message: 'Category created',
    id: result.insertId
  });
});
