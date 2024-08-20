import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="anime-block"
    speed={2}
    width={260}
    height={400}
    viewBox="0 0 260 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    {/* Картинка товара */}
    <rect x="0" y="0" rx="10" ry="10" width="260" height="260" />
    {/* Название товара */}
    <rect x="10" y="275" rx="10" ry="10" width="240" height="20" />
    {/* Кнопки выбора моделей */}
    <rect x="10" y="310" rx="10" ry="10" width="70" height="30" />
    <rect x="95" y="310" rx="10" ry="10" width="70" height="30" />
    <rect x="180" y="310" rx="10" ry="10" width="70" height="30" />
    {/* Цена */}
    <rect x="10" y="360" rx="10" ry="10" width="90" height="30" />
    {/* Кнопка "добавить" */}
    <rect x="120" y="360" rx="20" ry="20" width="130" height="45" />
  </ContentLoader>
);

export default Skeleton;
