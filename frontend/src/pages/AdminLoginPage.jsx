import AdminLogin from '../components/AdminLogin.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    navigate('/admin/dashboard');
  };
  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
} 