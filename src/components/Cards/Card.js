import PropTypes from 'prop-types';
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

function Card({ img, title, score, id, isSmall = true }) {
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
    <div className={isSmall ? style.card : style.big_card }>
      <div className={style.card__content}>
        <img src={img} alt={title} width={ isSmall ? "150px" : "400px" } />
        <div className={style.card__btn_sect}>
          <div>
            <h3>{title}</h3>
            <p className={ style.score }><Star className={ style.star } />{score}</p>
          </div>
          <div>
            <Favorite
              onClick={handleFavorite}
              title="Adicionar aos favoritos"
              className={
                favorites.some(({ id: fId }) => fId === id)
                  ? 'fave_active'
                  : 'fave'
              }
            />
            <Link to={`/films/${id}`} className="more" title="Mais Informações">
              <More />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = { 
  img: PropTypes.string.isRequired, 
  title: PropTypes.string.isRequired, 
  score: PropTypes.number.isRequired, 
  id: PropTypes.string.isRequired, 
  isSmall: PropTypes.bool
}

Card.defaultProps = {
  isSmall: true,
}

export default Card;
