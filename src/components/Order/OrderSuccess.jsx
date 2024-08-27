import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const OrderSuccess = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const paymentError = location.state?.paymentError;

  if (!orderDetails && !paymentError) {
    return <p>{t('noOrderData')}</p>;
  }

  return (
    <div className="order-success">
      <div className="order-success__content">
        {paymentError ? (
          <>
            <h2>{t('paymentFailed')}</h2>
            <p>{t('paymentError')}</p>
            <p>
              {t('reason')}: {paymentError}
            </p>
            <div className="order-success__buttons">
              <Link to="/cart" className="button">
                {t('backToCart')}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2>{t('orderConfirmation')}</h2>
            <p>{t('thankYouForOrder')}</p>

            <div className="order-details">
              <h3>{t('orderDetails')}</h3>
              <p>
                <strong>{t('name')}:</strong> {orderDetails.name}
              </p>
              <p>
                <strong>{t('email')}:</strong> {orderDetails.email}
              </p>
              <p>
                <strong>{t('address')}:</strong> {orderDetails.address}
              </p>
              <p>
                <strong>{t('city')}:</strong> {orderDetails.city}
              </p>
              <p>
                <strong>{t('postalCode')}:</strong> {orderDetails.postalCode}
              </p>
              <p>
                <strong>{t('phoneNumber')}:</strong> {orderDetails.phone}
              </p>
              <p>
                <strong>{t('totalPrice')}:</strong> {orderDetails.totalPrice} zł
              </p>
              <p>
                <strong>{t('orderId')}:</strong> {orderDetails.orderId}
              </p>
            </div>

            <div className="order-success__buttons">
              <Link to="/" className="button">
                {t('backToHome')}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
