import { useEffect, useState } from 'react';
import { fetchSales, createSale } from '../services/api';

function Sales() {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    quantity: '',
    sale_price: ''
  });

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    const res = await fetchSales();
    setSales(res.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSale({
      product_id: Number(form.product_id),
      quantity: Number(form.quantity),
      sale_price: Number(form.sale_price)
    });
    setForm({ product_id: '', quantity: '', sale_price: '' });
    loadSales();
  };

  return (
    <div>
      <h1>Sales</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input name="product_id" placeholder="Product ID" value={form.product_id} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="sale_price" placeholder="Sale Price" value={form.sale_price} onChange={handleChange} required />
        <button type="submit">Add Sale</button>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Sale Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(item => (
              <tr key={item.sale_id}>
                <td>{item.sale_id}</td>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.sale_price}</td>
                <td>{new Date(item.sale_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sales;