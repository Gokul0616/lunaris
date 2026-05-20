const { Pool } = require('pg');
const { MongoClient } = require('mongodb');

let dbType = 'postgres'; // 'postgres' or 'mongodb'
let mongoDb = null;
let pool = null;

const initDb = async () => {
  const pgConnectionString = process.env.DATABASE_URL;
  const mongoConnectionString = process.env.MONGODB_URL;

  // Try PostgreSQL connection first
  try {
    if (!pgConnectionString) {
      throw new Error('DATABASE_URL is not defined');
    }

    pool = new Pool({
      connectionString: pgConnectionString,
      ssl: {
        rejectUnauthorized: false
      },
      connectionTimeoutMillis: 5000 // 5 seconds timeout to fail fast
    });

    // Test query to confirm live connection
    await pool.query('SELECT NOW()');
    console.log('SUCCESS: Successfully connected to PostgreSQL.');
    
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('SUCCESS: PostgreSQL users table is initialized.');

    // Create storefront_settings table for CMS properties
    await pool.query(`
      CREATE TABLE IF NOT EXISTS storefront_settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('SUCCESS: PostgreSQL storefront_settings table is initialized.');
    dbType = 'postgres';
  } catch (pgError) {
    console.warn('\n⚠️  WARNING: PostgreSQL connection failed (or is paused on Railway):', pgError.message);
    console.warn('⚠️  PostgreSQL offline. Attempting dynamic connection fallback to MongoDB Atlas...\n');

    try {
      if (!mongoConnectionString) {
        throw new Error('MONGODB_URL is not defined in environment variables');
      }

      const mongoClient = new MongoClient(mongoConnectionString);
      await mongoClient.connect();
      mongoDb = mongoClient.db('lunaris');
      dbType = 'mongodb';
      
      console.log('SUCCESS: Dynamic fallback successful! Connected to MongoDB (lunaris).');
    } catch (mongoError) {
      console.error('CRITICAL ERROR: Both PostgreSQL and MongoDB fallback connections failed!');
      console.error('PostgreSQL Error:', pgError.message);
      console.error('MongoDB Error:', mongoError.message);
      process.exit(1);
    }
  }
};

module.exports = {
  initDb,
  getDbType: () => dbType,
  getPool: () => pool,
  getMongoDb: () => mongoDb
};
