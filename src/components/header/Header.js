import { Link, NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">
                <h1><span>Games</span> information portal</h1>
            </Link>
            <hr />
            <nav className="header__nav">
                <NavLink end
                    to="/"
                    className={({ isActive }) => 'header__nav-link' + (isActive ? ' header__nav-link--active' : '')}>Games</NavLink>
                {' / '}
                <NavLink
                    to="/genres"
                    className={({ isActive }) => 'header__nav-link' + (isActive ? ' header__nav-link--active' : '')}>Genres</NavLink>
            </nav>
        </header>
    )
}

export default Header;