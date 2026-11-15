// Menu page: filter the dishes by category, search, dietary need and price.
import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import MenuCard from '../components/MenuCard.jsx';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Beverages'];

export default function Menu() {
  // Get the menu and the addToCart function from our shared context
  const { menu, addToCart } = useApp();

  // Each filter is a piece of state: [current value, function to change it]
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [dietary, setDietary] = useState('');
  const [maxPrice, setMaxPrice] = useState(20);

  // Keep only the dishes that pass ALL the filters
  const filtered = menu.filter((item) => {
    const matchCategory = category === 'All' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchDietary = dietary === '' || item.dietary.includes(dietary);
    const matchPrice = item.price <= maxPrice;
    return matchCategory && matchSearch && matchDietary && matchPrice;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Our Menu</h1>
        <p className="muted">{filtered.length} of {menu.length} dishes</p>
      </div>

      <div className="filters card">
        {/* Category buttons */}
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={category === cat ? 'active' : ''} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="filter-row">
          {/* Search box */}
          <input
            type="search"
            placeholder="🔍 Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Dietary dropdown */}
          <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
            <option value="">Any diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
          </select>

          {/* Price slider */}
          <label className="price-filter">
            Max price: ${maxPrice}
            <input
              type="range"
              min="5"
              max="20"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No dishes match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}