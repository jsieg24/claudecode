import { Sequelize } from 'sequelize';
import { config } from './index';

export const sequelize = new Sequelize({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  dialect: 'postgres',
  logging: config.nodeEnv === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
}

export async function syncDatabase(): Promise<void> {
  try {
    await sequelize.sync({ alter: config.nodeEnv === 'development' });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Failed to synchronize database:', error);
    throw error;
  }
}
