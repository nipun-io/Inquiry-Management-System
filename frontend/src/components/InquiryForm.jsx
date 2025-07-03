import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);

const ENQUIRY_OPTIONS = [
  { label: 'Hostel', value: 'Hostel', subOptions: ['Single Bed Room', 'Two Bed Room', 'Three Bed Room'] },
  { label: 'Mess', value: 'Mess', subOptions: [] },
  { label: 'Coaching', value: 'Coaching', subOptions: ['Embedded Design', 'IOT', 'Full Stack Development', 'Android', 'Other'] },
];

const GROUP_TYPES = ['Individual', 'Group'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: '',
    groupType: '',
    contactNo: '',
    college: '',
    gender: '',
    course: '',
    courseYear: '',
    enquiryFor: '',
    enquiryDetail: '',
    subEnquiry: '',
    otherCoaching: '',
  });
  const [subOptions, setSubOptions] = useState([]);
  const [showOtherCoaching, setShowOtherCoaching] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'enquiryFor') {
      const selected = ENQUIRY_OPTIONS.find(opt => opt.value === value);
      setSubOptions(selected ? selected.subOptions : []);
      setForm((prev) => ({ ...prev, subEnquiry: '', otherCoaching: '', enquiryDetail: '' }));
      setShowOtherCoaching(false);
    }
    if (name === 'subEnquiry' && form.enquiryFor === 'Coaching') {
      setShowOtherCoaching(value === 'Other');
      setForm((prev) => ({ ...prev, otherCoaching: '', enquiryDetail: value === 'Other' ? '' : value }));
    }
    if (name === 'subEnquiry' && form.enquiryFor === 'Hostel') {
      setForm((prev) => ({ ...prev, enquiryDetail: value }));
    }
    if (name === 'subEnquiry' && form.enquiryFor === 'Mess') {
      setForm((prev) => ({ ...prev, enquiryDetail: 'Mess' }));
    }
    if (name === 'otherCoaching') {
      setForm((prev) => ({ ...prev, enquiryDetail: value }));
    }
    if (name === 'enquiryFor' && value === 'Mess') {
      setForm((prev) => ({ ...prev, enquiryDetail: 'Mess' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        name: form.name,
        groupType: form.groupType,
        contactNo: form.contactNo,
        college: form.college,
        gender: form.gender,
        course: form.course,
        courseYear: form.courseYear,
        enquiryFor: form.enquiryFor,
        enquiryDetail: form.enquiryDetail,
      };
      await axios.post(`${API_URL}/api/inquiries`, payload);
      setMessage('Inquiry submitted successfully!');
      setForm({
        name: '', groupType: '', contactNo: '', college: '', gender: '', course: '', courseYear: '', enquiryFor: '', enquiryDetail: '', subEnquiry: '', otherCoaching: ''
      });
      setSubOptions([]);
      setShowOtherCoaching(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "70%",
        marginLeft: "auto",
        display: "flex",
        flexDirection: "column",
        padding:"10px"
      }}
    >
      <h2 style={{ textAlign: "left", marginBottom:"10px", fontSize:"40px" }}>Get in Touch</h2>
      <p style={{ textAlign: "left", fontSize:"20px"}}>Feel free to drop us a line below!</p>
      <form className="basic-form" onSubmit={handleSubmit} autoComplete="off">
        <h3 className="basic-form-title" style={{
          fontSize:"30px"
        }} >Inquiry Form</h3>
        {message && <div className="basic-form-message">{message}</div>}
        <div className="basic-form-group">
          <label>Name:</label>
          <input className="basic-form-input" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Are you a group of friends or an individual?</label>
          <select className="basic-form-input" name="groupType" value={form.groupType} onChange={handleChange} required>
            <option value="">Select</option>
            {GROUP_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="basic-form-group">
          <label>Contact No:</label>
          <input className="basic-form-input" name="contactNo" value={form.contactNo} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>College:</label>
          <input className="basic-form-input" name="college" value={form.college} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Gender:</label>
          <select className="basic-form-input" name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select</option>
            {GENDERS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="basic-form-group">
          <label>Course:</label>
          <input className="basic-form-input" name="course" value={form.course} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Course Year:</label>
          <input className="basic-form-input" name="courseYear" value={form.courseYear} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Enquiry For:</label>
          <select className="basic-form-input" name="enquiryFor" value={form.enquiryFor} onChange={handleChange} required>
            <option value="">Select</option>
            {ENQUIRY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        {subOptions.length > 0 && (
          <div className="basic-form-group">
            <label>{form.enquiryFor === 'Hostel' ? 'Room Type:' : form.enquiryFor === 'Coaching' ? 'Coaching Type:' : ''}</label>
            <select className="basic-form-input" name="subEnquiry" value={form.subEnquiry} onChange={handleChange} required>
              <option value="">Select</option>
              {subOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        )}
        {showOtherCoaching && (
          <div className="basic-form-group">
            <label>Please specify:</label>
            <input className="basic-form-input" name="otherCoaching" value={form.otherCoaching} onChange={handleChange} required />
          </div>
        )}
        <button className="basic-form-submit" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Inquiry'}</button>
      </form>
    </div>
  );
}

