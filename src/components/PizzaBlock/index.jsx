import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../redux/slices/cartSlice';

const typeNames = [
  'figurka',
  'x',
  'S',
  'L',
  'XL',
  'miękka',
  'twarda',
  '4gb',
  '8gb',
  '16gb',
  '4070',
  '4080',
  '4090',
  'cherry',
  'sa',
  'oem',
  'mechanical',
  'membrane',
  '12',
  '12 pro',
  '12 pro max',
];

function PizzaBlock({ id, title, prices, image, sizes, types, category }) {
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState(types[0] || 0);
  const [activeSize, setActiveSize] = React.useState(0);

  // Определяем текущую цену в зависимости от категории
  const currentPrice = category === 1 ? prices[activeSize] : prices[types.indexOf(activeType)];

  // Приведение активного типа к строке для корректного сравнения
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
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={image} alt="Photo" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
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
                  {size} cm
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{currentPrice} zł</div>
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
            <span>Dodać</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
