// api/create-payment-intent.js

// Подключаем dotenv для локальной разработки
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    try {
      // Создаем платежное намерение
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // сумма в центах
        currency: 'pln',
      });

      // Возвращаем клиенту client_secret для завершения оплаты
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Ошибка при создании PaymentIntent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    // Пример обработки GET-запроса
    res.status(200).json({ message: 'GET request received!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
