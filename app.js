import 'dotenv/config';
import express from 'express';
import authRoutes from './auth/auth.routes.js';

if (!process.env.PORT) {
  throw new Error('PORT is not set');
}

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});