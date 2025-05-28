import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'https://full-stack-minimalist-packing-list.vercel.app',
  'https://full-stack-minimalist-packi-git-ffe2ad-irenes-projects-76dd413f.vercel.app',
  'http://localhost:8000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/items', itemRoutes);

app.use(errorHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client-side', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client-side', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
