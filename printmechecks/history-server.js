const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5174;
const HISTORY_FILE = './history.json';

app.use(cors());
app.use(bodyParser.json());

// Load check history
app.get('/api/history', (req, res) => {
  if (!fs.existsSync(HISTORY_FILE)) return res.json([]);
  const data = fs.readFileSync(HISTORY_FILE, 'utf8');
  res.json(JSON.parse(data || '[]'));
});

// Save check history
app.post('/api/history', (req, res) => {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(req.body, null, 2));
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ History server running at http://localhost:${PORT}`);
});
