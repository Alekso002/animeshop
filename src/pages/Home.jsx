import React from 'react';
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

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const items = useSelector((state) => state.anime.items);
  const { searchValue } = React.useContext(SearchContext);

  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(0); // Состояние для количества страниц
  const [limit, setLimit] = React.useState(4); // Состояние для лимита элементов на странице

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  React.useEffect(() => {
    // Сбрасываем currentPage на 1 при смене категории
    dispatch(setCurrentPage(1));
  }, [categoryId, dispatch]);

  React.useEffect(() => {
    // Сбрасываем currentPage на 1 при смене sort
    dispatch(setCurrentPage(1));
  }, [sortType, dispatch]);

  React.useEffect(() => {
    setIsLoading(true);

    const price = sortType.includes('-') ? 'price1' : '-price1';
    const title = sortType.includes('-') ? '-title' : 'title';
    const API_BASE_URL = 'https://e89850b9c98b02ad.mokky.dev';

    axios
      .get(
        `${API_BASE_URL}/Items?page=${currentPage}&limit=${limit}&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.includes('title') ? title : price}`,
      )
      .then((res) => {
        console.log('API Response:', res.data);

        if (Array.isArray(res.data.items)) {
          dispatch(setItems(res.data.items));
          const totalPages = res.data.meta.total_pages; // Используем total_pages из метаданных
          setTotalPages(totalPages); // Устанавливаем количество страниц
        } else {
          console.error('Unexpected response structure:', res.data);
          dispatch(setItems([]));
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert('Error fetching items');
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, limit]);

  React.useEffect(() => {
    const queryString = qs.stringify({ sortType, categoryId, currentPage, limit });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage, limit]);

  const products = Array.isArray(items)
    ? items
        .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((obj) => (
          <AnimeBlock
            key={obj.id}
            {...obj}
            image={obj.imageUrl}
            prices={[obj.price1, obj.price2, obj.price3]}
          />
        ))
    : [];

  const skeletons = [...new Array(limit)].map((_, index) => <Skeleton key={index} />);

  const titles = {
    0: 'Figurki i Gadżety Anime / Manga',
    1: 'Figurki',
    2: 'Plakaty',
    3: 'Manga',
    4: 'PC',
    5: 'Inne',
  };

  const title = titles[categoryId];

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <div className="limit-buttons">
          <button onClick={() => handleLimitChange(4)} className={limit === 4 ? 'active' : ''}>
            4 produkty
          </button>
          <button onClick={() => handleLimitChange(8)} className={limit === 8 ? 'active' : ''}>
            8 produktów
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
