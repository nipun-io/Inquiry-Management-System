import ContactCard from '../components/ContactCard.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import './PublicInquiryPage.css';

export default function PublicInquiryPage() {
  return (
    <div className="public-inquiry-root">
      <div className="public-inquiry-container">
        <div className="contact-card">
          <ContactCard />
        </div>
        <div className="form-card">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
} 