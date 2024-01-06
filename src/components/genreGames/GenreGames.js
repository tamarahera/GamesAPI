import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import useRawgService from "../services/RawgService";

import React, { useState, useEffect } from 'react';

import './genreGames.scss';

const GenreGames = ({ genreData }) => {
    const [gameData, setGameData] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [newGameLoading, setNewGameLoading] = useState(false);

    const { getGamesByGenre } = useRawgService();

    useEffect(() => {
        setGameData([]);
        if (genreData.slug) {
            onRequestGames(true, genreData.slug);
        }
        // eslint-disable-next-line
    }, []);

    const onRequestGames = (initialLoading, slug, nextUrl) => {
        initialLoading ? setNewGameLoading(false) : setNewGameLoading(true);
        getGamesByGenre(slug, nextUrl)
            .then(data => {
                setGameData(gameData => [...gameData, ...data.arr])
                setNextUrl(data.nextPageUrl)
            })
            .finally(() => {
                setNewGameLoading(false);
            })
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
                <h2 className="genres__title">{genreData.name}</h2>
                <motion.ul className="genres__list"
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible">
                    {items}
                </motion.ul>
                <button className="button genres__game-btn"
                    onClick={() => onRequestGames(false, genreData.slug, nextUrl)}
                    disabled={newGameLoading}>
                    Load more
                </button >
            </>
        )
    }

    const content = gameData.length > 0 ? createGamesList(gameData) : null;

    return (
        <>
            {content}
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

export default GenreGames;