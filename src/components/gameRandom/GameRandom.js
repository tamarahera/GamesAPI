import './gameRandom.scss';

const GameRandom = () => {
    return (
        <section className="random">
            <div className="container">
                <div className="random__wrapper">
                    <div className="random__game">
                        <div className="random__game-box">
                            <img src="https://assets-prd.ignimgs.com/2021/08/19/elder-scrolls-skyrim-button-2017-1629409446732.jpg"
                                alt="skyrim" className="random__game-img" />
                        </div>
                        <h3 className="title">The Elder Scrolls V: Skyrim Special Edition</h3>
                        <p className="text">Developed by Bethesda Game Studios, the 2011 Studio of the Year, that brought you Oblivion
                            and Fallout 3.</p>
                        <div className="random__game-btns">
                            <a href="#" className="button">HOMEPAGE</a>
                            <a href="#" className="button button--grey">NEWS</a>
                        </div>
                    </div>

                    <div className="random__try">
                        <p className="random__try-text">
                            Random game for today!<br />
                            Do you want to know more about it?
                        </p>
                        <p className="random__try-text">Or choose another one</p>
                        <button className="button" type="button">Try it</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GameRandom;