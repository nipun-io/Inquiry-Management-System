import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PublicInquiryPage from './pages/PublicInquiryPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function App() {
  return (
    <Router>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Inquiry Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Inquiry Form
          </Button>
          <Button color="inherit" component={Link} to="/admin/login">
            Admin Login
          </Button>
          <Button color="inherit" component={Link} to="/admin/dashboard">
            Admin Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Routes>
          <Route path="/" element={<PublicInquiryPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </Box>
    </Router>
  );
}
