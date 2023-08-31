import './gameList.scss';

const GameList = () => {
    return (
        <div className="games__content">
            <ul className="games__list">
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box">
                        <img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg" alt="skyrim"
                            className="games__item-img" />
                    </div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>

                <li className="games__item games__item--active" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img"/></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg" alt="skyrim" className="games__item-img"/></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
                <li className="games__item" tabIndex="0">
                    <div className="games__item-box"><img src="https://images.cgames.de/images/gsgp/290/skyrim_6134378.jpg"
                        alt="skyrim" className="games__item-img" /></div>
                    <h2 className="games__item-title">The Elder Scrolls V: Skyrim Special Edition</h2>
                </li>
            </ul>

            <button className="button games__content-btn" type="button">LOAD MORE</button>
        </div>
    )
}

export default GameList;