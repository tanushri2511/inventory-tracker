import { useEffect, useState } from 'react';
import { fetchProducts, createProduct } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    sku: '',
    product_name: '',
    unit_price: '',
    reorder_level: '',
    current_stock: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data || []);
    } catch (error) {
      console.error('Load products error:', error);
      setMessage('Failed to load products');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('Saving product...');

      const payload = {
        sku: form.sku,
        product_name: form.product_name,
        unit_price: Number(form.unit_price),
        reorder_level: Number(form.reorder_level),
        current_stock: Number(form.current_stock)
      };

      console.log('Sending product:', payload);

      const res = await createProduct(payload);

      console.log('API response:', res);

      if (res.success) {
        setMessage('Product added successfully');
        setForm({
          sku: '',
          product_name: '',
          unit_price: '',
          reorder_level: '',
          current_stock: ''
        });
        loadProducts();
      } else {
        setMessage(res.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage(error.message || 'Error while adding product');
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />
        <input name="product_name" placeholder="Product Name" value={form.product_name} onChange={handleChange} required />
        <input name="unit_price" placeholder="Unit Price" type="number" value={form.unit_price} onChange={handleChange} required />
        <input name="reorder_level" placeholder="Reorder Level" type="number" value={form.reorder_level} onChange={handleChange} required />
        <input name="current_stock" placeholder="Current Stock" type="number" value={form.current_stock} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      {message && <p style={{ marginBottom: '16px', color: '#2563eb' }}>{message}</p>}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Reorder</th>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={item.product_id}>
                <td>{item.sku}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name || '-'}</td>
                <td>{item.supplier_name || '-'}</td>
                <td>₹ {item.unit_price}</td>
                <td>{item.current_stock}</td>
                <td>{item.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;