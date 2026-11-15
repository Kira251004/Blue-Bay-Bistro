import { useApp } from '../../context/AppContext.jsx';

export default function ReservationsManager() {
  const { reservations, updateReservationStatus } = useApp();

  if (reservations.length === 0) {
    return <p className="muted">No reservations yet. Log in as Alex and book one!</p>;
  }

  return (
    <div className="table-wrap card">
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Type</th>
            <th>Date & time</th>
            <th>Guests</th>
            <th>Requests</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.customer}</td>
              <td>{r.type}</td>
              <td>{r.date} at {r.time}</td>
              <td>{r.guests}</td>
              <td>{r.notes || '—'}</td>
              <td><span className={'badge badge-' + r.status.toLowerCase()}>{r.status}</span></td>
              <td>
                <div className="row-actions">
                  {r.status === 'Pending' && (
                    <button className="btn btn-small" onClick={() => updateReservationStatus(r.id, 'Confirmed')}>Approve</button>
                  )}
                  {r.status !== 'Cancelled' && (
                    <button className="btn btn-small btn-danger" onClick={() => updateReservationStatus(r.id, 'Cancelled')}>Cancel</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}