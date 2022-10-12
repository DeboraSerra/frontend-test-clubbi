import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmId from '../pages/FilmId';
import Films from '../pages/FilmId';
import Home from '../pages/Home';
import MyFilms from '../pages/MyFilms';
import Search from '../pages/Search';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/films" element={ <Films /> } />
        <Route path="/films/:id" element={ <FilmId /> } />
        <Route path="/favorites" element={ <MyFilms /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="*" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;
