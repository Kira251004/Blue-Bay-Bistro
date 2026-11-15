import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate(); // lets us change page from code
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page

    if (email === '' || password === '') {
      setError('Please enter your email and password.');
      return;
    }

    const user = login(email, password);
    if (!user) {
      setError('Wrong email or password.');
      return;
    }

    // Admins go to the dashboard, customers go to the menu
    navigate(user.role === 'admin' ? '/admin' : '/menu');
  }

  return (
    <div className="page narrow">
      <div className="card auth-card">
        <h1>Log in</h1>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          {error && <div className="alert alert-error">{error}</div>}

          <button className="btn btn-full btn-large">Log in</button>
        </form>

        <div className="demo-box">
          <strong>Demo accounts (click to fill)</strong>
          <div className="demo-buttons">
            <button type="button" className="btn btn-small btn-outline" onClick={() => { setEmail('alex@srms.com'); setPassword('alex123'); }}>
              🙂 Customer (Alex)
            </button>
            <button type="button" className="btn btn-small btn-outline" onClick={() => { setEmail('admin@srms.com'); setPassword('admin123'); }}>
              👑 Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}