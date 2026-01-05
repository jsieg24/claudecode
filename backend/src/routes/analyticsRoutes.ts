import { Router } from 'express';
import * as analyticsController from '../controllers/analyticsController';

const router = Router();

// Metrics endpoints
router.get('/metrics', analyticsController.getMetrics);
router.get('/metrics/mrr', analyticsController.getMRRTimeSeries);
router.get('/metrics/arr', analyticsController.getARRTimeSeries);
router.get('/metrics/churn', analyticsController.getChurnTimeSeries);
router.get('/cohort-analysis', analyticsController.getCohortAnalysis);
router.get('/revenue-by-platform', analyticsController.getRevenueByPlatform);
router.get('/top-customers', analyticsController.getTopCustomers);

// Sync endpoints
router.post('/sync', analyticsController.syncData);

// Export endpoints
router.get('/export/csv', analyticsController.exportMetricsCSV);
router.get('/export/pdf', analyticsController.exportMetricsPDF);

export default router;
