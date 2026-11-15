import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const TABLES = 5; // how many tables we have for each time slot
const TIMES = ['11:00', '12:00', '13:00', '17:00', '18:00', '19:00', '20:00'];
const EMPTY_FORM = { type: 'Table', date: '', time: '18:00', guests: 2, notes: '' };

export default function Reservations() {
  const { user, reservations, addReservation, updateReservationStatus } = useApp();
  const [form, setForm] = useState(EMPTY_FORM); // ONE state object for the whole form
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const today = new Date().toLocaleDateString('en-CA'); // "YYYY-MM-DD"

  // One change handler for every input. It uses the input's "name"
  // to know which field to update, e.g. name="date" updates form.date
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Checks the form. Returns an error message, or '' if everything is OK.
  function validate() {
    const guests = Number(form.guests);
    const isEvent = form.type !== 'Table';
    const active = reservations.filter((r) => r.status !== 'Cancelled');

    if (form.date === '') return 'Please choose a date.';
    if (form.date < today) return 'You cannot book a date in the past.';
    if (new Date(form.date + 'T00:00').getDay() === 1) return 'Sorry, we are closed on Mondays.';
    if (!isEvent && (guests < 1 || guests > 10)) return 'Tables are for 1 to 10 guests.';
    if (isEvent && (guests < 10 || guests > 50)) return 'Events are for 10 to 50 guests.';

    // Double booking: the same customer can't book the same time twice
    const alreadyBooked = active.some((r) => r.customer === user.name && r.date === form.date && r.time === form.time);
    if (alreadyBooked) return 'You already have a booking at that time.';

    if (isEvent) {
      // Only ONE event can use the event room per day
      const roomTaken = active.some((r) => r.type !== 'Table' && r.date === form.date);
      if (roomTaken) return 'Our event room is already booked that day. Please pick another date.';
    } else {
      // We only have 5 tables per time slot
      const tablesTaken = active.filter((r) => r.type === 'Table' && r.date === form.date && r.time === form.time).length;
      if (tablesTaken >= TABLES) return 'Sorry, all tables are booked at that time. Please pick another time.';
    }

    return ''; // no problems
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');

    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    setError('');
    addReservation({ ...form, guests: Number(form.guests) });
    // Simulated confirmation message
    setSuccess(`✅ Booked! ${form.type} for ${form.guests} on ${form.date} at ${form.time}. We'll confirm it soon.`);
    setForm(EMPTY_FORM); // clear the form
  }

  const myReservations = reservations.filter((r) => r.customer === user.name);

  return (
    <div>
      <div className="page-header">
        <h1>Reservations</h1>
        <p className="muted">Open Tuesday–Sunday · Closed Mondays</p>
      </div>

      <div className="two-col">
        {/* Left: booking form */}
        <div className="card">
          <h2>Book a table or event</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              What are you booking?
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="Table">Table</option>
                <option value="Birthday party">Birthday party</option>
                <option value="Corporate event">Corporate event</option>
              </select>
            </label>

            <div className="form-row">
              <label>
                Date
                <input type="date" name="date" min={today} value={form.date} onChange={handleChange} />
              </label>
              <label>
                Time
                <select name="time" value={form.time} onChange={handleChange}>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Number of guests
              <input type="number" name="guests" value={form.guests} onChange={handleChange} />
            </label>

            <label>
              Special requests
              <textarea name="notes" rows="2" value={form.notes} onChange={handleChange} placeholder="Window seat, cake, projector..." />
            </label>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <button className="btn btn-large">Book now</button>
          </form>
        </div>

        {/* Right: my bookings */}
        <div className="card">
          <h2>My bookings</h2>
          {myReservations.length === 0 && <p className="muted">No bookings yet.</p>}

          <ul className="booking-list">
            {myReservations.map((r) => (
              <li key={r.id}>
                <div>
                  <strong>{r.type} · {r.date} at {r.time}</strong>
                  <span className="muted">{r.guests} guests {r.notes && '· ' + r.notes}</span>
                </div>
                <div className="booking-actions">
                  <span className={'badge badge-' + r.status.toLowerCase()}>{r.status}</span>
                  {r.status !== 'Cancelled' && (
                    <button className="btn btn-small btn-danger" onClick={() => updateReservationStatus(r.id, 'Cancelled')}>
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}