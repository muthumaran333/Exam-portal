const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

dotenv.config();

const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const { protect } = require('./src/middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();
// Middleware

app.use(cors({ origin: true, credentials: true }));

app.use(express.json()); // parse incoming JSON

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', protect, adminRoutes);
app.use('/api/student', protect, studentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🎓 Exam Portal API Running');
});

app.get('/testdb', async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    res.json(dbs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front-end/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
  });
}


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
