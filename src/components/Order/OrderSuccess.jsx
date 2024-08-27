import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return <p>Brak danych o zamówieniu.</p>;
  }

  return (
    <div className="order-success">
      <div className="order-success__content">
        <h2>Potwierdzenie zamówienia</h2>
        <p>Dziękujemy za Twoje zamówienie! Twoja płatność została pomyślnie przetworzona.</p>

        <div className="order-details">
          <h3>Szczegóły zamówienia</h3>
          <p>
            <strong>Imię i Nazwisko:</strong> {orderDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email}
          </p>
          <p>
            <strong>Adres:</strong> {orderDetails.address}
          </p>
          <p>
            <strong>Miasto:</strong> {orderDetails.city}
          </p>
          <p>
            <strong>Kod Pocztowy:</strong> {orderDetails.postalCode}
          </p>
          <p>
            <strong>Numer Telefonu:</strong> {orderDetails.phone}
          </p>
          <p>
            <strong>Suma zamówienia:</strong> {orderDetails.totalPrice} zł
          </p>
          <p>
            <strong>Numer zamówienia:</strong> {orderDetails.orderId}
          </p>
        </div>

        <div className="order-success__buttons">
          <Link to="/" className="button">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
