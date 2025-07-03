import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL
console.log(API_URL);
export default function AdminLogin({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, form);
      const token = res.data.token;
      localStorage.setItem('adminToken', token);
      setMessage('Login successful!');
      if (onLoginSuccess) onLoginSuccess(token);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-form">
      <h2 style={{ textAlign: 'center', color: 'var(--dark-bg)', fontWeight: 700, marginBottom: 8 }}>Admin Login</h2>
      {message && <div className="basic-form-message">{message}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ color: 'var(--gray-bg)', fontWeight: 500 }}>Username:</label>
        <input
          className="basic-form-input"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <label style={{ color: 'var(--gray-bg)', fontWeight: 500 }}>Password:</label>
        <input
          className="basic-form-input"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="basic-form-submit" type="submit" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
} 