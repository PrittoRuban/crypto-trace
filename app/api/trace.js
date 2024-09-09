"use server";
import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const etherscanAPI = `https://api.etherscan.io/api?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKey`;

  try {
    const response = await axios.get(etherscanAPI);
    const transactions = response.data.result;
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Error tracing transaction' });
  }
}
