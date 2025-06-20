const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db.js');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", require('./routes/product.route.js'));

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend build
  app.use(express.static(path.join(__dirname, '..', 'FRONTEND', 'dist')));

  // Serve index.html for any unknown route (SPA support)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'FRONTEND', 'dist', 'index.html'));
  });
}

// ✅ PORT should come from environment for Render
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
