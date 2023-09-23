import RawgService from '../services/RawgService';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser'; // use to parse string into html

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './gameInfo.scss';


const GameInfo = ({ currentId }) => {
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        console.log('use effect')
        onUpdateGame(currentId);
    }, [currentId])

    const onUpdateGame = (currentId) => {
        if (!currentId) {
            return;
        }

        onLoading();

        const gameData = new RawgService();

        gameData.getGameById(currentId)
            .then(data => setGame(data))
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err);
                onError();
            })
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoading = () => {
        setLoading(true);
        setError(false);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const skeleton = (game || loading || error) ? null : <Skeleton />;
    const content = spinner || errorMessage ||skeleton || <View data={game}/>;

    return (
        <div className="games__info">
            {content}
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, developer, img, genres, rating, released, platforms, news, homepage} = data;

    const platformItems = platforms.map((item, i) => {
        return (
            <li className="games__info-platform" key={i}>{item}</li>
        )
    });
    const descriptionParsed = parse(description);

    return (
        <>
            <div className="games__info-header">
                <div className="games__info-box">
                    <img src={img} alt={name} className="games__info-img" />
                </div>
                <h3 className="title">{name}</h3>
                <div className="games__info-btns">
                    <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>HOMEPAGE</a>
                    <a href={news} className="button button--grey" target="_blank" rel="noreferrer" disabled={news ? false : true}>NEWS</a>
                </div>
            </div>
            <dl className="games__info-list text">
                <dt>Released:</dt>
                <dd>{released}</dd>
                <dt>Rating:</dt>
                <dd>{rating}/5</dd>
                <dt>Genres:</dt>
                <dd>{genres}</dd>
                <dt>Developer:</dt>
                <dd>{developer}</dd>
            </dl>
            <div className="games__info-descr text">{descriptionParsed}</div>
            <ul className="games__info-platforms text">
                {platformItems}
            </ul>
        </>
    )
}

export default GameInfo;