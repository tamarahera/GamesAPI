import './gameInfo.scss';

const GameInfo = () => {
    return (
        <div className="games__info">
            <div className="games__info-header">
                <div className="games__info-box">
                    <img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg" alt="skyrim"
                        className="games__info-img" />
                </div>
                <h3 className="title">The Elder Scrolls V: Skyrim Special Edition</h3>
                <div className="games__info-btns">
                    <a href="#" className="button">HOMEPAGE</a>
                    <a href="#" className="button button--grey">NEWS</a>
                </div>
            </div>
            <dl className="games__info-list text">
                <dt>Released:</dt>
                <dd>2011</dd>
                <dt>Rating:</dt>
                <dd>4.5/5</dd>
                <dt>Genres:</dt>
                <dd>Actions, RPG</dd>
                <dt>Developer:</dt>
                <dd>Bethesda Game Studios</dd>
            </dl>
            <p className="games__info-descr text">Developed by Bethesda Game Studios, the 2011 Studio of the Year, that
                brought
                you Oblivion and Fallout 3. Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing
                to life a complete virtual world open for you to explore any way you choose.</p>
            <ul className="games__info-platforms text">
                <li className="games__info-platform">PC</li>
                <li className="games__info-platform">PlayStation 3</li>
            </ul>
        </div>
    )
}

export default GameInfo;