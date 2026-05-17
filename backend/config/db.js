import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

// Use DATABASE_URL if available (great for cloud databases like Neon), 
// otherwise fall back to individual connection parameters.
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  // Tweak pool settings for performance
  max: 20,             // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if a connection takes longer than 2 seconds
});

pool.on('connect', () => {
  console.log('JDFit database connected successfully.');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle JDFit database client:', err);
  process.exit(-1);
});

export default pool;