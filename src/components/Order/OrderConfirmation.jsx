import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Инициализация Stripe с вашим Publishable Key
const stripePromise = loadStripe(
  'pk_test_51Ps1EDLbvPIbSoGb6oA3bOZsesuRqhs2AX7azAu8WDigjjvrHxiSLeDcmzfTKdb9jg3ZxhcoSAJeMLvTGDPo0IDf00VvJCvl8O',
);

const OrderConfirmation = ({ formData, clientSecret, onCancel, onEdit }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    if (!stripe || !elements) {
      // Убедитесь, что Stripe.js загружен
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement not found');
      return;
    }

    // Подтверждение платежа с использованием clientSecret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
          },
        },
      },
    });

    if (error) {
      console.error('[Ошибка оплаты]', error);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('Оплата прошла успешно!', paymentIntent);
      // Здесь можно добавить логику для успешной оплаты, например, редирект на страницу с подтверждением заказа
    }
  };

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__content">
        <h2>Potwierdzenie zamówienia</h2>
        <p>
          <strong>Imię i Nazwisko:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Adres:</strong> {formData.address}
        </p>
        <p>
          <strong>Miasto:</strong> {formData.city}
        </p>
        <p>
          <strong>Kod Pocztowy:</strong> {formData.postalCode}
        </p>
        <p>
          <strong>Numer Telefonu:</strong> {formData.phone}
        </p>

        {/* Stripe Elements Card Input */}
        <div className="order-confirmation__card">
          <CardElement />
        </div>

        <div className="order-confirmation__buttons">
          <button className="order-confirmation__confirm" onClick={handlePayment}>
            Opłać
          </button>
          <button className="order-confirmation__edit" onClick={onEdit}>
            Edytuj
          </button>
          <button className="order-confirmation__cancel" onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderConfirmationWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <OrderConfirmation {...props} />
  </Elements>
);

export default OrderConfirmationWrapper;
