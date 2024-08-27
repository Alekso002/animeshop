import React from 'react';
import { useTranslation } from 'react-i18next';

function Categories({ value, onChangeCategory }) {
  const { t } = useTranslation();

  const categories = [
    t('categories.all'),
    t('categories.figures'),
    t('categories.posters'),
    t('categories.manga'),
    t('categories.pc'),
    t('categories.others'),
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
