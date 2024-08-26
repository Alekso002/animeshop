import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/cartItem';
import { clearItem } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';
import CustomPopup from '../components/CustomPopup';
import OrderForm from '../components/Order/OrderForm';
import OrderConfirmation from '../components/Order/OrderConfirmation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51Ps1EDLbvPIbSoGb6oA3bOZsesuRqhs2AX7azAu8WDigjjvrHxiSLeDcmzfTKdb9jg3ZxhcoSAJeMLvTGDPo0IDf00VvJCvl8O',
); // Ваш Publishable Key

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);
  const [isOrderConfirmationVisible, setOrderConfirmationVisible] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    setPopupVisible(true);
  };

  const handleConfirmClear = () => {
    setPopupVisible(false);
    dispatch(clearItem());
  };

  const handleCancelClear = () => {
    setPopupVisible(false);
  };

  const handleOrderSubmit = (formData) => {
    setOrderData(formData);
    setOrderFormVisible(false);
    setOrderConfirmationVisible(true);
  };

  const handleConfirmPayment = async () => {
    const stripe = await stripePromise;

    // Создаем PaymentIntent на сервере
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalPrice * 100, // сумма в центах (например, для $50 это 5000)
      }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          /* данные карты, собранные с помощью Stripe Elements */
        },
        billing_details: {
          name: orderData.name,
          email: orderData.email,
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      // Обработка ошибки (например, показ уведомления)
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent);
      // Оплата прошла успешно, можно выполнить действия после успешной оплаты
      setOrderConfirmationVisible(false);
      // Здесь можно добавить редирект на страницу с подтверждением заказа
    }
  };

  const handleEditOrder = () => {
    setOrderConfirmationVisible(false);
    setOrderFormVisible(true);
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
            Koszyk
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
            <span>Wyczyść koszyk</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => (
            <CartItem key={`${item.id}-${item.type}-${item.size}`} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <div className="left">
              <span>
                Razem: <b>{totalCount} szt.</b>
              </span>
            </div>
            <div className="right">
              <span>
                Suma zamówienia: <b>{totalPrice} zł</b>
              </span>
            </div>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                {/* SVG Path */}
              </svg>

              <span>Wróć</span>
            </Link>
            <div className="button pay-btn" onClick={() => setOrderFormVisible(true)}>
              <span>Zapłać teraz</span>
            </div>
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <CustomPopup
          message="Czy na pewno chcesz wyczyścić koszyk?"
          onConfirm={handleConfirmClear}
          onCancel={handleCancelClear}
        />
      )}
      {isOrderFormVisible && (
        <OrderForm
          onClose={() => setOrderFormVisible(false)}
          onSubmit={handleOrderSubmit}
          initialData={orderData}
        />
      )}
      {isOrderConfirmationVisible && (
        <OrderConfirmation
          formData={orderData}
          onConfirmPayment={handleConfirmPayment}
          onCancel={() => setOrderConfirmationVisible(false)}
          onEdit={handleEditOrder}
        />
      )}
    </div>
  );
};

export default Cart;
