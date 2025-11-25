const express = require('express');
const app = express();

app.use(express.json());

// API cộng
app.get('/cong', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  res.json({ ketQua: a + b });
});

// API trừ
app.get('/tru', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  res.json({ ketQua: a - b });
});

// API nhân
app.get('/nhan', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  res.json({ ketQua: a * b });
});

// API chia
app.get('/chia', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (b === 0) {
    return res.status(400).json({ loi: "Không thể chia cho 0" });
  }
  res.json({ ketQua: a / b });
});

// Khởi động server
app.listen(3000, () => {
  console.log('Server đang chạy tại http://localhost:3000');
});
