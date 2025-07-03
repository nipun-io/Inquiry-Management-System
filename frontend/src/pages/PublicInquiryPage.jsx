import ContactCard from '../components/ContactCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import './PublicInquiryPage.css';

export default function PublicInquiryPage() {
  return (
    <div className="public-inquiry-root" style={{

      width: '100%',
    }}>
      <div className="public-inquiry-container" style={
        {
          width: '100%',
          display: 'flex',
          flexDirection:"row",
          justifyContent: 'center',

        }
      }>
        <div className="contact-card" style={{
          width: '30%',
          position: 'absolute',
          height:"60%",
          transform:"translate(-100%, 40%)",
          marginRight:"30px"
        }}>
          <ContactCard />
        </div>
        <div className="form-card" style={{
          width: '80%',
          height: '100%',
          display: 'flex',
        }}>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
} 