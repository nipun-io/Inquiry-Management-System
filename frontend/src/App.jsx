import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PublicInquiryPage from './pages/PublicInquiryPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import logo from './assets/logo2.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


// Custom theme matching your color palette
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#393E46', // gray-bg
      dark: '#222831', // dark-bg
      contrastText: '#EEEEEE', // offwhite
    },
    background: {
      default: '#222831', // dark-bg
      paper: '#393E46', // gray-bg
    },
    text: {
      primary: '#EEEEEE', // offwhite
    },
  },
});

export default function App() {
  useEffect(() => {
    let cancelled = false;
    const ping = async () => {
      try {
        await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/keepalive');
      } catch (e) {
        // ignore errors
      }
      if (!cancelled) {
        setTimeout(ping, 14 * 60 * 1000); // 1 second for testing, use 14 * 60 * 1000 for production
      }
    };
    ping();
    return () => { cancelled = true; };
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const navLinks = [
    { label: 'Inquiry Form', to: '/' },
    { label: 'Admin Login', to: '/admin/login' },
    { label: 'Admin Dashboard', to: '/admin/dashboard' },
  ];

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#282828' }}>
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 'auto',
              height: 40,

              objectFit: 'contain',
              marginRight: 16,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#EEEEEE' }}>
            Inquiry Management
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={menuOpen ? handleMenuClose : handleMenuOpen}
                aria-label={menuOpen ? 'close menu' : 'open menu'}
                sx={{ color: '#EEEEEE' }}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    minWidth: 180,
                    borderRadius: 2,
                    bgcolor: '#393E46',
                    color: '#EEEEEE',
                    boxShadow: 3,
                  },
                }}
              >
                {navLinks.map((link) => (
                  <MenuItem
                    key={link.to}
                    component={Link}
                    to={link.to}
                    onClick={handleMenuClose}
                    sx={{
                      color: '#EEEEEE',
                      '&:hover': {
                        bgcolor: '#00ADB5',
                      },
                    }}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            navLinks.map((link) => (
              <Button
                color="inherit"
                component={Link}
                to={link.to}
                key={link.to}
                sx={{
                  color: '#EEEEEE',
                  '&:hover': {
                    bgcolor: '#00ADB5',
                  }
                }}
              >
                {link.label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ bgcolor: '#222831', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<PublicInquiryPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        </Routes>
      </Box>
    </Router>
  );
}
