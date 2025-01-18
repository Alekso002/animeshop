import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sekcja kontaktowa */}
        <div className="footer-section">
          <h4>Kontakt</h4>
          <p>Email: kontakt@animeshop.pl</p>
          <p>Telefon: +48 123 456 789</p>
          <p>Adres: Ul. Przykładowa 123, 00-000 Warszawa</p>
        </div>

        {/* Sekcja linków */}
        <div className="footer-section">
          <h4>Linki</h4>
          <ul>
            <li>
              <a href="/about">O nas</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/polityka-prywatnosci">Polityka prywatności</a>
            </li>
            <li>
              <a href="/kontakt">Kontakt</a>
            </li>
          </ul>
        </div>

        {/* Sekcja płatności i social media */}
        <div className="footer-section">
          <h4>Akceptowane płatności</h4>
          <p>Visa, Mastercard, PayPal</p>
          <h4>Znajdź nas</h4>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-bottom-text">© 2025 AnimeShop. Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
};

export default Footer;
