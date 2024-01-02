import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

import useRawgService from '../services/RawgService';
import setContent from '../../utils/setContent';
import controller from '../../resources/controller_blue.png';
import nintendo from '../../resources/nintendo.png';

import { useEffect, useState } from 'react';

import './gameRandom.scss';

const GameRandom = () => {
    const [game, setGame] = useState({});

    const { action, setAction, getGameById, clearError } = useRawgService();

    useEffect(() => {
        onUpdateGame();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const showGameWithTime = setInterval(() => {
            onUpdateGame();
        }, 7000);

        return () => {
            clearInterval(showGameWithTime);
        }
        // eslint-disable-next-line
    }, []);

    const onUpdateGame = () => {
        clearError();
        const id = Math.floor(Math.random() * (3000 - 1) + 1);

        getGameById(id)
            .then(data => setGame(data))
            .then(() => setAction('confirmed'))
    }

    const content = setContent(action, View, game);

    return (
        <div className="random">
            <div className="container">
                <div className="random__wrapper">
                    <motion.div
                        className="random__game"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {content}
                    </motion.div>

                    <motion.div
                        className="random__try"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="random__try-text">
                            Random game for today!<br />
                            Do you want to know more about it?
                        </p>
                        <p className="random__try-text">Or choose another one</p>
                        <button className="button" type="button" onClick={onUpdateGame}>Try it</button>
                        <img className="random__try-img random__try-img--controller" src={controller} alt="controller" />
                        <img className="random__try-img random__try-img--nintendo" src={nintendo} alt="nintendo" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const View = ({ data }) => {
    const { name, descriptionStr, img, community, homepage, id } = data;

    const description = (descriptionStr && descriptionStr.length > 160) ? descriptionStr.slice(0, 160) + '...' : descriptionStr;

    return (
        <>
            <Link to={`/${id}`} className="random__game-box">
                <img src={img} alt={name} className="random__game-img" />
            </Link>
            <h3 className="title">{name}</h3>
            <p className="text text-descr random__game-text">{description}</p>
            <div className="random__game-btns">
                <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>
                    HOMEPAGE
                </a>
                <a href={community} className="button button--grey" target="_blank" rel="noreferrer" disabled={community ? false : true}>
                    community
                </a>
            </div>
        </>
    )
}

export default GameRandom;