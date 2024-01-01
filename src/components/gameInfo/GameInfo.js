import { Link } from 'react-router-dom';
import parse from 'html-react-parser'; // use to parse string into html

import useRawgService from '../services/RawgService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import { useEffect, useState } from 'react';

import './gameInfo.scss';

const setContent = (action, Component, data, id) => {
    switch (action) {
        case 'waiting': {
            return <Skeleton />;
        }
        case 'loading': {
            return <Spinner />;
        }
        case 'confirmed': {
            return <Component data={data} id={id} />;
        }
        case 'error': {
            return <ErrorMessage />;
        }
        default: {
            throw new Error('Unexpected process state');
        }
    }
}

const GameInfo = ({ currentId }) => {
    const [game, setGame] = useState(null);

    const { action, setAction, getGameById, clearError } = useRawgService();

    useEffect(() => {
        onUpdateGame(currentId);
        // eslint-disable-next-line
    }, [currentId])

    const onUpdateGame = (currentId) => {
        if (!currentId) {
            return;
        }

        clearError();

        getGameById(currentId)
            .then(data => setGame(data))
            .then(() => setAction('confirmed'))
    }

    const content = setContent(action, View, game, currentId);

    //name="info" for scroll from the games list
    return (
        <div className="games__info" name="info">
            {content}
        </div>
    )
}

const View = ({ data, id }) => {
    const { name, description, developer, img, genres, rating, released, platforms, community, homepage } = data;

    const platformItems = platforms.map((item, i) => {
        return (
            <li className="games__info-platform" key={i}>{item}</li>
        )
    });
    const descriptionParsed = parse(description);

    return (
        <>
            <div className="games__info-header">
                <Link to={`/${id}`} className="games__info-box">
                    <img src={img} alt={name} className="games__info-img" />
                </Link>
                <h3 className="title">{name}</h3>
                <div className="games__info-btns">
                    <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>HOMEPAGE</a>
                    <a href={community} className="button button--grey" target="_blank" rel="noreferrer" disabled={community ? false : true}>community</a>
                </div>
            </div>
            <dl className="games__info-list text">
                <dt>Released:</dt>
                <dd>{released}</dd>
                <dt>Rating:</dt>
                <dd>{rating}</dd>
                <dt>Genres:</dt>
                <dd>{genres}</dd>
                <dt>Developer:</dt>
                <dd>{developer}</dd>
            </dl>
            <div className="games__info-descr text text-descr">{descriptionParsed}</div>
            <ul className="games__info-platforms text">
                {platformItems}
            </ul>
        </>
    )
}

export default GameInfo;