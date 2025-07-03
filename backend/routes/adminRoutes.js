import express from 'express';
import { login, getInquiries, respondToInquiry, resolveInquiry } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/api/admin/login', login);
router.get('/api/admin/inquiries', auth, getInquiries);
router.post('/api/admin/inquiries/:id/respond', auth, respondToInquiry);
router.post('/api/admin/inquiries/:id/resolve', auth, resolveInquiry);

export default router; 