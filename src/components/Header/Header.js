import './Header.css';
import logo from '../Logo/fox-reel-logo.png';
import MainMenu from '../MainMenu/MainMenu';

function Header() {
    return (
        <>
        <header className="headHeader">
            <div>
                <a>
                    <img src={logo} alt="fox reel" />
                </a>
            </div>
            <div>Movie Mystique</div>
        </header>
        <MainMenu />
        </>
    );
}

export default Header;