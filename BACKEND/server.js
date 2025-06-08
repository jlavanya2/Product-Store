const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const { connectDB } = require('./config/db.js');



const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Routes
app.use("/api/products", require('./routes/product.route.js'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'..' ,'FRONTEND/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'FRONTEND', 'dist', 'index.html'));
  });
}


// Start server
app.listen(PORT, async () => {
  await connectDB();
console.log(`Server started at http://localhost:${PORT}`);
});
