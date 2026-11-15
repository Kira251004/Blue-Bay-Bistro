import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const { user, logout, cartCount } = useApp();
  const [open, setOpen] = useState(false); // is the phone menu open?
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          🍴 <span>Blue Bay Bistro</span>
        </Link>

        {/* The ☰ button only shows on small screens (see index.css) */}
        <button className="menu-toggle" onClick={() => setOpen(!open)}>☰</button>

        <nav className={open ? 'nav-links open' : 'nav-links'} onClick={() => setOpen(false)}>
          <NavLink to="/menu">Menu</NavLink>

          {/* Only customers see these */}
          {user && user.role === 'customer' && (
            <>
              <NavLink to="/orders">My Orders</NavLink>
              <NavLink to="/reservations">Reservations</NavLink>
            </>
          )}

          {/* Only admins see this */}
          {user && user.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}

          <NavLink to="/cart">🛒 Cart ({cartCount})</NavLink>

          {user ? (
            <button className="btn btn-small btn-outline" onClick={handleLogout}>
              Log out ({user.name})
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-small">Log in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}