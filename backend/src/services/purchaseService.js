const pool = require('../config/db');

exports.createPurchaseTransaction = async (data) => {
  const { product_id, supplier_id, quantity, purchase_price, purchase_date } = data;

  if (!product_id || !quantity || !purchase_price) {
    const error = new Error('product_id, quantity and purchase_price are required');
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

    const [purchaseResult] = await conn.execute(
      `INSERT INTO purchases
      (product_id, supplier_id, quantity, purchase_price, purchase_date)
      VALUES (?, ?, ?, ?, ?)`,
      [
        product_id,
        supplier_id || null,
        quantity,
        purchase_price,
        purchase_date || new Date()
      ]
    );

    await conn.execute(
      `UPDATE products
       SET current_stock = current_stock + ?
       WHERE product_id = ?`,
      [quantity, product_id]
    );

    await conn.execute(
      `INSERT INTO stock_movements
      (product_id, movement_type, quantity, reference_id, notes)
      VALUES (?, 'IN', ?, ?, ?)`,
      [product_id, quantity, purchaseResult.insertId, 'Purchase entry']
    );

    await conn.commit();
    return purchaseResult.insertId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
