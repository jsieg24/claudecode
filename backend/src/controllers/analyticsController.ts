import { Request, Response } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { SyncService } from '../services/SyncService';
import { ExportService } from '../services/ExportService';

const analyticsService = new AnalyticsService();
const syncService = new SyncService();
const exportService = new ExportService();

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate as string) : undefined;
    const end = endDate ? new Date(endDate as string) : undefined;

    const metrics = await analyticsService.getMetrics(start, end);

    res.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error('Error getting metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch metrics',
    });
  }
};

export const getMRRTimeSeries = async (req: Request, res: Response) => {
  try {
    const months = parseInt(req.query.months as string) || 12;
    const data = await analyticsService.getMRRTimeSeries(months);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting MRR time series:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch MRR time series',
    });
  }
};

export const getARRTimeSeries = async (req: Request, res: Response) => {
  try {
    const months = parseInt(req.query.months as string) || 12;
    const data = await analyticsService.getARRTimeSeries(months);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting ARR time series:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ARR time series',
    });
  }
};

export const getChurnTimeSeries = async (req: Request, res: Response) => {
  try {
    const months = parseInt(req.query.months as string) || 12;
    const data = await analyticsService.getChurnTimeSeries(months);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting churn time series:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch churn time series',
    });
  }
};

export const getCohortAnalysis = async (req: Request, res: Response) => {
  try {
    const data = await analyticsService.getCohortAnalysis();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting cohort analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cohort analysis',
    });
  }
};

export const getRevenueByPlatform = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate as string) : undefined;
    const end = endDate ? new Date(endDate as string) : undefined;

    const data = await analyticsService.getRevenueByPlatform(start, end);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting revenue by platform:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch revenue by platform',
    });
  }
};

export const getTopCustomers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const data = await analyticsService.getTopCustomers(limit);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error getting top customers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top customers',
    });
  }
};

export const syncData = async (req: Request, res: Response) => {
  try {
    await syncService.syncAll();

    res.json({
      success: true,
      message: 'Data sync completed successfully',
    });
  } catch (error) {
    console.error('Error syncing data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync data',
    });
  }
};

export const exportMetricsCSV = async (req: Request, res: Response) => {
  try {
    const filePath = `/tmp/metrics_${Date.now()}.csv`;
    await exportService.exportMetricsToCSV(filePath);

    res.download(filePath, 'metrics.csv', (err) => {
      if (err) console.error('Error downloading file:', err);
      // Clean up temp file
      require('fs').unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Error exporting metrics to CSV:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export metrics',
    });
  }
};

export const exportMetricsPDF = async (req: Request, res: Response) => {
  try {
    const pdfBuffer = await exportService.exportMetricsToPDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=metrics.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error exporting metrics to PDF:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export metrics',
    });
  }
};
