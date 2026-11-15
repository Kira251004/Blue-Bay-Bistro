// Cart page: the items in the cart + a checkout form (pickup or delivery).
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Cart() {
  const { cart, changeQty, removeFromCart, cartTotal, user, placeOrder } = useApp();
  const navigate = useNavigate();

  // Checkout form state
  const [orderType, setOrderType] = useState('Pickup');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const deliveryFee = orderType === 'Delivery' ? 5 : 0;

  function handleCheckout(e) {
    e.preventDefault();
    // Validation: delivery needs an address
    if (orderType === 'Delivery' && address.trim() === '') {
      setError('Please enter a delivery address.');
      return;
    }
    placeOrder(orderType, address);
    // Go to My Orders and tell that page we just ordered
    navigate('/orders', { state: { justOrdered: true } });
  }

  // Conditional rendering: show a different screen when the cart is empty
  if (cart.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <Link to="/menu" className="btn">Browse the menu</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Your Cart</h1>
      </div>

      <div className="two-col">
        {/* Left: the items */}
        <div className="card">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-emoji">{item.emoji}</span>
                <div className="cart-info">
                  <strong>{item.name}</strong>
                  <span className="muted">${item.price.toFixed(2)} each</span>
                </div>
                <div className="qty">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
                <strong className="cart-line-total">${(item.price * item.qty).toFixed(2)}</strong>
                <button className="icon-button" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: checkout */}
        <div className="card">
          <h2>Checkout</h2>

          {user ? (
            <form className="form" onSubmit={handleCheckout}>
              <div className="radio-group">
                <label className={orderType === 'Pickup' ? 'selected' : ''}>
                  <input type="radio" value="Pickup" checked={orderType === 'Pickup'} onChange={(e) => setOrderType(e.target.value)} />
                  🛍️ Pickup
                </label>
                <label className={orderType === 'Delivery' ? 'selected' : ''}>
                  <input type="radio" value="Delivery" checked={orderType === 'Delivery'} onChange={(e) => setOrderType(e.target.value)} />
                  🚗 Delivery
                </label>
              </div>

              {/* Only show the address box for delivery */}
              {orderType === 'Delivery' && (
                <label>
                  Delivery address
                  <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Calgary" />
                </label>
              )}

              <div className="summary">
                <div><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div><span>Delivery fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="summary-total"><span>Total</span><span>${(cartTotal + deliveryFee).toFixed(2)}</span></div>
              </div>

              {error && <div className="alert alert-error">{error}</div>}

              <button className="btn btn-full btn-large">Place order</button>
              <p className="muted small">Payment is simulated: pay when you pick up or get your food.</p>
            </form>
          ) : (
            <>
              <p>Please log in to place your order.</p>
              <Link to="/login" className="btn btn-full">Log in</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}