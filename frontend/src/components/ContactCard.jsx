import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';

export default function ContactCard() {
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '1.1rem',
    margin: '14px 0',
    padding: '4px 0',
    width: '100%',
    justifyContent: 'flex-start',
  };
  const iconStyle = {
    fontSize: '1.5rem',
    color: '#fff',
    minWidth: '32px',
  };
  const textStyle = {
    fontSize: '1.08rem',
    color: '#fff',
    lineHeight: 1.5,
  };
  return (
    <div style={{
      height: "80%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }} >
      <h2 style={{
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '2rem',
        margin: '0 0 24px 0',
        letterSpacing: '1px',
      }}>Contact Us</h2>
      <div style={rowStyle}>
        <LocationOnIcon style={iconStyle} />
        <span style={textStyle}>32, Avenue ve Newyork<br />321994 Newyork</span>
      </div>
      <div style={rowStyle}>
        <EmailIcon style={iconStyle} />
        <span style={textStyle}>hello@loremipsum.com</span>
      </div>
      <div style={rowStyle}>
        <PhoneIcon style={iconStyle} />
        <span style={textStyle}>+3356 1589 2105</span>
      </div>
      <div style={rowStyle}>
        <PrintIcon style={iconStyle} />
        <span style={textStyle}>+3356 1589 2100</span>
      </div>
    </div>
  );
} 