import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Инициализация Stripe с вашим Publishable Key
const stripePromise = loadStripe(
  'pk_test_51Ps1EDLbvPIbSoGb6oA3bOZsesuRqhs2AX7azAu8WDigjjvrHxiSLeDcmzfTKdb9jg3ZxhcoSAJeMLvTGDPo0IDf00VvJCvl8O',
);

const OrderConfirmation = ({ formData, clientSecret, onCancel, onEdit }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      navigate('/order-success', {
        state: {
          paymentError: error.message, // Передаем сообщение об ошибке
        },
      });
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      console.log('Оплата прошла успешно!', paymentIntent);

      // Перенаправление на страницу успеха заказа
      navigate('/order-success', {
        state: {
          orderDetails: {
            ...formData,
            totalPrice: (paymentIntent.amount / 100).toFixed(2), // Перевод суммы в формат zł
            orderId: paymentIntent.id, // Используем ID paymentIntent в качестве номера заказа
          },
        },
      });
    }
  };

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__content">
        <h2>{t('orderConfirmation')}</h2>
        <p>
          <strong>{t('name')}:</strong> {formData.name}
        </p>
        <p>
          <strong>{t('email')}:</strong> {formData.email}
        </p>
        <p>
          <strong>{t('address')}:</strong> {formData.address}
        </p>
        <p>
          <strong>{t('city')}:</strong> {formData.city}
        </p>
        <p>
          <strong>{t('postalCode')}:</strong> {formData.postalCode}
        </p>
        <p>
          <strong>{t('phoneNumber')}:</strong> {formData.phone}
        </p>

        {/* Отображение списка продуктов */}
        <div className="order-confirmation__products">
          <h3>{t('orderedProducts')}:</h3>
          <ul>
            {formData.products.map((product, index) => (
              <li key={index}>
                {product.title} - {product.type} - {product.size} - {product.count} szt.
              </li>
            ))}
          </ul>
        </div>

        {/* Stripe Elements Card Input */}
        <div className="order-confirmation__card">
          <CardElement />
        </div>

        <div className="order-confirmation__buttons">
          <button className="order-confirmation__confirm" onClick={handlePayment}>
            {t('pay')}
          </button>
          <button className="order-confirmation__edit" onClick={onEdit}>
            {t('edit')}
          </button>
          <button className="order-confirmation__cancel" onClick={onCancel}>
            {t('cancel')}
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
