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
        <span style={textStyle}> Plot No 8, Commercial Zone, Manak Vihaar, Patel Nagar, Bhopal, Madhya Pradesh, India </span>
      </div>
      <div style={rowStyle}>
        <EmailIcon style={iconStyle} />
        <span style={textStyle}>info.indeyes@gmail.com</span>
      </div>
      <div style={rowStyle}>
        <PhoneIcon style={iconStyle} />
        <span style={textStyle}>+91 96911607165</span>
      </div>

    </div>
  );
} 