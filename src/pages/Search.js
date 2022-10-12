import { useEffect, useState } from 'react';
import TextCard from '../components/Cards/TextCard';
import Loading from '../components/common/Loading';
import Header from '../components/Header/Header';
import { API_URL, fetchApi } from '../utils/api';
import style from './Search.module.scss';

function Search() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const handleClick = async (type) => {
    setLoading(true);
    setSearch(type);
    const response = await fetchApi(`${API_URL}/${type}`);
    console.log(response)
    setResult(response);
  }

  useEffect(() => {
    setLoading(false);
  }, [result])

  const renderPeople = () => {
    return result.map(({ id, name, gender, hair_color: hair, eye_color: eye }) => (
      <TextCard key={ id }>
        <h3>{name}</h3>
        <p>{`Genero: ${gender}`}</p>
        <p>{`Cor do cabelo: ${hair}`}</p>
        <p>{`Cor dos olhos: ${eye}`}</p>
      </TextCard>
    ))
  }

  const renderSpecies = () => {
    return result.map(({ id, name, classification, hair_colors: hair, eye_colors: eye }) => (
      <TextCard key={ id }>
        <h3>{name}</h3>
        <p>{`Classificação: ${classification}`}</p>
        <p>{`Cor do cabelo: ${hair}`}</p>
        <p>{`Cor dos olhos: ${eye}`}</p>
      </TextCard>
    ))
  }

  const renderVehicles = () => {
    return result.map(({ id, name, description, vehicle_class: vClass, length }) => (
      <TextCard key={id}>
        <h3>{name}</h3>
        <p>{`Tipo: ${vClass}`}</p>
        <p>{`Descrição: ${description}`}</p>
        <p>{`Comprimento: ${length}`}</p>
      </TextCard>
    ))
  }

  const renderLocations = () => {
    return result.map(({ id, name, climate, terrain, surface_water: surfaceWater }) => (
      <TextCard key={id}>
        <h3>{name}</h3>
        <p>{`Clima: ${climate}`}</p>
        <p>{`Terreno: ${terrain}`}</p>
        <p>{`Nível do mar: ${surfaceWater}`}</p>
      </TextCard>
    ))
  }

  return (
    <div>
      <Header />
      <div className={ style.search_container }>
        <h2 className={ style.search_title }>Pesquisar</h2>
        <div className={ style.btn_container }>
          <button type="button" onClick={ () => handleClick('people')}>Pessoas</button>
          <button type="button" onClick={ () => handleClick('locations')}>Locais</button>
          <button type="button" onClick={ () => handleClick('species')}>Especies</button>
          <button type="button" onClick={ () => handleClick('vehicles')}>Veiculos</button>
        </div>
      </div>
      <div className={ style.cards_container }>
        {loading && <Loading />}
        {result.length > 0 && search === 'people' && renderPeople()}
        {result.length > 0 && search === 'locations' && renderLocations()}
        {result.length > 0 && search === 'species' && renderSpecies()}
        {result.length > 0 && search === 'vehicles' && renderVehicles()}
      </div>
    </div>
  )
}

export default Search;
