import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmId from '../pages/FilmId';
import Films from '../pages/FilmId';
import Home from '../pages/Home';
import MyFilms from '../pages/MyFilms';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/films" element={ <Films /> } />
        <Route path="/films/:id" element={ <FilmId /> } />
        <Route path="/favorites" element={ <MyFilms /> } />
        <Route path="*" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
