import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

import './genresList.scss';
import useRawgService from "../services/RawgService";
import controller from '../../resources/controller_white.jpg';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const GenresList = () => {
    const [genresData, setGenresData] = useState([]);
    const [genresGames, setGenresGames] = useState([]);
    const [genreName, setGenreName] = useState('');

    const [genresDataLoading, setGenresDataLoading] = useState(false);
    const [openGames, setOpenGames] = useState(false);

    const { getGenres, getGameById, loading, error } = useRawgService();

    const onRequestGenres = () => {
        setOpenGames(false);
        setGenresDataLoading(true);
        if (genresData.length > 0) {
            return;
        } else {
            getGenres()
                .then(data => {
                    setGenresData(data);
                })
                .catch(() => {
                    setGenresDataLoading(false);
                })
        }
    }

    const onRequestGamesById = (games, name) => {
        setGenresGames([]);
        setGenreName(name);
        games.forEach(item => {
            getGameById(item.id)
                .then(data => {
                    setGenresGames(genresGames => [...genresGames, data]);
                })
                .finally(() => {
                    setOpenGames(true);
                    setGenresDataLoading(false);
                })
        });
    }

    const containerAnimation = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemAnimation = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        }
    };

    const createGenresList = (arr) => {
        const items = arr.map(item => {
            const { id, img, name, games } = item;
            return (
                <motion.li className="genres__item"
                    key={id}
                    onClick={() => onRequestGamesById(games, name)}
                    variants={itemAnimation}>
                    <div className="genres__item-box">
                        <img src={img} alt={name} className="genres__item-img" />
                    </div>
                    <h2 className="genres__item-title">{name}</h2>
                </motion.li>
            )
        });
        return (
            <>
                <motion.ul className="genres__list"
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible">
                    {items}
                </motion.ul>
            </>
        )
    }

    const createGamesList = (arr) => {
        const items = arr.map(item => {
            const { name, img, id } = item;
            return (
                <motion.li
                    className="genres__game"
                    key={id}
                    variants={itemAnimation}>
                    <Link to={`/genres/${id}`} className="genres__game-link">
                        <div className="genres__game-box">
                            <img src={img} alt={name} className="genres__game-img" />
                        </div>
                        <h2 className="genres__game-title">{name}</h2>
                    </Link>
                </motion.li>
            )
        })
        return (
            <>
                <h2 className="genres__title">{genreName}</h2>
                <motion.ul className="genres__list"
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible">
                    {items}
                </motion.ul>
            </>
        )
    }

    const genresList = genresData.length && !openGames > 0 ? createGenresList(genresData) : null;
    const gamesList = genresGames.length && openGames > 0 ? createGamesList(genresGames) : null;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || genresList || gamesList;
    return (
        <>
            <div className="genres__promo">
                <img className="genres__promo-img" src={controller} alt="controller" loading="lazy" />
                <div className="genres__promo-info">
                    <p className="genres__promo-text">
                        {'Do you ask '}<q><i>{'What game should I play? '}</i></q>
                    </p>
                    <p className="genres__promo-text">
                        {`Choose `} <span>a genre</span> {' and explore the most popular games'}
                    </p>
                </div>
                <button
                    className="button genres__promo-btn"
                    type="button"
                    onClick={onRequestGenres}
                    disabled={genresDataLoading}>
                    {openGames ? 'Back to genres' : 'Let`s start'}
                </button>
            </div>
            {content}
        </>
    )
}

export default GenresList;