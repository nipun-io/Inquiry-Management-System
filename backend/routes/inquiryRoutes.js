import express from 'express';
import { submitInquiry } from '../controllers/inquiryController.js';

const router = express.Router();

router.post('/api/inquiries', submitInquiry);

export default router; 