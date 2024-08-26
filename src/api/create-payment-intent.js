// api/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Используем Secret Key через переменные окружения

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // сумма в центах
        currency: 'pln', // Правильный код валюты
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
