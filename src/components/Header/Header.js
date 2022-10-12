import style from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header className={ style.header }>
      <Link to='/' className={ style.header__logo }>
        <img src="/images/logo.svg" alt="" className={ style.header__logoImg} width={200} />
      </Link>
      <nav className={ style.header__nav}>
        <NavLink className={ ({ isActive }) => isActive ? style.header__nav_link_active : style.header__nav_link} to="/favorites">Minha lista</NavLink>
        <NavLink className={ ({ isActive }) => isActive ? style.header__nav_link_active : style.header__nav_link} to="/search">Pesquisar</NavLink>
      </nav>
    </header>
  )
}

export default Header;
