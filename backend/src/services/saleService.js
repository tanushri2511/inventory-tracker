const pool = require('../config/db');

exports.createSaleTransaction = async (data) => {
  const { product_id, quantity, sale_price, sale_date } = data;

  if (!product_id || !quantity || !sale_price) {
    const error = new Error('product_id, quantity and sale_price are required');
    error.status = 400;
    throw error;
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [productRows] = await conn.execute(
      'SELECT * FROM products WHERE product_id = ? FOR UPDATE',
      [product_id]
    );

    if (!productRows.length) {
      const error = new Error('Product not found');
      error.status = 404;
      throw error;
    }

    const product = productRows[0];

    if (product.current_stock < quantity) {
      const error = new Error('Insufficient stock');
      error.status = 400;
      throw error;
    }

    const [saleResult] = await conn.execute(
      `INSERT INTO sales
      (product_id, quantity, sale_price, sale_date)
      VALUES (?, ?, ?, ?)`,
      [product_id, quantity, sale_price, sale_date || new Date()]
    );

    await conn.execute(
      `UPDATE products
       SET current_stock = current_stock - ?
       WHERE product_id = ?`,
      [quantity, product_id]
    );

    await conn.execute(
      `INSERT INTO stock_movements
      (product_id, movement_type, quantity, reference_id, notes)
      VALUES (?, 'OUT', ?, ?, ?)`,
      [product_id, quantity, saleResult.insertId, 'Sale entry']
    );

    await conn.commit();
    return saleResult.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};