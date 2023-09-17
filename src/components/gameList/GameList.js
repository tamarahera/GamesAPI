import RawgService from '../services/RawgService';
import './gameList.scss';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const GameList = ({ updateCurrentId }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newGameLoading, setNewGameLoading] = useState(false); // loading для завантаж додаткових персонажів, вик щоб вимкнути кнопку
    const [error, setError] = useState(false);
    const [nextUrl, setNextUrl] = useState(null); // лінк на наступні 9 персонажі, який є у базі api
    const [gamesEnded, setGamesEnded] = useState(false);

    useEffect(() => {
        onRequest(); // перший раз завантажуємо без аргументу, підставляється знач по дефолту - перші 9 ігор
    }, [])

    const onRequest = (nextUrl) => { // другий раз і надалі завантаж з Url зі стейту
        setNewGameLoading(true); // load new games, в цей час робимо кнопку неактивною

        const gamesData = new RawgService();

        gamesData.getAllGames(nextUrl)
            .then(data => {
                onNewGamesLoaded(data.arr, data.nextPageUrl);
            })
            .catch(err => {
                console.log(err);
                onError();
            })
    }

    const onNewGamesLoaded = (newGamesList, nextPageUrl) => {
        setGames(games => [...games, ...newGamesList]); // старі ігри + нові

        nextPageUrl ? setNextUrl(nextPageUrl) : setGamesEnded(true); // якщо url неправда, персонажі що закінчилися ставимо в true і вик це значення щоб сховати кнопку

        setLoading(false);
        setNewGameLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const createList = (arr) => {
        const items = arr.map(item => {
            const { name, img, id } = item;

            return (
                <li className="games__item" tabIndex="0" key={id} onClick={() => updateCurrentId(id)}>
                    <div className="games__item-box">
                        <img src={img} alt={name} className="games__item-img" />
                    </div>
                    <h2 className="games__item-title">{name}</h2>
                </li>
            )
        });
        return (
            <ul className="games__list">
                {items}
            </ul>
        )
    }

    const list = createList(games);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || list;

    return (
        <div className="games__content">
            {content}
            <button className="button games__content-btn" type="button" onClick={() => onRequest(nextUrl)} disabled={newGameLoading} style={{'display': gamesEnded ? 'none' : 'block'}}>LOAD MORE</button>
        </div>
    )
}

export default GameList;