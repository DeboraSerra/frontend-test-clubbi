import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdFavorite as Favorite } from 'react-icons/md';
import { AiFillStar as Star } from 'react-icons/ai';
import style from './BigCard.module.scss';
import { getOneFilm, getOneLocation } from '../../utils/api';
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/films.slice';

function BigCard() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { movie_banner: img, title, rt_score: score, running_time: duration, director,
    description, producer, release_date: released, original_title: originalTitle,
    original_title_romanised: originalRomanised, locations, people, species } = movie;

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

  const { id } = useParams();

  const isFavorite = favorites.some(({ id: fId }) => fId === id);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    const fetchMovie = await getOneFilm(id);
    setMovie(fetchMovie);
    const locationsId = fetchMovie.locations.map((url) => {
      const id = url.split('/')
      return id[id.length - 1]
    }).filter((id) => !!id);
    const peopleId = fetchMovie.people.map((url) => {
      const id = url.split('/')
      return id[id.length - 1]
    }).filter((id) => !!id);
    const speciesId = fetchMovie.species.map((url) => {
      const id = url.split('/')
      return id[id.length - 1]
    }).filter((id) => !!id);
    const fetchLocations = locationsId.length > 0 && await Promise.all(locationsId.map((id) => getOneLocation(id)));
    console.log({fetchLocations})
    const fetchPeople = peopleId.length > 0 && await Promise.all(peopleId.map((id) => getOneLocation(id)));
    console.log({ fetchPeople})
    const fetchSpecies = speciesId.length > 0 && await Promise.all(speciesId.map((id) => getOneLocation(id)));
    console.log({ fetchSpecies})
    setMovie((prevSt) => ({
      ...prevSt,
      locations: fetchLocations,
      people: fetchPeople,
      species: fetchSpecies,
    }))
    setLoading(false);
  }

  if (loading) {
    return <Loading />
  }
  return (
    <div className={ style.card }>
      <div className={ style.content }>
        <div>
          <h3>{ title }</h3>
          <p><Star className={ style.star } />{ score }</p>
          <p>{`Ano de lancamento: ${released}`}</p>
          <p>{`Duracao: ${duration} min`}</p>
          <p>{`Dirigido por: ${director}`}</p>
          <button aria-label="Adicionar aos favoritos" onClick={handleFavorite}>
            <Favorite color={ isFavorite ? style.fave_active : style.fave } />
          </button>
        </div>
        <img
          src={ img }
          alt={ title }
          width="70%"
        />
      </div>
      <div>
        <p>{`Titulo original: ${originalTitle} (${originalRomanised})`}</p>
        <p>{description}</p>
        <p>{`Produzido por: ${producer}`}</p>
      </div>
    </div>
  )
}

export default BigCard;
