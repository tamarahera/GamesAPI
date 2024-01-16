import { Link } from "react-router-dom";

import useRawgService from "../services/RawgService";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import React, { useState, useEffect } from 'react';

import './genreGames.scss';

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

const GenreGames = ({ genreData }) => {
    const [gameData, setGameData] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [newGameLoading, setNewGameLoading] = useState(false);

    const { action, setAction, getGamesByGenre } = useRawgService();

    useEffect(() => {
        if (genreData.slug) {
            onRequestGames(true, genreData.slug);
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

    useEffect(() => {
        if (newGameLoading && nextUrl) {
            onRequestGames(false, genreData.slug, nextUrl);
        }
        // eslint-disable-next-line
    }, [newGameLoading]);


    const onScrollBottom = () => {
        //window.scrollY - height from top to current point
        //document.documentElement.clientHeight - height of the user window
        //document.documentElement.scrollHeight - height of the whole document
        if ((window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) && newGameLoading === false) {
            setNewGameLoading(true);
        }
    }

    const onRequestGames = (initialLoading, slug, nextUrl) => {
        initialLoading ? setNewGameLoading(false) : setNewGameLoading(true);
        getGamesByGenre(slug, nextUrl)
            .then(data => {
                setGameData(gameData => [...gameData, ...data.arr])
                setNextUrl(data.nextPageUrl)
            })
            .then(() => setAction('confirmed'))
            .finally(() => {
                setNewGameLoading(false);
            })
    }

    const createGamesList = (arr) => {
        const items = arr.map(item => {
            const { name, img, id } = item;
            return (
                <li
                    className="genres__game"
                    key={id}>
                    <Link to={`/genres/${id}`} className="genres__game-link">
                        <div className="genres__game-box">
                            <img src={img} alt={name} className="genres__game-img" />
                        </div>
                        <h2 className="genres__game-title">{name}</h2>
                    </Link>
                </li>
            )
        })
        return (
            <>
                <h2 className="genres__title">{genreData.name}</h2>
                <ul className="genres__list">
                    {items}
                </ul>
                <button className="button genres__game-btn"
                    onClick={() => onRequestGames(false, genreData.slug, nextUrl)}
                    disabled={newGameLoading}>
                    Load more
                </button >
            </>
        )
    }

    const content = setContent(action, () => createGamesList(gameData), newGameLoading);

    return (
        <>
            {content}
        </>
    )
}

export default GenreGames;