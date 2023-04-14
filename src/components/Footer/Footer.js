import './Footer.css';
import logo from '../Logo/fox-reel-logo.png';

function Footer() {
    return (
        <footer className="footer">
            <div className='footFlex'>
                <div className='leftFoxReel'>
                    <img src={logo} alt="fox reel" />
                </div>
                <div>
                    <a className='footLink' href="https://github.com/marikamulder/movie-review">Coded</a> by Marika Mulder
                </div>
                <div className='rightFoxReel'>
                    <img src={logo} alt="fox reel" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;