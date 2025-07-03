import Admin from '../models/Admin.js';
import Inquiry from '../models/Inquiry.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required.' });
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials.' });
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

export const getInquiries = async (req, res) => {
  try {
    const { search, responded, enquiryFor } = req.query;
    let filter = {};
    if (typeof responded !== 'undefined') filter.responded = responded === 'true';
    if (enquiryFor) filter.enquiryFor = enquiryFor;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { contactNo: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
      ];
    }
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const respondToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    if (!response) return res.status(400).json({ message: 'Response is required.' });
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
    inquiry.responded = true;
    inquiry.response = response;
    await inquiry.save();
    res.json({ message: 'Inquiry responded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const resolveInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found.' });
    inquiry.responded = true;
    await inquiry.save();
    res.json({ message: 'Inquiry marked as resolved.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 