import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../redux/slices/animeSlice';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

import AnimeBlock from '../components/AnimeBlock';
import Skeleton from '../components/AnimeBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const items = useSelector((state) => state.anime.items);
  const { searchValue } = useContext(SearchContext);

  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(4);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    // Сбрасываем currentPage на 1 при смене категории
    dispatch(setCurrentPage(1));
  }, [categoryId, dispatch]);

  useEffect(() => {
    // Сбрасываем currentPage на 1 при смене sort
    dispatch(setCurrentPage(1));
  }, [sortType, dispatch]);

  useEffect(() => {
    setIsLoading(true);

    const price = sortType.includes('-') ? 'price1' : '-price1';
    const title = sortType.includes('-') ? '-title' : 'title';
    const API_BASE_URL = 'https://e89850b9c98b02ad.mokky.dev';

    const fetchItems = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/Items`, {
          params: {
            page: currentPage,
            limit: limit,
            category: categoryId > 0 ? categoryId : undefined,
            sortBy: sortType.includes('title') ? title : price,
            title: searchValue ? `*${searchValue}*` : undefined, // Фильтрация по названию с использованием `*`
          },
        });

        if (Array.isArray(data.items)) {
          dispatch(setItems(data.items));
          const totalPages = data.meta.total_pages; // Используем total_pages из метаданных
          setTotalPages(totalPages);
        } else {
          console.error('Unexpected response structure:', data);
          dispatch(setItems([]));
        }
      } catch (err) {
        alert('Error fetching items');
        dispatch(setItems([]));
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, limit, dispatch]);

  useEffect(() => {
    const queryString = qs.stringify({ sortType, categoryId, currentPage, limit });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage, limit, navigate]);

  useEffect(() => {
    // Этот useEffect будет перерендеривать компонент при смене языка
  }, [i18n.language]);

  const skeletons = [...new Array(limit)].map((_, index) => <Skeleton key={index} />);

  const products = items.map((obj) => (
    <AnimeBlock
      key={obj.id}
      {...obj}
      image={obj.imageUrl}
      prices={[obj.price1, obj.price2, obj.price3]}
    />
  ));

  const titles = {
    0: t('all'),
    1: t('figures'),
    2: t('posters'),
    3: t('manga'),
    4: t('pc'),
    5: t('others'),
  };

  const title = titles[categoryId];

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <div className="limit-buttons">
          <button onClick={() => handleLimitChange(4)} className={limit === 4 ? 'active' : ''}>
            {t('products4')}
          </button>
          <button onClick={() => handleLimitChange(8)} className={limit === 8 ? 'active' : ''}>
            {t('products8')}
          </button>
        </div>
        <Sort />
      </div>
      <h2 className="content__title">{title}</h2>
      <div className="content__items">{isLoading ? skeletons : products}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} pageCount={totalPages} />
    </div>
  );
};

export default Home;
