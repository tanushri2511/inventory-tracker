import { useEffect, useState } from 'react';
import { fetchPurchases, createPurchase } from '../services/api';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({
    product_id: '',
    supplier_id: '',
    quantity: '',
    purchase_price: ''
  });

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    const res = await fetchPurchases();
    setPurchases(res.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPurchase({
      product_id: Number(form.product_id),
      supplier_id: Number(form.supplier_id),
      quantity: Number(form.quantity),
      purchase_price: Number(form.purchase_price)
    });
    setForm({ product_id: '', supplier_id: '', quantity: '', purchase_price: '' });
    loadPurchases();
  };

  return (
    <div>
      <h1>Purchases</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input name="product_id" placeholder="Product ID" value={form.product_id} onChange={handleChange} required />
        <input name="supplier_id" placeholder="Supplier ID" value={form.supplier_id} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="purchase_price" placeholder="Purchase Price" value={form.purchase_price} onChange={handleChange} required />
        <button type="submit">Add Purchase</button>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(item => (
              <tr key={item.purchase_id}>
                <td>{item.purchase_id}</td>
                <td>{item.product_name}</td>
                <td>{item.supplier_name || '-'}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.purchase_price}</td>
                <td>{new Date(item.purchase_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;