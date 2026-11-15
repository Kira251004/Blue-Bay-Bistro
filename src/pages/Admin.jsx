// Admin dashboard: tabs to switch between the admin tools.
import { useState } from 'react';
import MenuManager from '../components/admin/MenuManager.jsx';
import OrdersManager from '../components/admin/OrdersManager.jsx';
import ReservationsManager from '../components/admin/ReservationsManager.jsx';
import Stats from '../components/admin/Stats.jsx';

const TABS = ['Menu', 'Orders', 'Reservations', 'Stats'];

export default function Admin() {
  const [tab, setTab] = useState('Menu'); // which tab is open

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="category-tabs">
        {TABS.map((t) => (
          <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Conditional rendering: only show the tool for the chosen tab */}
      {tab === 'Menu' && <MenuManager />}
      {tab === 'Orders' && <OrdersManager />}
      {tab === 'Reservations' && <ReservationsManager />}
      {tab === 'Stats' && <Stats />}
    </div>
  );
}