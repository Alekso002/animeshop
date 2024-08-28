import React from 'react';
import { useTranslation } from 'react-i18next';
import CartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  const { t } = useTranslation();

  return (
    <div className="cart cart--empty">
      <h2>{t('cartEmptyTitle')}</h2>
      <p>
        {t('cartEmptyDescription')}
        <br />
        {t('cartEmptyHint')}
      </p>
      <img src={CartEmptyImg} alt="Empty cart" />
      <Link to="/" className="button button--orange">
        <span>{t('backToHome')}</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
