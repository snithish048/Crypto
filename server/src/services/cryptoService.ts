// src/services/cryptoService.ts
import axios from 'axios';
import CryptoData from '../models/cryptoData';

const fetchCryptoPrices = async () => {
  const coins = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'dogecoin'];
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);

  for (const coin of coins) {
    const price = response.data[coin].usd;
    await CryptoData.create({ symbol: coin.toUpperCase(), price });
  }
};

export const startCryptoPolling = () => {
  fetchCryptoPrices();
  setInterval(fetchCryptoPrices, 10000); // Fetch every 10 seconds
};
