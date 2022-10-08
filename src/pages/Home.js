import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../components/Cards/Card';
import Row from '../components/common/Row';
import { addToFavorites, removeFromFavorites, setFilms } from '../redux/slices/films.slice';
import { getAllFilms } from '../utils/api';
import { CgMoreAlt as More } from 'react-icons/cg';
import { MdFavorite as Favorite } from 'react-icons/md';
import style from './Home.module.scss';
import Loading from '../components/common/Loading';
import Header from '../components/Header/Header';

function Home() {
  const [state, setState] = useState({
    movies: [],
    vintage: [],
    betterRate: [],
    loading: true,
  });
  const { movies, vintage, betterRate, loading } = state;
  const dispatch = useDispatch();

  const {
    films: { favorites, films },
  } = useSelector((state) => state);

  const handleFavorite = (id) => {
    const film = films.find(({ id: fId }) => fId === id);
    console.log(film)
    if (favorites.some(({ id: fId }) => fId === id)) {
      dispatch(removeFromFavorites(film));
      return;
    }
    dispatch(addToFavorites(film));
  };

  const getMovies = async () => {
    const films = await getAllFilms();
    setState((prevSt) => ({
      ...prevSt,
      movies: films,
      vintage: films.filter(({ release_date: date }) => +date < 2000),
      betterRate: films.filter(({ rt_score: score }) => +score >= 90),
      loading: false,
    }));
    dispatch(setFilms(films));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const random = Math.floor(Math.random() * (movies.length - 1)) + 1;

  if (loading) {
    return <Loading />
  }

  const movie = movies[random];

  return (
    <div>
      <Header />
      <div className={ style.banner }>
        <div className={ style.banner__left }>
          <h1>{movie.title}</h1>
          <p>{movie.director}</p>
          <p>{movie.description}</p>
          <p>{movie.duration}</p>
          <div>
            <Favorite
              aria-label="Adicionar aos favoritos"
              onClick={() => handleFavorite(movie.id)}
              title="Adicionar aos favoritos"
              className={
                favorites.some(({ id: fId }) => fId === movie.id)
                  ? style.fave_active
                  : style.fave
              }
            />
            <Link to={`/films/${movie.id}`} className={ style.more } title="Mais Informações">
              <More />
            </Link>
          </div>
        </div>
        <img className={ style.banner__right } src={movie.movie_banner} alt={ movie.title } />
      </div>
      {favorites.length > 0 && (
        <>
          <h2>Meus favoritos</h2>
          <Row>
            {favorites.map((movie) => (
              <Card
                key={movie.id}
                img={movie.image}
                title={movie.title}
                score={movie.rt_score}
                id={movie.id}
              />
            ))}
          </Row>
        </>
      )}
      <h2>Melhores classificados</h2>
      <Row>
        {betterRate.map((movie) => (
          <Card
            key={movie.id}
            img={movie.image}
            title={movie.title}
            score={movie.rt_score}
            id={movie.id}
          />
        ))}
      </Row>
      <h2>Filmes vintage</h2>
      <Row>
        {vintage.map((movie) => (
          <Card
            key={movie.id}
            img={movie.image}
            title={movie.title}
            score={movie.rt_score}
            id={movie.id}
          />
        ))}
      </Row>
    </div>
  );
}

export default Home;
