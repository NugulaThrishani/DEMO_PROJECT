require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const pastryRoutes = require('./routes/pastryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const shopRoutes = require('./routes/shopRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/pastries', pastryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
}

startServer();
