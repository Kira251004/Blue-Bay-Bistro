// AppContext: data that MANY pages need (user, menu, cart, orders, reservations).
// Instead of passing it through props, any component can read it with useApp().
import { createContext, useContext, useState } from 'react';
import menuData from '../data/menu.js';

const AppContext = createContext();

// Demo accounts. Assignment 1 has no backend yet, so they live here.
const USERS = [
  { name: 'Admin', email: 'admin@srms.com', password: 'admin123', role: 'admin' },
  { name: 'Alex', email: 'alex@srms.com', password: 'alex123', role: 'customer' },
];

// Dates as "YYYY-MM-DD" text (used for orders and reservations)
const today = new Date().toLocaleDateString('en-CA');
const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA');

// Two old orders so the pages aren't empty at the start
const SAMPLE_ORDERS = [
  {
    id: 2, customer: 'Maria', orderType: 'Delivery', address: '88 River Rd', status: 'Preparing', date: today, total: 37.98,
    items: [{ id: 6, name: 'Margherita Pizza', price: 16.49, qty: 2 }],
  },
  {
    id: 1, customer: 'Alex', orderType: 'Pickup', address: '', status: 'Delivered', date: yesterday, total: 27.98,
    items: [{ id: 4, name: 'Chicken Alfredo', price: 18.99, qty: 1 }, { id: 8, name: 'Chocolate Lava Cake', price: 8.99, qty: 1 }],
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // null = nobody is logged in
  const [menu, setMenu] = useState(menuData);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [reservations, setReservations] = useState([]); // 🆕

  // ---------- LOGIN ----------
  function login(email, password) {
    const found = USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
    if (found) setUser(found);
    return found; // the user, or undefined if the email/password is wrong
  }

  function logout() {
    setUser(null);
    setCart([]);
  }

  // ---------- CART ----------
  function addToCart(item) {
    const inCart = cart.find((c) => c.id === item.id);
    if (inCart) {
      // already in the cart -> add 1 to its quantity
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)));
    } else {
      // new item -> add it with quantity 1
      setCart([...cart, { ...item, qty: 1 }]);
    }
  }

  function changeQty(id, amount) {
    const updated = cart.map((c) => (c.id === id ? { ...c, qty: c.qty + amount } : c));
    setCart(updated.filter((c) => c.qty > 0)); // quantity 0 = remove it
  }

  function removeFromCart(id) {
    setCart(cart.filter((c) => c.id !== id));
  }

  // Worked out from the cart every time it changes
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  // ---------- ORDERS ----------
  function placeOrder(orderType, address) {
    const deliveryFee = orderType === 'Delivery' ? 5 : 0;
    const newOrder = {
      id: orders.length + 1,
      customer: user.name,
      items: cart,
      orderType,
      address,
      total: cartTotal + deliveryFee,
      status: 'Pending', // the admin changes this later
      date: today,
    };
    setOrders([newOrder, ...orders]); // newest order goes first
    setCart([]); // empty the cart after ordering
    return newOrder;
  }

  // The admin will use this in Step 11
  function updateOrderStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  // 🆕 ---------- RESERVATIONS ----------
  function addReservation(details) {
    const newReservation = {
      id: reservations.length + 1,
      customer: user.name,
      status: 'Pending', // the admin confirms it later
      ...details, // type, date, time, guests, notes from the form
    };
    setReservations([...reservations, newReservation]);
  }

  // Used by the customer (cancel) and the admin (confirm / cancel)
  function updateReservationStatus(id, status) {
    setReservations(reservations.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  // Everything inside "value" is shared with the whole app
  const value = {
    user, login, logout,
    menu, setMenu,
    cart, addToCart, changeQty, removeFromCart, cartCount, cartTotal,
    orders, placeOrder, updateOrderStatus,
    reservations, addReservation, updateReservationStatus, // 🆕
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook: any component can write  const { cart } = useApp();
export function useApp() {
  return useContext(AppContext);
}