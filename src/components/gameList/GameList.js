import useRawgService from '../services/RawgService';
import './gameList.scss';
import { useEffect, useState, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const GameList = ({ updateCurrentId }) => {
    const [games, setGames] = useState([]);
    const [newGameLoading, setNewGameLoading] = useState(false); // loading для завантаж додаткових персонажів, вик щоб вимкнути кнопку
    const [nextUrl, setNextUrl] = useState(null); // лінк на наступні 9 персонажі, який є у базі api
    const [gamesEnded, setGamesEnded] = useState(false);

    const { loading, error, getAllGames } = useRawgService();

    useEffect(() => {
        onRequest(true); // перший раз завантажуємо без аргументу, підставляється знач по дефолту - перші 9 ігор
        // початкове завантаж true - показуємо спінер і не деактивуємо кнопку
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', showScroll);

        return () => {
            window.removeEventListener('scroll', showScroll);
        }
    }, [games]);

    const showScroll = () => {
        if ((window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) && !newGameLoading) {
            onRequest(false, nextUrl); // початкове завантаж false - не показуємо спінер і деактивуємо кнопку
        }
    }

    const onRequest = (initialLoading, nextUrl) => { // другий раз і надалі завантаж з Url зі стейту
        initialLoading ? setNewGameLoading(false) : setNewGameLoading(true); // load new games, в цей час робимо кнопку неактивною
        getAllGames(nextUrl)
            .then(data => {
                onNewGamesLoaded(data.arr, data.nextPageUrl);
            });
    }

    const onNewGamesLoaded = (newGamesList, nextPageUrl) => {
        setGames(games => [...games, ...newGamesList]); // старі ігри + нові

        nextPageUrl ? setNextUrl(nextPageUrl) : setGamesEnded(true); // якщо url неправда, персонажі що закінчилися ставимо в true і вик це значення щоб сховати кнопку

        setNewGameLoading(false);
    }

    let refsArr = useRef([]); //створюємо масив для рефів

    const onActiveClass = (e) => {
        refsArr.current.forEach(item => {
            item.classList.remove('games__item--active');
        });
        e.currentTarget.classList.add('games__item--active');
        e.currentTarget.focus();
    }

    const createList = (arr) => {
        const items = arr.map((item, index) => {
            const { name, img, id } = item;

            return (
                <li className="games__item"
                    tabIndex="0"
                    key={id}
                    ref={el => refsArr.current[index] = el} //кожен el це сам елемент з рефом, запис його в масив рефів (обов'язково current)
                    onClick={(e) => {
                        updateCurrentId(id);
                        onActiveClass(e);
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            updateCurrentId(id);
                            onActiveClass(e);
                        }
                    }}
                >
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

    const spinner = loading && !newGameLoading ? <Spinner /> : null; // є завантаж, але це не завантаж нових персонажів
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || list;
    return (
        <div className="games__content">
            {content}
            <button className="button games__content-btn" type="button" onClick={() => onRequest(false, nextUrl)} disabled={newGameLoading} style={{ 'display': gamesEnded ? 'none' : 'block' }}>LOAD MORE</button>
        </div>
    )
}

export default GameList;