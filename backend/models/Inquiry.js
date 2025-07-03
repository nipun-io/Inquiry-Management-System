import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  groupType: { type: String, enum: ['Individual', 'Group'], required: true },
  contactNo: { type: String, required: true },
  college: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  course: { type: String, required: true },
  courseYear: { type: String, required: true },
  enquiryFor: { type: String, enum: ['Hostel', 'Mess', 'Coaching'], required: true },
  enquiryDetail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  responded: { type: Boolean, default: false },
  response: { type: String },
});

export default mongoose.model('Inquiry', InquirySchema); 