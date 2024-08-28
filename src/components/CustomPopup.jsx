import React from 'react';
import { useTranslation } from 'react-i18next';

const CustomPopup = ({ message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div className="custom-popup">
      <div className="custom-popup__content">
        <p>{message}</p>
        <div className="custom-popup__buttons">
          <button className="custom-popup__btn confirm-btn" onClick={onConfirm}>
            {t('yes')}
          </button>
          <button className="custom-popup__btn cancel-btn" onClick={onCancel}>
            {t('no')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
