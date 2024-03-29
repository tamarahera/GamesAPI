import { scroller } from 'react-scroll';
import { motion } from "framer-motion";

import useRawgService from '../services/RawgService';
import useLocalStorage from '../../hooks/useLocalStorage';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { useEffect, useState, useRef, useMemo } from 'react';

import './gameList.scss';

const setContent = (action, Component, newGameLoading) => {
    switch (action) {
        case 'waiting': {
            return <Spinner />;
        }
        case 'loading': {
            return newGameLoading ? <Component /> : <Spinner />;
        }
        case 'confirmed': {
            return <Component />;
        }
        case 'error': {
            return <ErrorMessage />;
        }
        default: {
            throw new Error('Unexpected process state');
        }
    }
}

const GameList = ({ updateCurrentId }) => {
    const [games, setGames] = useState([]);
    const [newGameLoading, setNewGameLoading] = useState(false); // loading для завантаж додаткових персонажів, вик щоб вимкнути кнопку
    const [nextUrl, setNextUrl] = useState(null); // лінк на наступні 9 персонажі, який є у базі api
    const [gamesEnded, setGamesEnded] = useState(false);

    const [storedGames, setstoredGames] = useLocalStorage('games_dataList', games);
    // if localStoge empty use as default value games
    const [storedNextUrl, setStoredNextUrl] = useLocalStorage('games_nextPageData', nextUrl);
    // if localStoge empty use as default value nextUrl

    const [maxWidth992, setMaxWidth992] = useState(false);

    const { action, setAction, getAllGames } = useRawgService();

    useEffect(() => {
        if ((!storedGames || storedGames.length === 0) && !storedNextUrl) {
            onRequest(true); // перший раз завантажуємо без аргументу, підставляється знач по дефолту - перші 9 ігор
            // початкове завантаж true - показуємо спінер і не деактивуємо кнопку
        } else {
            setGames(storedGames); // якщо localStorage має дані, завантаж їх у стейти
            setNextUrl(storedNextUrl);
            onRequest(true, storedNextUrl);
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScrollBottom);

        return () => {
            window.removeEventListener('scroll', onScrollBottom);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => { // при скролі змін завантаження і якщо завантаж правда, робимо реквест
        if (newGameLoading && action !== 'error') {
            onRequest(false, nextUrl);
        }
        // eslint-disable-next-line
    }, [newGameLoading]);

    useEffect(() => {
        if (window.matchMedia("(max-width: 992px)").matches) { // get to know if it`s a small screen device
            setMaxWidth992(true);
        } else {
            setMaxWidth992(null);
        }
        // eslint-disable-next-line
    }, []);

    const onScrollBottom = () => { // скролимо до кінця сторінки і ставимо завантаження в true
        if ((window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) && newGameLoading === false) {
            setNewGameLoading(true);
        }
    }

    const onScrollInfo = () => { // scroll to section info by click
        scroller.scrollTo('info', {
            delay: 0,
            smooth: true,
            offset: 10,
            spy: false,
        });
    }

    const onRequest = (initialLoading, nextUrl) => { // другий раз і надалі завантаж з Url зі стейту
        initialLoading ? setNewGameLoading(false) : setNewGameLoading(true); // load new games, в цей час робимо кнопку неактивною

        getAllGames(nextUrl)
            .then(data => {
                onNewGamesLoaded(data.arr, data.nextPageUrl);
            })
            .then(() => setAction('confirmed'))
            .finally(() => {
                setNewGameLoading(false);
                if (Array.isArray(games) && games.length > 0) {
                    setStoredNextUrl(nextUrl);
                    setstoredGames(games);
                }
            });
    }

    const onNewGamesLoaded = (newGamesList, nextPageUrl) => {
        setGames(games => [...games, ...newGamesList]); // старі ігри + нові
        nextPageUrl ? setNextUrl(nextPageUrl) : setGamesEnded(true); // якщо url неправда, персонажі що закінчилися ставимо в true і вик це значення щоб сховати кнопку
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
                <motion.li
                    className="games__item"
                    tabIndex="0"
                    key={id}
                    ref={el => refsArr.current[index] = el} //кожен el це сам елемент з рефом, запис його в масив рефів (обов'язково current)
                    onClick={(e) => {
                        updateCurrentId(id);
                        onActiveClass(e);
                        if (maxWidth992) {
                            onScrollInfo();
                        }
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
                </motion.li>
            )
        });
        return (
            <motion.ul
                className="games__list">
                {items}
            </motion.ul>
        )
    }

    const content = useMemo(() => {
        return setContent(action, () => createList(games), newGameLoading);
        // eslint-disable-next-line
    }, [action]);

    const loadBtn = <button className="button games__content-btn"
        type="button"
        onClick={() => setNewGameLoading(true)}
        disabled={newGameLoading}
        style={{ 'display': gamesEnded ? 'none' : 'block' }}>LOAD MORE</button>;

    return (
        <div className="games__content">
            {content}
            {action === 'confirmed' ? loadBtn : null}
        </div>
    )
}

export default GameList;