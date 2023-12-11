import useRawgService from '../services/RawgService';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser'; // use to parse string into html
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './gameInfo.scss';

const GameInfo = ({ currentId }) => {
    const [game, setGame] = useState(null);

    const { loading, error, getGameById, clearError } = useRawgService();

    useEffect(() => {
        onUpdateGame(currentId);
    }, [currentId])

    const onUpdateGame = (currentId) => {
        clearError();
        if (!currentId) {
            return;
        }

        getGameById(currentId)
            .then(data => setGame(data));
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const skeleton = (game || loading || error) ? null : <Skeleton />;
    const content = spinner || errorMessage || skeleton || <View data={game} />;

    //name="info" for scroll from the games list
    return (
        <div className="games__info" name="info">
            {content}
        </div>
    )
}

const View = ({ data }) => {
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
                <div className="games__info-box">
                    <img src={img} alt={name} className="games__info-img" />
                </div>
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
            <div className="games__info-descr text">{descriptionParsed}</div>
            <ul className="games__info-platforms text">
                {platformItems}
            </ul>
        </>
    )
}

export default GameInfo;