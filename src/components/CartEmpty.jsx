import React from 'react';
import CartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Koszyk jest pusty 😕</h2>
        <p>
          Prawdopodobnie jeszcze nie zamówiłeś pizzy.
          <br />
          Aby zamówić pizzę, przejdź na stronę główną.
        </p>
        <img src={CartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--orange">
          <span>Wróć na stronę główną</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
