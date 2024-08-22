// components/CustomPopup.js
import React from 'react';

const CustomPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="custom-popup">
      <div className="custom-popup__content">
        <p>{message}</p>
        <div className="custom-popup__buttons">
          <button className="custom-popup__btn confirm-btn" onClick={onConfirm}>
            Tak
          </button>
          <button className="custom-popup__btn cancel-btn" onClick={onCancel}>
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
