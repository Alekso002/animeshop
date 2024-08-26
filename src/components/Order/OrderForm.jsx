import React, { useState, useEffect } from 'react';

const OrderForm = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  // Используем useEffect, чтобы заполнить форму данными, если они были переданы в initialData
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="order-form">
      <div className="order-form__content">
        <h2>Formularz zamówienia</h2>
        <form onSubmit={handleSubmit}>
          <div className="order-form__group">
            <label htmlFor="name">Imię i Nazwisko</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__group">
            <label htmlFor="address">Adres</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__group">
            <label htmlFor="city">Miasto</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__group">
            <label htmlFor="postalCode">Kod Pocztowy</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__group">
            <label htmlFor="phone">Numer Telefonu</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-form__buttons">
            <button type="submit" className="order-form__submit">
              Potwierdź zamówienie
            </button>
            <button type="button" className="order-form__cancel" onClick={onClose}>
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
