import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdFavorite as Favorite } from 'react-icons/md';
import { AiFillStar as Star } from 'react-icons/ai';
import style from './BigCard.module.scss';
import { fetchApi, API_URL } from '../../utils/api';
import Loading from '../common/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/films.slice';
import Row from '../common/Row';
import TextCard from './TextCard';

function BigCard() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { movie_banner: img, title, rt_score: score, running_time: duration, director,
    description, producer, release_date: released, original_title: originalTitle,
    original_title_romanised: originalRomanised, locations, people, species, vehicles } = movie;

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
    const fetchMovie = await fetchApi(`${API_URL}/films/${id}`);
    setMovie(fetchMovie);
    const [fetchLocations] = fetchMovie.locations && await Promise
      .all(fetchMovie.locations.map((url) => fetchApi(url)));
    const [fetchPeople] = fetchMovie.people && await Promise
      .all(fetchMovie.people.map((url) => fetchApi(url)));
    const [fetchSpecies] = fetchMovie.species && await Promise
      .all(fetchMovie.species.map((url) => fetchApi(url)));
    const [fetchVehicles] = fetchMovie.vehicles && await Promise
      .all(fetchMovie.vehicles.map((url) => fetchApi(url)));
    setMovie((prevSt) => ({
      ...prevSt,
      locations: fetchLocations.length ? fetchLocations : [fetchLocations],
      people: fetchPeople.length ? fetchPeople : [fetchPeople],
      species: fetchSpecies.length ? fetchSpecies : [fetchSpecies],
      vehicles: fetchVehicles.length ? fetchVehicles : [fetchVehicles],
    }))
    setLoading(false);
  }

  if (loading) {
    return <Loading />
  }

  const getSpecieName = (specieUrl) => {
    const array = specieUrl.split('/');
    const specieId = array[array.length - 1];
    const specie = species.find((s) => s.id === specieId)
    return specie;
  }

  // console.log({ people, vehicles, locations, species })
  return (
    <div className={ style.card }>
      <div className={ style.content }>
        <div className={ style.banner }>
          <div className={ style.banner__left }>
            <h3 className={ style.banner__left_title }>{ title }</h3>
            <p className={ style.banner__left_score }><Star className={ style.star } />{ score }</p>
            <p>{`Ano de lancamento: ${released}`}</p>
            <p>{`Duracao: ${duration} min`}</p>
            <p>{`Dirigido por: ${director}`}</p>
            <button className={ style.banner__left_btn } title="Adicionar aos favoritos" onClick={handleFavorite}>
              <Favorite className={ isFavorite ? style.fave_active : style.fave } />
            </button>
          </div>
          <img
            className={ style.banner__right }
            src={ img }
            alt={ title }
            width="70%"
          />
        </div>
      </div>
      <div className={ style.card__info }>
        <p>{`Titulo original: ${originalTitle} (${originalRomanised})`}</p>
        <p>{description}</p>
        <p>{`Produzido por: ${producer}`}</p>
      </div>
      {people && (
        <div className={ style.card__row }>
          <h2>Personagens</h2>
          <Row>
            {people?.map(({ id, name, gender, hair_color: hair, eye_color: eye, species: specieUrl }) => (
              <TextCard key={ id }>
                <h3>{name}</h3>
                <p>{`Genero: ${gender}`}</p>
                <p>{`Especie: ${getSpecieName(specieUrl)?.name}`}</p>
                <p>{`Cor do cabelo: ${hair}`}</p>
                <p>{`Cor dos olhos: ${eye}`}</p>
              </TextCard>
            ))}
          </Row>
        </div>
      )}
      {locations && (
        <div className={ style.card__row }>
          <h2>Localizacoes</h2>
          <Row>
            {locations?.map(({ id, name, climate, terrain, surface_water: surfaceWater }) => (
              <TextCard key={id}>
                <h3>{name}</h3>
                <p>{`Clima: ${climate}`}</p>
                <p>{`Terreno: ${terrain}`}</p>
                <p>{`Nivel do mar: ${surfaceWater}`}</p>
              </TextCard>
            ))}
          </Row>
        </div>
      )}
      {vehicles && (
        <div className={ style.card__row }>
          <h2>Veiculos</h2>
          <Row>
            {vehicles?.map(({ id, name, description, vehicle_class: vClass, length }) => (
              <TextCard key={id}>
                <h3>{name}</h3>
                <p>{`Tipo: ${vClass}`}</p>
                <p>{`Descicao: ${description}`}</p>
                <p>{`Comprimento: ${length}`}</p>
              </TextCard>
            ))}
          </Row>
        </div>
      )}
    </div>
  )
}

export default BigCard;
