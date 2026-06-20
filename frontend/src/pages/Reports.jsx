import { useEffect, useState } from 'react';
import { fetchLowStock, fetchMovements } from '../services/api';

function Reports() {
  const [lowStock, setLowStock] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const lowRes = await fetchLowStock();
    const moveRes = await fetchMovements();

    setLowStock(lowRes.data || []);
    setMovements(moveRes.data || []);
  };

  return (
    <div>
      <h1>Reports</h1>

      <div className="card">
        <h3>Low Stock Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Current Stock</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map(item => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.sku}</td>
                <td>{item.product_name}</td>
                <td>{item.current_stock}</td>
                <td>{item.reorder_level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Stock Movements</h3>
        <table>
          <thead>
            <tr>
              <th>Movement ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.map(item => (
              <tr key={item.movement_id}>
                <td>{item.movement_id}</td>
                <td>{item.product_name}</td>
                <td>{item.movement_type}</td>
                <td>{item.quantity}</td>
                <td>{item.notes}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;