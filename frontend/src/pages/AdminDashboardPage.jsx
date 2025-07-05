import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InquiryTable from '../components/InquiryTable.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_BACKEND_URL

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return navigate('/admin/login');
      const res = await axios.get(`${API_URL}/api/admin/inquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    // eslint-disable-next-line
  }, []);

  const handleResolve = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_URL}/api/admin/inquiries/${id}/resolve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to mark as resolved.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <InquiryTable inquiries={inquiries} onResolve={handleResolve} loading={loading} />
    </div>
  );
} 