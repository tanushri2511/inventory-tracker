const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Sales route working' });
});

router.post('/', (req, res) => {
  res.json({ success: true, message: 'Sale created', data: req.body });
});

module.exports = router;