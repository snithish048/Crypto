// src/routes/cryptoRoutes.ts
import express from 'express';
import CryptoData from '../models/cryptoData';

const router = express.Router();

router.get('/crypto/:symbol', async (req, res) => {
  
  const { symbol } = req.params;
  const data = await CryptoData.find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20);
  res.json(data);
});

export default router;
