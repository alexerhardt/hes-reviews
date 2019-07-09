const express = require('express');
const router = express.Router();

router.get('/force-500', (req, res, next) => {
  return res.status(500).send('Very bad request!');
});

module.exports = router;
