import './Header.css';
import logo from '../Logo/fox-reel-logo.png';

function Header() {
    return (
        <header className="header">
            <div>
                <a href="/">
                    <img src={logo} alt="fox reel" />
                </a>
            </div>
            <div>Movie Mystique</div>
        </header>
    );
}

export default Header;