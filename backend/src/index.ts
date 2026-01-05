import express from 'express';
import cors from 'cors';
import { config } from './config';
import { connectDatabase, syncDatabase } from './config/database';
import analyticsRoutes from './routes/analyticsRoutes';
import cron from 'node-cron';
import { SyncService } from './services/SyncService';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Initialize database and start server
async function start() {
  try {
    // Connect to database
    await connectDatabase();

    // Sync database schema
    await syncDatabase();

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🔗 API: http://localhost:${config.port}/api`);
    });

    // Schedule automatic data sync (runs daily at 2 AM)
    const syncService = new SyncService();
    cron.schedule('0 2 * * *', async () => {
      console.log('🕐 Running scheduled data sync...');
      await syncService.syncAll();
    });

    console.log('⏰ Scheduled daily sync at 2:00 AM');
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

start();
