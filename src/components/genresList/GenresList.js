import { motion } from "framer-motion"

import useRawgService from "../services/RawgService";
import controller from '../../resources/controller_white.jpg';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import { useState } from "react";

import './genresList.scss';
import GenreGames from "../genreGames/GenreGames";

const setContent = (action, Component, data) => {
    switch (action) {
        case 'waiting': {
            break;
        }
        case 'loading': {
            return <Spinner />;
        }
        case 'confirmed': {
            return <Component data={data} />;
        }
        case 'error': {
            return <ErrorMessage />;
        }
        default: {
            throw new Error('Unexpected process state');
        }
    }
}

const GenresList = () => {
    const [genresData, setGenresData] = useState([]);
    const [showGames, setShowGames] = useState(false);

    const [genreNames, setGenreNames] = useState('');

    const [genresDataLoading, setGenresDataLoading] = useState(false);

    const { action, setAction, getGenres } = useRawgService();

    const onRequestGenres = () => {
        setShowGames(false);
        setGenresDataLoading(true);
        if (genresData.length > 0) {
            return;
        } else {
            getGenres()
                .then(data => setGenresData(data))
                .then(() => setAction('confirmed'))
                .catch(() => {
                    setGenresDataLoading(false);
                })
        }
    }

    const createGenresList = (arr) => {
        const sortByName = (a, b) => {
            return a.name.localeCompare(b.name);
        }

        const items = arr.toSorted(sortByName).map(item => {
            const { id, img, name, slug } = item;
            return (
                <motion.li className="genres__item"
                    key={id}
                    onClick={() => {
                        setShowGames(true);
                        setGenreNames({ name, slug });
                        setGenresDataLoading(false);
                    }}
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

    const genresGames = showGames ? <GenreGames genreData={genreNames} /> : null;

    const content = setContent(action, () => createGenresList(genresData), genresGames);

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
                {!genresDataLoading ? <button
                    className="button genres__promo-btn"
                    type="button"
                    onClick={onRequestGenres}>
                    {showGames ? 'Back to genres' : 'Let`s start'}
                </button> : null}
            </div>
            {showGames ? <GenreGames genreData={genreNames} /> : content}
        </>
    )
}

const containerAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1,
        }
    }
};

const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

export default GenresList;