import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const STEPS = ['Pending', 'Preparing', 'Ready', 'Delivered'];

export default function Orders() {
  const { orders, user } = useApp();
  const location = useLocation(); // info about this page, including "state" sent by navigate()

  // Only this customer's orders
  const myOrders = orders.filter((order) => order.customer === user.name);

  return (
    <div>
      <div className="page-header">
        <h1>My Orders</h1>
      </div>

      {location.state?.justOrdered && (
        <div className="alert alert-success">✅ Order placed! We'll start preparing it soon.</div>
      )}

      {myOrders.length === 0 && <p className="muted">You have no orders yet.</p>}

      <div className="stack">
        {myOrders.map((order) => (
          <div key={order.id} className="card order-card">
            <div className="order-head">
              <div>
                <h3>Order #{order.id}</h3>
                <span className="muted">
                  {order.date} · {order.orderType}
                  {order.orderType === 'Delivery' && ' to ' + order.address}
                </span>
              </div>
              <span className={'badge badge-' + order.status.toLowerCase()}>{order.status}</span>
            </div>

            {/* Progress bar: steps up to the current status are "done" */}
            <ol className="tracker">
              {STEPS.map((step, index) => (
                <li key={step} className={index <= STEPS.indexOf(order.status) ? 'done' : ''}>
                  <span className="dot">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}