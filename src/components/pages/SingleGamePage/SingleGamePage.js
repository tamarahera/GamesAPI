import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'

import useRawgService from '../../services/RawgService';
import parse from 'html-react-parser'; // use to parse string into html
import './singleGamePage.scss';

import { useParams, Link, useLocation } from 'react-router-dom';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SingleGamePage = () => {
    const [gameData, setGameData] = useState(null);
    const [path, setPath] = useState(null);
    const { getGameById, clearError, error, loading } = useRawgService();

    const { gameId } = useParams();

    useEffect(() => {
        onRequest(gameId);
    }, [gameId])

    useEffect(() => {
        if (location.pathname.match(/genres/)) {
            setPath("/genres")
        } else {
            setPath("/")
        }
    }, [])

    const location = useLocation();

    const onRequest = (id) => {
        clearError();
        getGameById(id)
            .then(data => {
                setGameData(data)
            })
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    const content = spinner || errorMessage || (gameData ? <View data={gameData} path={path} /> : null);


    return (
        <motion.section
            className="single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="container">
                {content}
                {errorMessage ? <Link to="/" className="button single__back-btn">Back to all</Link> : null}
            </div>
        </motion.section>
    )
}

const View = ({ data, path }) => {
    const { name, developer, img, genres, rating, released, platforms, community, homepage, tags } = data;
    let { description } = data;

    const platformItems = platforms.map((item, i) => {
        return (
            <li className="single__info-platform" key={i}>{item}</li>
        )
    });

    const tagItems = tags.map((item, i) => {
        return (
            <li className="single__info-tag"
                key={i}>
                {`#${item.name.toLowerCase()}`}
            </li>
        );
    });

    const descriptionParse = () => {
        if (/h[1-5]?>/.test(description)) {
            description = description.replace(/h[1-4]>/g, 'h6>');
            return parse(description);
        } else {
            return parse(description);
        }
    };

    const descriptionParsed = descriptionParse();

    return (
        <ErrorBoundary>
            <motion.div
                className="single__wrapper"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
            >
                <div className="single__box">
                    <img src={img} alt={name} className="single__box-img" />
                    <img src={img} alt={name} className="single__box-up" />
                </div>
                <div className="single__info">
                    <h3 className="single__title">{name}</h3>
                    <dl className="single__info-list text">
                        <dt>Released:</dt>
                        <dd>{released}</dd>
                        <dt>Rating:</dt>
                        <dd>{rating}</dd>
                        <dt>Genres:</dt>
                        <dd>{genres}</dd>
                        <dt>Developer:</dt>
                        <dd>{developer}</dd>
                    </dl>
                    <div className="single__info-btns">
                        <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>HOMEPAGE</a>
                        <a href={community} className="button button--grey" target="_blank" rel="noreferrer" disabled={community ? false : true}>community</a>
                    </div>
                    <div className="single__info-descr text">{descriptionParsed}</div>
                    <ul className="single__info-platforms text">
                        {platformItems}
                    </ul>
                    <ul className="single__info-tags">
                        {tagItems}
                    </ul>
                </div>

                <div className="single__back">
                    <Link to={path} className="single__back-link text">Back to all</Link>
                </div>
            </motion.div>
        </ErrorBoundary>
    )
}

export default SingleGamePage;