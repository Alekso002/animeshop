import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/cartItem';
import { clearItem } from '../redux/slices/cartSlice';
import CartEmpty from '../components/CartEmpty';
import CustomPopup from '../components/CustomPopup';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const [isPopupVisible, setPopupVisible] = useState(false);

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
            <div className="button pay-btn">
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
    </div>
  );
};

export default Cart;
