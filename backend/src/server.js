require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Expose standard status endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'lunaris-backend' });
});

// Register API Routes
app.use('/api/users', userRoutes);

// Initialize PostgreSQL and Start Express server only after database connection succeeds
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`LUNARIS Premium Backend service is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('CRITICAL ERROR: Failed to start server:', err);
    process.exit(1);
  });
