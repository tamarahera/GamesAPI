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
                <NavLink exact to="/" className="header__nav-link" activeClassName="header__nav-link--active">Games</NavLink>
                {' / '}
                <NavLink exact to="/genres" className="header__nav-link" activeClassName="header__nav-link--active">More about</NavLink>
            </nav>
        </header>
    )
}

export default Header;