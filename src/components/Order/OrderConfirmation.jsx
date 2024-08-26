import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51Ps1EDLbvPIbSoGb6oA3bOZsesuRqhs2AX7azAu8WDigjjvrHxiSLeDcmzfTKdb9jg3ZxhcoSAJeMLvTGDPo0IDf00VvJCvl8O',
); // Ваш Publishable Key

const OrderConfirmation = ({ formData, onConfirmPayment, onCancel, onEdit }) => {
  const handlePayment = async () => {
    const stripe = await stripePromise;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: {
        // Здесь будет Stripe Elements (который должен быть интегрирован)
      },
      billing_details: {
        name: formData.name,
        email: formData.email,
        address: {
          line1: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
        },
      },
    });

    if (error) {
      console.error('[Error]', error);
      return;
    }

    onConfirmPayment(paymentMethod.id);
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

export default OrderConfirmation;
