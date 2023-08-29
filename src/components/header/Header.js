import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <a href="#" className="logo">
                <h1><span>Games</span> information portal</h1>
            </a>
            <hr />
            <nav className="header__nav">
                <a href="#" className="header__nav-link header__nav-link--active">Games</a>
                {' / '} 
                <a href="#" className="header__nav-link">More about</a>
            </nav>
        </header>
    )
}

export default Header;