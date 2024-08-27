import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/cartItem';
import { clearItem } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';
import CustomPopup from '../components/CustomPopup';
import OrderForm from '../components/Order/OrderForm';
import OrderConfirmationWrapper from '../components/Order/OrderConfirmation'; // Импорт компонента подтверждения заказа
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51Ps1EDLbvPIbSoGb6oA3bOZsesuRqhs2AX7azAu8WDigjjvrHxiSLeDcmzfTKdb9jg3ZxhcoSAJeMLvTGDPo0IDf00VvJCvl8O',
); // Замените на ваш Publishable Key

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);
  const [isOrderConfirmationVisible, setOrderConfirmationVisible] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

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

  const handleOrderSubmit = async (formData) => {
    setOrderData({
      ...formData,
      products: items, // Добавляем товары в formData
    });
    setOrderFormVisible(false);

    // Запрос на создание платежного намерения
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalPrice * 100, // сумма в центах
      }),
    });

    const data = await response.json();
    setClientSecret(data.clientSecret); // Сохранение clientSecret в состоянии

    setOrderConfirmationVisible(true);
  };

  const handleConfirmPayment = async (paymentMethodId) => {
    const stripe = await stripePromise;

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });

      if (error) {
        console.error('Ошибка оплаты:', error);
        // Обработка ошибки (например, показ уведомления пользователю)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
        // Оплата прошла успешно, можно выполнить действия после успешной оплаты
        setOrderConfirmationVisible(false);
        // Здесь можно добавить редирект на страницу с подтверждением заказа
      } else {
        console.error('Неожиданное состояние платежа:', paymentIntent);
      }
    } catch (err) {
      console.error('Ошибка во время оплаты:', err);
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
      {isOrderConfirmationVisible && clientSecret && (
        <OrderConfirmationWrapper
          formData={orderData}
          clientSecret={clientSecret}
          onConfirmPayment={handleConfirmPayment}
          onCancel={() => setOrderConfirmationVisible(false)}
          onEdit={handleEditOrder}
        />
      )}
    </div>
  );
};

export default Cart;
