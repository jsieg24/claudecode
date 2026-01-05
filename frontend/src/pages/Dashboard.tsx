import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import MetricCard from '../components/MetricCard';
import ChartCard from '../components/ChartCard';
import { analyticsApi, MetricsData, TimeSeriesData, RevenueByPlatform } from '../services/api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SyncIcon from '@mui/icons-material/Sync';
import DownloadIcon from '@mui/icons-material/Download';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [mrrData, setMrrData] = useState<TimeSeriesData[]>([]);
  const [arrData, setArrData] = useState<TimeSeriesData[]>([]);
  const [churnData, setChurnData] = useState<TimeSeriesData[]>([]);
  const [revenueByPlatform, setRevenueByPlatform] = useState<RevenueByPlatform[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [metricsData, mrrTimeSeries, arrTimeSeries, churnTimeSeries, platformRevenue] = await Promise.all([
        analyticsApi.getMetrics(),
        analyticsApi.getMRRTimeSeries(12),
        analyticsApi.getARRTimeSeries(12),
        analyticsApi.getChurnTimeSeries(12),
        analyticsApi.getRevenueByPlatform(),
      ]);

      setMetrics(metricsData);
      setMrrData(mrrTimeSeries);
      setArrData(arrTimeSeries);
      setChurnData(churnTimeSeries);
      setRevenueByPlatform(platformRevenue);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await analyticsApi.syncData();
      await loadData();
    } catch (err) {
      console.error('Error syncing data:', err);
      setError('Failed to sync data from platforms');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Subscription Analytics Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={syncing ? <CircularProgress size={20} /> : <SyncIcon />}
              onClick={handleSync}
              disabled={syncing}
            >
              {syncing ? 'Syncing...' : 'Sync Data'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => window.open(analyticsApi.exportCSV(), '_blank')}
            >
              Export CSV
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => window.open(analyticsApi.exportPDF(), '_blank')}
            >
              Export PDF
            </Button>
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      {metrics && (
        <>
          {/* Key Metrics */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Monthly Recurring Revenue"
                value={metrics.mrr.toFixed(2)}
                prefix="$"
                color="primary.main"
                icon={<AttachMoneyIcon sx={{ fontSize: 48 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Annual Recurring Revenue"
                value={metrics.arr.toFixed(2)}
                prefix="$"
                color="secondary.main"
                icon={<AccountBalanceWalletIcon sx={{ fontSize: 48 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Active Subscriptions"
                value={metrics.activeSubscriptions}
                color="success.main"
                icon={<PeopleIcon sx={{ fontSize: 48 }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <MetricCard
                title="Churn Rate"
                value={metrics.churnRate.toFixed(2)}
                suffix="%"
                color="warning.main"
                icon={<TrendingDownIcon sx={{ fontSize: 48 }} />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Customer Lifetime Value"
                value={metrics.ltv.toFixed(2)}
                prefix="$"
                color="info.main"
              />
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={6}>
              <ChartCard title="MRR Trend (Last 12 Months)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mrrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1976d2"
                      strokeWidth={2}
                      name="MRR ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ChartCard title="ARR Trend (Last 12 Months)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={arrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#9c27b0"
                      strokeWidth={2}
                      name="ARR ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ChartCard title="Churn Rate (Last 12 Months)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={churnData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f57c00"
                      strokeWidth={2}
                      name="Churn Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <ChartCard title="Revenue by Platform">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueByPlatform}
                      dataKey="total_revenue"
                      nameKey="source_platform"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {revenueByPlatform.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
