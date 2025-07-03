import { useState } from 'react';

const ENQUIRY_FOR_OPTIONS = ['Hostel', 'Mess', 'Coaching'];

export default function InquiryTable({ inquiries, onResolve, loading }) {
  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const [search, setSearch] = useState('');
  const [responded, setResponded] = useState('');
  const [enquiryFor, setEnquiryFor] = useState('');

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

  return (
    <div style={{ width: '100%' }}>
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
                    {!inq.responded && (
                      <button style={{
                        background: 'var(--teal)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 16,
                        padding: '6px 16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                        onClick={() => onResolve(inq._id)}
                        onMouseOver={e => e.currentTarget.style.background = 'var(--gray-bg)'}
                        onMouseOut={e => e.currentTarget.style.background = 'var(--teal)'}
                      >
                        Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 