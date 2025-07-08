import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';

const ENQUIRY_FOR_OPTIONS = ['Hostel', 'Mess', 'Coaching', 'College Enquiry'];

function InquiryDetailsModal({ open, onClose, inquiry }) {
  if (!open || !inquiry) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.35)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--offwhite)', color: 'var(--dark-bg)', borderRadius: 12, maxWidth: 400, width: '90vw', padding: 24, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--gray-bg)' }}>&times;</button>
        <h2 style={{ marginTop: 0, marginBottom: 12, fontSize: '1.3rem', fontWeight: 700 }}>Inquiry Details</h2>
        <div style={{ fontSize: '1rem', lineHeight: 1.6 }}>
          <div><b>Name:</b> {inquiry.name}</div>
          <div><b>Group Type:</b> {inquiry.groupType}</div>
          <div><b>Contact No:</b> {inquiry.contactNo}</div>
          <div><b>College:</b> {inquiry.college}</div>
          <div><b>Gender:</b> {inquiry.gender}</div>
          <div><b>Course:</b> {inquiry.course}</div>
          <div><b>Course Year:</b> {inquiry.courseYear}</div>
          <div><b>Enquiry For:</b> {inquiry.enquiryFor}</div>
          <div><b>Enquiry Detail:</b> {inquiry.enquiryDetail}</div>
          {inquiry.designation && <div><b>Designation:</b> {inquiry.designation} </div> } 
          {inquiry.reason && <div><b>Reason:</b> {inquiry.reason}</div>}
          {Array.isArray(inquiry.groupMembers) && inquiry.groupMembers.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <b>Group Members:</b>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {inquiry.groupMembers.map((m, i) => (
                  <li key={i}>{m.name || '(no name)'} {m.phone && `- ${m.phone}`}</li>
                ))}
              </ul>
            </div>
          )}
          <div><b>Resolved:</b> {inquiry.responded ? 'Yes' : 'No'}</div>
          <div><b>Created At:</b> {new Date(inquiry.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default function InquiryTable({ inquiries, onResolve, loading }) {
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const [search, setSearch] = useState('');
  const [responded, setResponded] = useState('');
  const [enquiryFor, setEnquiryFor] = useState('');
  const isMobile = useMediaQuery('(max-width:900px)');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Filter inquiries client-side (can be moved to server-side if needed)
  const filtered = safeInquiries.filter(inq => {
    let match = true;
    if (search) {
      const s = search.toLowerCase();
      match = [inq.name, inq.contactNo, inq.college, inq.course].some(f => f && f.toLowerCase().includes(s));
    }
    if (match && responded !== '') {
      match = inq.responded === (responded === 'true');
    }
    if (match && enquiryFor) {
      match = inq.enquiryFor === enquiryFor;
    }
    return match;
  });

  const handleGroupCountChange = (e) => {
    let value = e.target.value;
    // Allow empty string for typing
    if (value === '') {
      setGroupCount('');
      setGroupMembers([]);
      return;
    }
    let count = parseInt(value, 10);
    if (isNaN(count)) return;
    if (count < 1) count = 1;
    if (count > 5) count = 5;
    setGroupCount(count);
    setGroupMembers((prev) => {
      const arr = [...prev];
      while (arr.length < count) arr.push({ name: '', phone: '' });
      return arr.slice(0, count);
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <InquiryDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} inquiry={selectedInquiry} />
      <h2 style={{
        color: 'var(--dark-bg)',
        fontWeight: 700,
        fontSize: '1.5rem',
        marginBottom: 18,
        letterSpacing: '1px',
      }}>Inquiries</h2>
      <div style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        marginBottom: 18,
        flexWrap: 'wrap',
        background: 'var(--offwhite)',
        borderRadius: 10,
        padding: '12px 16px',
        boxSizing: 'border-box',
        boxShadow: '0 1px 4px rgba(34,40,49,0.04)'
      }}>
        <input
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1.5px solid var(--gray-bg)',
            fontSize: '1rem',
            background: '#f7f7f7',
            color: 'var(--dark-bg)',
            outline: 'none',
            minWidth: 180,
            flex: 1,
          }}
          placeholder="Search by name, contact, college, course"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1.5px solid var(--gray-bg)',
            fontSize: '1rem',
            background: '#f7f7f7',
            color: 'var(--dark-bg)',
            outline: 'none',
          }}
          value={responded}
          onChange={e => setResponded(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Resolved</option>
          <option value="false">Not Resolved</option>
        </select>
        <select
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1.5px solid var(--gray-bg)',
            fontSize: '1rem',
            background: '#f7f7f7',
            color: 'var(--dark-bg)',
            outline: 'none',
          }}
          value={enquiryFor}
          onChange={e => setEnquiryFor(e.target.value)}
        >
          <option value="">All Types</option>
          {ENQUIRY_FOR_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      {loading ? <div style={{ color: 'var(--gray-bg)', fontWeight: 500 }}>Loading...</div> : (
        isMobile ? (
          <div className="inquiry-tile-grid">
            {filtered.length === 0 ? (
              <div style={{ color: 'var(--gray-bg)', textAlign: 'center', padding: 18, width: '100%' }}>No inquiries found.</div>
            ) : filtered.map(inq => (
              <div className="inquiry-tile" key={inq._id}>
                <div className="inquiry-tile-row"><b>Name:</b> {inq.name}</div>
                <div className="inquiry-tile-row"><b>Group Type:</b> {inq.groupType}</div>
                <div className="inquiry-tile-row"><b>Contact No:</b> {inq.contactNo}</div>
                <div className="inquiry-tile-row"><b>College:</b> {inq.college}</div>
                <div className="inquiry-tile-row"><b>Gender:</b> {inq.gender}</div>
                <div className="inquiry-tile-row"><b>Course:</b> {inq.course}</div>
                <div className="inquiry-tile-row"><b>Course Year:</b> {inq.courseYear}</div>
                <div className="inquiry-tile-row"><b>Enquiry For:</b> {inq.enquiryFor}</div>
                <div className="inquiry-tile-row"><b>Enquiry Detail:</b> {inq.enquiryDetail}</div>
                <div className="inquiry-tile-row"><b>Resolved:</b> {inq.responded ? 'Yes' : 'No'}</div>
                <div className="inquiry-tile-row"><b>Created At:</b> {new Date(inq.createdAt).toLocaleString()}</div>
                <div className="inquiry-tile-row">
                  <button
                    style={{
                      background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', marginTop: 6, marginBottom: 6, marginRight: 8
                    }}
                    onClick={() => { setSelectedInquiry(inq); setModalOpen(true); }}
                  >
                    View Details
                  </button>
                  {!inq.responded && (
                    <button
                      style={{
                        background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', marginTop: 6, marginBottom: 6
                      }}
                      onClick={() => onResolve(inq._id)}
                      onMouseOver={e => e.currentTarget.style.background = 'var(--gray-bg)'}
                      onMouseOut={e => e.currentTarget.style.background = 'var(--teal)'}
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              background: 'var(--offwhite)',
              borderRadius: 8,
              overflow: 'hidden',
              fontSize: '0.98rem',
            }}>
              <thead>
                <tr>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700, padding: '10px 8px' }}>Name</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Group Type</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Contact No</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>College</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Gender</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Course</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Course Year</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Enquiry For</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Enquiry Detail</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Resolved</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Created At</th>
                  <th style={{ background: 'var(--dark-bg)', color: '#fff', fontWeight: 700 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="12" style={{ color: 'var(--gray-bg)', textAlign: 'center', padding: 18 }}>No inquiries found.</td></tr>
                ) : filtered.map(inq => (
                  <tr key={inq._id} style={{ background: '#f7f7f7', color: 'var(--dark-bg)' }}>
                    <td>{inq.name}</td>
                    <td>{inq.groupType}</td>
                    <td>{inq.contactNo}</td>
                    <td>{inq.college}</td>
                    <td>{inq.gender}</td>
                    <td>{inq.course}</td>
                    <td>{inq.courseYear}</td>
                    <td>{inq.enquiryFor}</td>
                    <td>{inq.enquiryDetail}</td>
                    <td>{inq.responded ? 'Yes' : 'No'}</td>
                    <td>{new Date(inq.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        style={{
                          background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', marginTop: 6, marginBottom: 6, marginRight: 8
                        }}
                        onClick={() => { setSelectedInquiry(inq); setModalOpen(true); }}
                      >
                        View Details
                      </button>
                      {!inq.responded && (
                        <button style={{
                          background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 16, padding: '6px 16px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s', marginTop: 6, marginBottom: 6
                        }}
                          onClick={() => onResolve(inq._id)}
                          onMouseOver={e => e.currentTarget.style.background = 'var(--gray-bg)'}
                          onMouseOut={e => e.currentTarget.style.background = 'var(--teal)'}
                        >
                          Resolve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
} 