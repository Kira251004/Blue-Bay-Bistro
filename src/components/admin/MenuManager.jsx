// MenuManager (admin): add, edit and delete dishes, and mark them sold out.
// This is CRUD: Create, Read, Update, Delete.
import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Beverages'];
const EMPTY_FORM = {
  name: '', category: 'Mains', price: '', emoji: '🍽️', description: '',
  ingredients: '', dietary: '', available: true, isSpecial: false,
};

// Turns "a, b, c" into ['a', 'b', 'c']
function toList(text) {
  return text.split(',').map((s) => s.trim()).filter((s) => s !== '');
}

export default function MenuManager() {
  const { menu, setMenu } = useApp();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // null = adding a NEW dish
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    // Checkboxes give true/false in "checked"; other inputs give text in "value"
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (form.name.trim() === '' || form.description.trim() === '') {
      setError('Name and description are required.');
      return;
    }
    const price = Number(form.price);
    if (isNaN(price) || price <= 0) {
      setError('Price must be a number above 0.');
      return;
    }

    const dish = { ...form, price, ingredients: toList(form.ingredients), dietary: toList(form.dietary) };

    if (editingId === null) {
      // CREATE: add a new dish with a unique id
      setMenu([...menu, { ...dish, id: Date.now() }]);
    } else {
      // UPDATE: replace the dish that has this id
      setMenu(menu.map((m) => (m.id === editingId ? { ...dish, id: editingId } : m)));
    }

    setForm(EMPTY_FORM);
    setEditingId(null);
    setError('');
  }

  function startEdit(item) {
    setEditingId(item.id);
    // Put the dish into the form (arrays become "a, b" text for the inputs)
    setForm({ ...item, price: String(item.price), ingredients: item.ingredients.join(', '), dietary: item.dietary.join(', ') });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
  }

  function deleteDish(item) {
    if (window.confirm('Delete ' + item.name + '?')) {
      // DELETE: keep every dish except this one
      setMenu(menu.filter((m) => m.id !== item.id));
    }
  }

  function toggleAvailable(item) {
    // Flip available: true -> false, false -> true
    setMenu(menu.map((m) => (m.id === item.id ? { ...m, available: !m.available } : m)));
  }

  return (
    <div className="stack">
      {/* ---------- The add / edit form ---------- */}
      <form className="form card" onSubmit={handleSubmit}>
        <h2>{editingId === null ? '➕ Add a dish' : '✏️ Edit dish'}</h2>

        <div className="form-row">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Price ($)
            <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
          </label>
          <label>
            Emoji
            <input name="emoji" value={form.emoji} onChange={handleChange} />
          </label>
        </div>

        <label>
          Description
          <input name="description" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Ingredients (comma separated)
          <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="rice, egg, onion" />
        </label>
        <label>
          Dietary tags (comma separated)
          <input name="dietary" value={form.dietary} onChange={handleChange} placeholder="vegetarian, gluten-free" />
        </label>

        <div className="checkbox-row">
          <label className="checkbox">
            <input type="checkbox" name="available" checked={form.available} onChange={handleChange} /> Available
          </label>
          <label className="checkbox">
            <input type="checkbox" name="isSpecial" checked={form.isSpecial} onChange={handleChange} /> Today's special
          </label>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="actions">
          <button className="btn">{editingId === null ? 'Add dish' : 'Save changes'}</button>
          {editingId !== null && (
            <button type="button" className="btn btn-outline" onClick={cancelEdit}>Cancel</button>
          )}
        </div>
      </form>

      {/* ---------- The table of all dishes ---------- */}
      <div className="table-wrap card">
        <table className="table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td>{item.emoji} <strong>{item.name}</strong> {item.isSpecial && '⭐'}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button className={item.available ? 'toggle on' : 'toggle'} onClick={() => toggleAvailable(item)}>
                    {item.available ? 'In stock' : 'Sold out'}
                  </button>
                </td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn-small btn-outline" onClick={() => startEdit(item)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => deleteDish(item)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}