import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'subscription_analytics',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
  },

  platforms: {
    shopify: {
      shopUrl: process.env.SHOPIFY_SHOP_URL || '',
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN || '',
    },
    skio: {
      apiUrl: process.env.SKIO_API_URL || 'https://api.skio.com/graphql',
      accessToken: process.env.SKIO_ACCESS_TOKEN || '',
    },
    recharge: {
      apiUrl: process.env.RECHARGE_API_URL || 'https://api.rechargeapps.com',
      accessToken: process.env.RECHARGE_ACCESS_TOKEN || '',
    },
    stayAi: {
      apiUrl: process.env.STAY_AI_API_URL || 'https://api.stay.ai',
      accessToken: process.env.STAY_AI_ACCESS_TOKEN || '',
    },
    klaviyo: {
      apiUrl: process.env.KLAVIYO_API_URL || 'https://a.klaviyo.com/api',
      apiKey: process.env.KLAVIYO_API_KEY || '',
    },
  },
};
