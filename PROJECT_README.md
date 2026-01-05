# Subscription Analytics Dashboard

A comprehensive web-based analytics dashboard for tracking subscription and marketing performance across multiple e-commerce platforms including Shopify, SKIO, Recharge, Stay.ai, and Klaviyo.

## Features

- **Multi-Platform Integration**: Connect to Shopify, SKIO, Recharge, Stay.ai, and Klaviyo APIs
- **Unified Data Model**: Centralized PostgreSQL database for all platform data
- **Real-time Analytics**: Track MRR, ARR, Churn Rate, Customer LTV, and more
- **Interactive Visualizations**: Beautiful charts powered by Recharts
- **Cohort Analysis**: Track customer retention over time
- **Export Capabilities**: Generate CSV and PDF reports
- **Automated Sync**: Scheduled daily data synchronization from all platforms
- **Secure API Management**: Environment-based configuration for API credentials

## Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **PostgreSQL** database with Sequelize ORM
- **Axios** for API integrations
- **GraphQL** client for SKIO integration
- **CSV Writer** and **PDFKit** for exports
- **Node-Cron** for scheduled tasks

### Frontend
- **React** with **TypeScript**
- **Material-UI (MUI)** component library
- **Recharts** for data visualization
- **Vite** build tool
- **Axios** for API calls

### DevOps
- **Docker** and **Docker Compose**
- **Nginx** for production frontend serving
- **PostgreSQL** containerized database

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- API credentials for the platforms you want to integrate

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subscription-analytics-dashboard
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   # JWT Secret
   JWT_SECRET=your-secret-key-change-in-production

   # Shopify
   SHOPIFY_SHOP_URL=your-shop.myshopify.com
   SHOPIFY_ACCESS_TOKEN=your-shopify-access-token

   # SKIO
   SKIO_API_URL=https://api.skio.com/graphql
   SKIO_ACCESS_TOKEN=your-skio-access-token

   # Recharge
   RECHARGE_API_URL=https://api.rechargeapps.com
   RECHARGE_ACCESS_TOKEN=your-recharge-access-token

   # Stay.ai
   STAY_AI_API_URL=https://api.stay.ai
   STAY_AI_ACCESS_TOKEN=your-stay-ai-access-token

   # Klaviyo
   KLAVIYO_API_URL=https://a.klaviyo.com/api
   KLAVIYO_API_KEY=your-klaviyo-api-key
   ```

3. **Start the application with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database on port 5432
   - Backend API on port 3001
   - Frontend on port 80

4. **Access the dashboard**

   Open your browser and navigate to: `http://localhost`

### Manual Setup (Without Docker)

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. **Ensure PostgreSQL is running**

   Make sure you have PostgreSQL installed and running locally, or use a cloud instance.

5. **Start the backend**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**

   Open `http://localhost:3000` in your browser

## API Endpoints

### Analytics Endpoints

- `GET /api/analytics/metrics` - Get key metrics (MRR, ARR, Churn, LTV)
- `GET /api/analytics/metrics/mrr` - Get MRR time series data
- `GET /api/analytics/metrics/arr` - Get ARR time series data
- `GET /api/analytics/metrics/churn` - Get churn rate time series
- `GET /api/analytics/cohort-analysis` - Get cohort retention analysis
- `GET /api/analytics/revenue-by-platform` - Get revenue breakdown by platform
- `GET /api/analytics/top-customers` - Get top customers by revenue

### Data Management

- `POST /api/analytics/sync` - Trigger manual data sync from all platforms

### Export Endpoints

- `GET /api/analytics/export/csv` - Export metrics to CSV
- `GET /api/analytics/export/pdf` - Export metrics report to PDF

## Database Schema

### Tables

#### customers
- `id` (VARCHAR) - Primary key
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR)
- `created_at` (TIMESTAMP)
- `source_platform` (VARCHAR)

#### subscriptions
- `id` (VARCHAR) - Primary key
- `customer_id` (VARCHAR) - Foreign key to customers
- `status` (VARCHAR) - active, paused, cancelled
- `created_at` (TIMESTAMP)
- `cancelled_at` (TIMESTAMP)
- `next_billing_date` (DATE)
- `mrr` (DECIMAL)
- `source_platform` (VARCHAR)

#### orders
- `id` (VARCHAR) - Primary key
- `customer_id` (VARCHAR) - Foreign key to customers
- `subscription_id` (VARCHAR) - Foreign key to subscriptions
- `created_at` (TIMESTAMP)
- `total_price` (DECIMAL)
- `source_platform` (VARCHAR)

#### klaviyo_campaigns
- `id` (VARCHAR) - Primary key
- `name` (VARCHAR)
- `status` (VARCHAR)
- `sent_at` (TIMESTAMP)
- `open_rate` (FLOAT)
- `click_rate` (FLOAT)
- `conversion_rate` (FLOAT)

## Platform Integrations

### Shopify
- **Authentication**: X-Shopify-Access-Token header
- **API Type**: REST & GraphQL
- **Resources**: Customers, Orders, Products

### SKIO
- **Authentication**: Authorization header
- **API Type**: GraphQL
- **Resources**: Subscriptions, Orders, Customers

### Recharge
- **Authentication**: X-Recharge-Access-Token header
- **API Type**: REST
- **Resources**: Subscriptions, Customers, Charges

### Stay.ai
- **Authentication**: X-RETEXTION-ACCESS-TOKEN header
- **API Type**: REST
- **Resources**: Subscriptions, Orders, Customers

### Klaviyo
- **Authentication**: Authorization header (API Key)
- **API Type**: REST
- **Resources**: Campaigns, Metrics, Profiles, Events

## Key Metrics Explained

### Monthly Recurring Revenue (MRR)
Total recurring revenue from active subscriptions per month.

### Annual Recurring Revenue (ARR)
MRR multiplied by 12, representing annualized subscription revenue.

### Churn Rate
Percentage of subscribers who cancel their subscriptions in a given period.

### Customer Lifetime Value (LTV)
Predicted total revenue a customer will generate over their entire relationship with your business.

### Cohort Analysis
Groups customers by signup month to track retention patterns over time.

## Scheduled Tasks

The application runs automated data synchronization daily at 2:00 AM using node-cron. This ensures your analytics data stays up-to-date without manual intervention.

## Development

### Project Structure

```
subscription-analytics-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── models/         # Database models
│   │   ├── controllers/    # API controllers
│   │   ├── services/       # Business logic
│   │   ├── integrations/   # Platform integrations
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   └── index.ts        # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
├── database/
│   └── init.sql            # Database initialization script
├── docker-compose.yml
└── PROJECT_README.md
```

### Adding New Integrations

To add a new platform integration:

1. Create a new integration class in `backend/src/integrations/`
2. Implement the `PlatformIntegration` interface
3. Add the integration to `SyncService`
4. Update environment variables in `.env.example`
5. Update the README documentation

## Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

### Manual Deployment

1. Set up a PostgreSQL database
2. Build the backend: `cd backend && npm run build`
3. Build the frontend: `cd frontend && npm run build`
4. Deploy backend to your Node.js hosting service
5. Deploy frontend static files to your web server (Nginx, Apache, etc.)

### Cloud Deployment Options

- **Heroku**: Use the included Dockerfile
- **AWS**: Deploy to ECS/EKS or use Elastic Beanstalk
- **Vercel**: Deploy frontend to Vercel, backend to Heroku or AWS
- **DigitalOcean**: Use App Platform or Droplets with Docker

## Security Considerations

- Store API credentials in environment variables, never commit them
- Use strong JWT secrets in production
- Implement rate limiting for API endpoints
- Use HTTPS in production
- Regularly rotate API credentials
- Implement proper CORS policies
- Use prepared statements to prevent SQL injection (Sequelize handles this)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify network connectivity to database

### API Integration Errors
- Verify API credentials are correct
- Check API rate limits
- Ensure API endpoints are accessible
- Review platform-specific API documentation

### Frontend Not Loading
- Check if backend is running on port 3001
- Verify CORS settings
- Check browser console for errors
- Ensure all dependencies are installed

## Future Enhancements

- Real-time forecasting with Prophet/ARIMA
- Machine learning-based churn prediction
- Additional platform integrations
- Advanced filtering and segmentation
- Custom report builder
- Email notifications for key metrics
- Multi-user support with authentication
- Role-based access control
- A/B testing integration
- Revenue forecasting

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Material-UI for the excellent component library
- Recharts for powerful data visualization
- All the e-commerce platforms for their APIs
