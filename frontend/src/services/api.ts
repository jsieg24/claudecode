import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MetricsData {
  mrr: number;
  arr: number;
  activeSubscriptions: number;
  churnRate: number;
  ltv: number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface CohortData {
  cohort: string;
  month0: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
  month6: number;
  month7: number;
  month8: number;
  month9: number;
  month10: number;
  month11: number;
}

export interface RevenueByPlatform {
  source_platform: string;
  total_revenue: string;
  order_count: string;
}

export interface TopCustomer {
  customer_id: string;
  total_spent: string;
  order_count: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const analyticsApi = {
  getMetrics: async (startDate?: string, endDate?: string): Promise<MetricsData> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get(`/analytics/metrics?${params.toString()}`);
    return response.data.data;
  },

  getMRRTimeSeries: async (months: number = 12): Promise<TimeSeriesData[]> => {
    const response = await apiClient.get(`/analytics/metrics/mrr?months=${months}`);
    return response.data.data;
  },

  getARRTimeSeries: async (months: number = 12): Promise<TimeSeriesData[]> => {
    const response = await apiClient.get(`/analytics/metrics/arr?months=${months}`);
    return response.data.data;
  },

  getChurnTimeSeries: async (months: number = 12): Promise<TimeSeriesData[]> => {
    const response = await apiClient.get(`/analytics/metrics/churn?months=${months}`);
    return response.data.data;
  },

  getCohortAnalysis: async (): Promise<CohortData[]> => {
    const response = await apiClient.get('/analytics/cohort-analysis');
    return response.data.data;
  },

  getRevenueByPlatform: async (startDate?: string, endDate?: string): Promise<RevenueByPlatform[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await apiClient.get(`/analytics/revenue-by-platform?${params.toString()}`);
    return response.data.data;
  },

  getTopCustomers: async (limit: number = 10): Promise<TopCustomer[]> => {
    const response = await apiClient.get(`/analytics/top-customers?limit=${limit}`);
    return response.data.data;
  },

  syncData: async (): Promise<void> => {
    await apiClient.post('/analytics/sync');
  },

  exportCSV: (): string => {
    return `${API_BASE_URL}/analytics/export/csv`;
  },

  exportPDF: (): string => {
    return `${API_BASE_URL}/analytics/export/pdf`;
  },
};
