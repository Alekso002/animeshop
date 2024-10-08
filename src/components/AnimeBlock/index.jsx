import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';
import { useTranslation } from 'react-i18next';

export function AnimeBlock({ id, title, prices, image, sizes, types, category }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Create an array with translations for each type
  const typeNames = [
    t('figure'), // figurka
    t('x'),
    t('S'),
    t('L'),
    t('XL'),
    t('soft'), // miękka
    t('hard'), // twarda
    t('4gb'),
    t('8gb'),
    t('16gb'),
    t('4070'),
    t('4080'),
    t('4090'),
    t('cherry'),
    t('sa'),
    t('oem'),
    t('mechanical'),
    t('membrane'),
    t('12'),
    t('12 pro'),
    t('12 pro max'),
  ];

  const [activeType, setActiveType] = React.useState(types[0] || 0);
  const [activeSize, setActiveSize] = React.useState(0);

  const currentPrice = category === 1 ? prices[activeSize] : prices[types.indexOf(activeType)];

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (obj) =>
        obj.id === id && obj.type === typeNames[activeType] && obj.size === sizes[activeSize],
    ),
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price: currentPrice,
      image,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="anime-block-wrapper">
      <div className="anime-block">
        <Link to={`/anime/${id}`}>
          <img className="anime-block__image" src={image} alt={t('itemImageAlt')} />
          <h4 className="anime-block__title">{title}</h4>
        </Link>
        <div className="anime-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          {sizes.length > 0 && (
            <ul>
              {sizes.map((size, i) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? 'active' : ''}>
                  {size} {t('cm')}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="anime-block__bottom">
          <div className="anime-block__price">
            {currentPrice} {t('currency')}
          </div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>{t('add')}</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimeBlock;
