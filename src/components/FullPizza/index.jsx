import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import styles from './FullPizza.module.scss';
//import styles from '../NotFoundBlock/NotFoundBlock.module.scss';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const API = 'https://e89850b9c98b02ad.mokky.dev';

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`${API}/Items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Nie ma pitsy!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Please wait...';
  }

  return (
    //<div className={styles.root}>
    <div className="content__title">
      <div className="content__image">
        <img src={pizza.imageUrl} />
      </div>
      <div className="content__text">
        <h2>{pizza.title}</h2>
      </div>
      <h2>{pizza.description}</h2>
      <h4>{pizza.price} $</h4>
      <Link to="/" class="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
    //</div>
  );
};

export default FullPizza;
