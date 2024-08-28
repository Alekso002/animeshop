import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimeBlock } from '../AnimeBlock'; // Импортируем AnimeBlock
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FullAnime = () => {
  const { t, i18n } = useTranslation();
  const [anime, setAnime] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const API = 'https://e89850b9c98b02ad.mokky.dev';

  React.useEffect(() => {
    async function fetchAnime() {
      try {
        const { data } = await axios.get(`${API}/Items/${id}`);
        setAnime(data);
      } catch (error) {
        alert(t('noProducts')); // Используем перевод
        navigate('/');
      }
    }
    fetchAnime();
  }, [id, navigate, t]);

  if (!anime) {
    return t('pleaseWait'); // Используем перевод
  }

  // Используем ключ для перевода описания
  const translatedDescription = t(`descriptions.${anime.id}.${i18n.language}`, {
    defaultValue: anime.description, // Используем описание по умолчанию, если перевод не найден
  });

  return (
    <div className="full">
      <div className="content">
        <div className="content__image">
          <img src={anime.imageUrl} alt={anime.title} />
        </div>
        <div className="content__details">
          <div className="content__description">{translatedDescription}</div>
          <AnimeBlock
            id={anime.id}
            title={anime.title}
            prices={[anime.price1, anime.price2, anime.price3]}
            image={anime.imageUrl}
            sizes={anime.sizes}
            types={anime.types}
            category={anime.category}
          />
          <Link to="/" className="button button--orange">
            <span>{t('goBack')}</span> {/* Используем перевод */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullAnime;
