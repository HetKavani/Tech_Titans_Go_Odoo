import { Router } from 'express';
import { getDashboardStats, getInventoryActivity, getCategoryDistribution } from '../controllers/reportsController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/stats', authenticate, getDashboardStats);
router.get('/activity', authenticate, getInventoryActivity);
router.get('/distribution', authenticate, getCategoryDistribution);

export default router;
