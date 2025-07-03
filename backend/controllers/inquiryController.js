import Inquiry from '../models/Inquiry.js';

export const submitInquiry = async (req, res) => {
  try {
    const {
      name,
      groupType,
      contactNo,
      college,
      gender,
      course,
      courseYear,
      enquiryFor,
      enquiryDetail,
    } = req.body;

    if (!name || !groupType || !contactNo || !college || !gender || !course || !courseYear || !enquiryFor || !enquiryDetail) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const inquiry = new Inquiry({
      name,
      groupType,
      contactNo,
      college,
      gender,
      course,
      courseYear,
      enquiryFor,
      enquiryDetail,
    });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 