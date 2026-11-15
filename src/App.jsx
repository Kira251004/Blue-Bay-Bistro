// App.jsx: the layout (navbar on top) + which page to show for each URL.
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import ChatBot from './components/ChatBot.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders.jsx';
import Reservations from './pages/Reservations.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const { user } = useApp();
  const isAdmin = user !== null && user.role === 'admin';

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          {/* Anyone can see these */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />

          {/* Protected: must be logged in, otherwise go to /login */}
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
          <Route path="/reservations" element={user ? <Reservations /> : <Navigate to="/login" />} />

          {/* Admins only */}
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />

          <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
      </main>
      <ChatBot />
    </div>
  );
}