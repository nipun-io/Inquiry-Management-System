import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL);

const ENQUIRY_OPTIONS = [
  { label: 'Hostel', value: 'Hostel', subOptions: ['Single Bed Room', 'Two Bed Room', 'Three Bed Room'] },
  { label: 'Mess', value: 'Mess', subOptions: [] },
  {
    label: 'Courses/ Training/ Internship', value: 'Coaching', subOptions:
      [
        'Embedded Design',
        'IOT',
        'Full Stack Development',
        'Android',
        'JAVA',
        'C/C++',
        'Other'
      ]
  },
  { label: 'College Enquiry', value: 'College Enquiry', subOptions: [] },
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
    designation: '',
    reason: '',
  });
  const [subOptions, setSubOptions] = useState([]);
  const [showOtherCoaching, setShowOtherCoaching] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [groupCount, setGroupCount] = useState(1);
  const [groupMembers, setGroupMembers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'enquiryFor') {
      const selected = ENQUIRY_OPTIONS.find(opt => opt.value === value);
      setSubOptions(selected ? selected.subOptions : []);
      setForm((prev) => ({ ...prev, subEnquiry: '', otherCoaching: '', enquiryDetail: '', designation: '', reason: '' }));
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
    if (name === 'groupType' && value !== 'Group') {
      setGroupCount(1);
      setGroupMembers([]);
    }
  };

  const handleGroupCountChange = (e) => {
    let count = parseInt(e.target.value, 10);
    if (isNaN(count) || count < 1) count = 1;
    if (count > 5) count = 5;
    setGroupCount(count);
    setGroupMembers((prev) => {
      const arr = [...prev];
      while (arr.length < count) arr.push({ name: '', phone: '' });
      return arr.slice(0, count);
    });
  };

  const handleGroupMemberChange = (idx, field, value) => {
    setGroupMembers((prev) => {
      const arr = [...prev];
      arr[idx] = { ...arr[idx], [field]: value };
      return arr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let enquiryDetail = form.enquiryDetail;
      if (form.enquiryFor === 'College Enquiry') {
        enquiryDetail = `Designation: ${form.designation}, Reason: ${form.reason}`;
      }
      const payload = {
        name: form.name,
        groupType: form.groupType,
        contactNo: form.contactNo,
        college: form.college,
        gender: form.gender,
        course: form.course,
        courseYear: form.courseYear,
        enquiryFor: form.enquiryFor,
        enquiryDetail,
        groupMembers: form.groupType === 'Group' ? groupMembers : undefined,
        designation: form.enquiryFor === 'College Enquiry' ? form.designation : undefined,
        reason: form.enquiryFor === 'College Enquiry' ? form.reason : undefined,
      };
      await axios.post(`${API_URL}/api/inquiries`, payload);
      toast.success('Inquiry submitted successfully!');
      setMessage('');
      setForm({
        name: '', groupType: '', contactNo: '', college: '', gender: '', course: '', courseYear: '', enquiryFor: '', enquiryDetail: '', subEnquiry: '', otherCoaching: '', designation: '', reason: ''
      });
      setSubOptions([]);
      setShowOtherCoaching(false);
      setGroupCount(1);
      setGroupMembers([]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inquiry-form-container">
      <h2 style={{ textAlign: "left", marginBottom: "10px", fontSize: "40px" }}>Get in Touch</h2>
      <p style={{ textAlign: "left", fontSize: "20px" }}>Feel free to drop us a line below!</p>
      <form className="basic-form" onSubmit={handleSubmit} autoComplete="off">
        <h3 className="basic-form-title" style={{ fontSize: "30px" }} >Inquiry Form</h3>
        {message && <div className="basic-form-message">{message}</div>}
        <div className="basic-form-group">
          <label>Name:</label>
          <input className="basic-form-input" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Contact No:</label>
          <input className="basic-form-input" name="contactNo" value={form.contactNo} onChange={handleChange} required />
        </div>
        <div className="basic-form-group">
          <label>Are you a group of friends or an individual?</label>
          <select className="basic-form-input" name="groupType" value={form.groupType} onChange={handleChange} required>
            <option value="">Select</option>
            {GROUP_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>



        {form.groupType === 'Group' && (
          <>
            <div className="basic-form-group">
              <label>No of people:</label>
              <input
                className="basic-form-input"
                type="number"
                min="1"
                max="5"
                value={groupCount}
                onChange={handleGroupCountChange}
                required
              />
            </div>
            {Array.from({ length: groupCount - 1 }).map((_, idx) => (
              <div className="basic-form-group" key={idx + 1}>
                <label>Member {idx + 2} Name <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span>:</label>
                <input
                  className="basic-form-input"
                  value={groupMembers[idx + 1]?.name || ''}
                  onChange={e => handleGroupMemberChange(idx + 1, 'name', e.target.value)}
                  placeholder={`Name of member ${idx + 2}`}
                />
                <label>Member {idx + 2} Phone <span style={{ color: '#888', fontWeight: 400 }}>(optional)</span>:</label>
                <input
                  className="basic-form-input"
                  value={groupMembers[idx + 1]?.phone || ''}
                  onChange={e => handleGroupMemberChange(idx + 1, 'phone', e.target.value)}
                  placeholder={`Phone of member ${idx + 2}`}
                />
              </div>
            ))}
          </>
        )}
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
        {form.enquiryFor === 'College Enquiry' && (
          <>
            <div className="basic-form-group">
              <label>Designation:</label>
              <input
                className="basic-form-input"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="basic-form-group">
              <label>Reason:</label>
              <input
                className="basic-form-input"
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        {subOptions.length > 0 && (
          <div className="basic-form-group">
            <label>{form.enquiryFor === 'Hostel' ? 'Room Type:' : form.enquiryFor === 'Coaching' ? 'Courses/ Training/ Internship Type:' : ''}</label>
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

