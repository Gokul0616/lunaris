const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('CRITICAL ERROR: DATABASE_URL is not defined in environment variables.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('SUCCESS: Successfully connected to PostgreSQL.');
    
    // Create users table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('SUCCESS: Users table is initialized.');
    client.release();
  } catch (err) {
    console.error('CRITICAL ERROR: Failed to connect or initialize PostgreSQL:', err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  initDb
};
