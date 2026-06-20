import { useEffect, useState } from 'react';
import { fetchSummary, fetchLowStock, fetchMovements } from '../services/api';

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [lowStock, setLowStock] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const summaryRes = await fetchSummary();
    const lowRes = await fetchLowStock();
    const moveRes = await fetchMovements();

    setSummary(summaryRes.data || {});
    setLowStock(lowRes.data || []);
    setMovements(moveRes.data || []);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Total Products</h3>
          <p>{summary.total_products || 0}</p>
        </div>
        <div className="card">
          <h3>Total Units</h3>
          <p>{summary.total_stock_units || 0}</p>
        </div>
        <div className="card">
          <h3>Inventory Value</h3>
          <p>₹ {summary.inventory_value || 0}</p>
        </div>
      </div>

      <div className="two-column">
        <div className="card">
          <h3>Low Stock Products</h3>
          <ul>
            {lowStock.length > 0 ? (
              lowStock.map(item => (
                <li key={item.product_id}>
                  {item.product_name} - Stock: {item.current_stock}
                </li>
              ))
            ) : (
              <p>No low-stock items</p>
            )}
          </ul>
        </div>

        <div className="card">
          <h3>Recent Stock Movements</h3>
          <ul>
            {movements.slice(0, 5).map(item => (
              <li key={item.movement_id}>
                {item.product_name} - {item.movement_type} - {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
