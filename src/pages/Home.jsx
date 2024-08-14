import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../redux/slices/pizzaSlice';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const items = useSelector((state) => state.pizza.items);
  const { searchValue } = React.useContext(SearchContext);

  const [isLoading, setIsLoading] = React.useState(true);
  const [totalPages, setTotalPages] = React.useState(0); // Состояние для количества страниц

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    // Сбрасываем currentPage на 1 при смене категории
    dispatch(setCurrentPage(1));
  }, [categoryId, dispatch]);

  React.useEffect(() => {
    setIsLoading(true);

    const price = sortType.includes('-') ? 'price' : '-price';
    const title = sortType.includes('-') ? '-title' : 'title';
    const API_BASE_URL = 'https://e89850b9c98b02ad.mokky.dev';

    axios
      .get(
        `${API_BASE_URL}/Items?page=${currentPage}&limit=4&${
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
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({ sortType, categoryId, currentPage });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage]);

  const pizzas = Array.isArray(items)
    ? items
        .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((obj) => <PizzaBlock key={obj.id} {...obj} image={obj.imageUrl} />)
    : [];

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

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
        <Sort />
      </div>
      <h2 className="content__title">{title}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        pageCount={totalPages}
      />{' '}
      {/* Передаем количество страниц */}
    </div>
  );
};

export default Home;
