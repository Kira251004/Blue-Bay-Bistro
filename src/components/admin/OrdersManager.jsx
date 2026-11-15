import { useApp } from '../../context/AppContext.jsx';

const STATUSES = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

export default function OrdersManager() {
  const { orders, updateOrderStatus } = useApp();

  if (orders.length === 0) {
    return <p className="muted">No orders yet.</p>;
  }

  return (
    <div className="grid orders-grid">
      {orders.map((order) => (
        <div key={order.id} className="card order-card">
          <div className="order-head">
            <div>
              <h3>Order #{order.id} · {order.customer}</h3>
              <span className="muted small">
                {order.date} · {order.orderType}
                {order.orderType === 'Delivery' && ' to ' + order.address}
              </span>
            </div>
            <span className={'badge badge-' + order.status.toLowerCase()}>{order.status}</span>
          </div>

          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <span>{item.qty} × {item.name}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="order-foot">
            <strong>Total ${order.total.toFixed(2)}</strong>
            {/* Changing the dropdown updates the order in context right away */}
            <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} style={{ width: 'auto' }}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}