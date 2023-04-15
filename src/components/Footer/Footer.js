import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className='footFlex'>
                <div className='leftReel'></div>
                <div className='leftFoxReel'></div>
                <div>
                    <a className='footLink' href="https://github.com/marikamulder/movie-review">Coded</a> by Marika Mulder
                </div>
                <div className='rightFoxReel'></div>
                <div className='rightReel'></div>
            </div>
        </footer>
    );
}

export default Footer;