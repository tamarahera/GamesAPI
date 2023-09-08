import RawgService from '../services/RawgService';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser'; // use to parse string into html


import './gameInfo.scss';


const GameInfo = ({ currentId }) => {
    const [game, setGame] = useState(null);
    
    useEffect(() => {
        console.log('use effect')
        onUpdateGame(currentId);
    }, [currentId])

    const onUpdateGame = (currentId) => {
        if (!currentId) {
            return;
        }

        const gameData = new RawgService();

        gameData.getGameById(currentId)
            .then(data => setGame(data))
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="games__info">
            <View data={game}/>
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
                    <a href={homepage} className="button" target="_blank" disabled={homepage ? false : true}>HOMEPAGE</a>
                    <a href={news} className="button button--grey" target="_blank" disabled={news ? false : true}>NEWS</a>
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