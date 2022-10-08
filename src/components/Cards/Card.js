import { Link } from 'react-router-dom';
import { MdFavorite as Favorite } from 'react-icons/md';
import { CgMoreVertical as More } from 'react-icons/cg';
import { AiFillStar as Star } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import style from './Card.module.scss';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/slices/films.slice';

function Card({ img, title, score, id }) {
  const {
    films: { favorites, films },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleFavorite = () => {
    const film = films.find(({ id: fId }) => fId === id);
    if (favorites.some(({ id: fId }) => fId === id)) {
      dispatch(removeFromFavorites(film));
      return;
    }
    dispatch(addToFavorites(film));
  };

  return (
    <div className={style.card}>
      <div className={style.card__content}>
        <img src={img} alt={title} width="150px" />
        <div className={style.card__btn_sect}>
          <div>
            <h3>{title}</h3>
            <p><Star className={ style.star } />{score}</p>
          </div>
          <div>
            <Favorite
              aria-label="Adicionar aos favoritos"
              onClick={handleFavorite}
              title="Adicionar aos favoritos"
              className={
                favorites.some(({ id: fId }) => fId === id)
                  ? style.fave_active
                  : style.fave
              }
            />
            <Link to={`/films/${id}`} className={ style.more } title="Mais Informações">
              <More />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
