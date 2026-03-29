import { Pool } from 'pg';
import { config } from '../db/config.js';

const pool = new Pool({
  connectionString: config.dbUrl,
});

export default pool;