// Stats (admin): simple analytics worked out from the orders.
import { useApp } from '../../context/AppContext.jsx';

export default function Stats() {
  const { orders, reservations, menu } = useApp();

  // Cancelled orders don't count
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const revenue = validOrders.reduce((sum, o) => sum + o.total, 0);

  // Orders per day, e.g. { '2026-11-05': 2, '2026-11-04': 1 }
  const perDay = {};
  validOrders.forEach((o) => {
    perDay[o.date] = (perDay[o.date] || 0) + 1;
  });

  // How many of each dish were sold, e.g. { 'Chicken Alfredo': 3 }
  const sold = {};
  validOrders.forEach((o) => {
    o.items.forEach((item) => {
      sold[item.name] = (sold[item.name] || 0) + item.qty;
    });
  });
  // Turn it into a list of [name, count], biggest first, top 5
  const popular = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const topCount = popular.length > 0 ? popular[0][1] : 1;

  return (
    <div className="stack">
      <div className="stat-grid">
        <div className="stat accent"><span>Total orders</span><strong>{validOrders.length}</strong></div>
        <div className="stat"><span>Revenue</span><strong>${revenue.toFixed(2)}</strong></div>
        <div className="stat"><span>Pending orders</span><strong>{orders.filter((o) => o.status === 'Pending').length}</strong></div>
        <div className="stat"><span>Reservations</span><strong>{reservations.length}</strong></div>
        <div className="stat"><span>Sold-out dishes</span><strong>{menu.filter((m) => !m.available).length}</strong></div>
      </div>

      <div className="two-col">
        <div className="card">
          <h2>📅 Orders per day</h2>
          <ul className="order-items">
            {Object.entries(perDay).map(([date, count]) => (
              <li key={date}>
                <span>{date}</span>
                <span>{count} {count === 1 ? 'order' : 'orders'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>🔥 Popular dishes</h2>
          <div className="bar-chart">
            {popular.map(([name, count]) => (
              <div key={name} className="bar-row">
                <span className="bar-label">{name}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: (count / topCount) * 100 + '%' }} />
                </div>
                <span className="bar-value">{count} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}