import { useEffect, useState } from 'react';
import useRawgService from '../services/RawgService';
import parse from 'html-react-parser'; // use to parse string into html
import './singleGame.scss';

const SingleGame = () => {
    const [gameData, setGameData] = useState(null);
    const { getGameById } = useRawgService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        getGameById(3328)
            .then(data => {
                console.log(data)
                setGameData(data)
            })
    }

    console.log(gameData)
    const content = gameData ? <View data={gameData} /> : null;

    return (
        <section className="single">
            <div className="container">
                {content}
            </div>
        </section>
    )
}

const View = ({ data }) => {
    const { name, description, developer, img, genres, rating, released, platforms, news, homepage, tags } = data;
    console.log(tags)
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

    const descriptionParsed = parse(description);

    return (
        <div className="single__wrapper">
            <div className="single__box">
                <img src={img} alt={name} className="single__box-img" />
            </div>
            <div className="single__info">
                <h3 className="single__title">{name}</h3>
                <dl className="single__info-list text">
                    <dt>Released:</dt>
                    <dd>{released}</dd>
                    <dt>Rating:</dt>
                    <dd>{rating}/5</dd>
                    <dt>Genres:</dt>
                    <dd>{genres}</dd>
                    <dt>Developer:</dt>
                    <dd>{developer}</dd>
                </dl>
                <div className="single__info-btns">
                    <a href={homepage} className="button" target="_blank" rel="noreferrer" disabled={homepage ? false : true}>HOMEPAGE</a>
                    <a href={news} className="button button--grey" target="_blank" rel="noreferrer" disabled={news ? false : true}>NEWS</a>
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
                <a href="#" className="single__back-link text">Back to all</a>
            </div>
        </div>
    )
}

export default SingleGame;