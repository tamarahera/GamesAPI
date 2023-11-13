import './gameRandom.scss';
import { useEffect, useState } from 'react';
import useRawgService from '../services/RawgService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import controller from '../../resources/controller_blue.png';
import nintendo from '../../resources/nintendo.png';

const GameRandom = () => {
    const [game, setGame] = useState({});

    const { loading, error, getGameById, clearError } = useRawgService();

    useEffect(() => {
        onUpdateGame();
    }, []);

    const onUpdateGame = () => {
        clearError();
        const id = Math.floor(Math.random() * (3000 - 1) + 1);

        getGameById(id)
            .then(data => setGame(data));
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || <View game={game} />

    return (
        <section className="random">
            <div className="container">
                <div className="random__wrapper">
                    <div className="random__game">
                        {content}
                    </div>

                    <div className="random__try">
                        <p className="random__try-text">
                            Random game for today!<br />
                            Do you want to know more about it?
                        </p>
                        <p className="random__try-text">Or choose another one</p>
                        <button className="button" type="button" onClick={onUpdateGame}>Try it</button>
                        <img className="random__try-img random__try-img--controller" src={controller} alt="controller" />
                        <img className="random__try-img random__try-img--nintendo" src={nintendo} alt="nintendo" />
                    </div>
                </div>
            </div>
        </section>
    )
}

const View = ({ game }) => {
    const { name, description, img, news, homepage } = game;

    const transformDescription = () => {
        if (description && description != 'No description for this game.') {
            //delete all tags in description
            const descriptionWithoutTags = description.replace(/<\/?\w* ?\/?>|[&#][\w\d-#+]*;|quot;|[-★=\*]*/g, '');

            const slicedDescription = descriptionWithoutTags.length > 160 ? descriptionWithoutTags.slice(0, 160) + '...' : descriptionWithoutTags;

            return slicedDescription;
        }
        return description;
    }

    const transformedDescription = transformDescription();

    return (
        <>
            <div className="random__game-box">
                <img src={img} alt={name} className="random__game-img" />
            </div>
            <h3 className="title">{name}</h3>
            <p className="text">{transformedDescription}</p>
            <div className="random__game-btns">
                <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>
                    HOMEPAGE
                </a>
                <a href={news} className="button button--grey" target="_blank" rel="noreferrer" disabled={news ? false : true}>
                    NEWS
                </a>
            </div>
        </>
    )
}

export default GameRandom;