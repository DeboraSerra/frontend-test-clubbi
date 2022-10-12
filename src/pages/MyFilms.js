import { useSelector } from 'react-redux';
import Card from '../components/Cards/Card';
import Header from '../components/Header/Header';
import style from './MyFilms.module.scss';

function MyFilms() {
  const {
    films: { favorites },
  } = useSelector((state) => state);

  return (
    <div>
      <Header />
      <div className={ style.favorites }>
        <h1 className={ style.favorites__title }>Minha lista</h1>
        <div className={ style.favorites__cards_container }>
          {favorites.map((movie) => (
            <Card
              key={movie.id}
              img={movie.movie_banner}
              title={movie.title}
              score={movie.rt_score}
              id={movie.id}
              isSmall={ false }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyFilms;
