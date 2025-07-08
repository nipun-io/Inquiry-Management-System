import { Router } from 'express';
import { submitInquiry } from '../controllers/inquiryController.js';

const router = Router();

router.post('/api/inquiries', submitInquiry);

// Minimal keepalive route
router.get('/api/keepalive', (req, res) => {
  console.log('keepalive');
  res.status(200).send('OK');
});

export default router; 