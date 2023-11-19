import { useState, useEffect } from "react";
import './genresList.scss';
import useRawgService from "../services/RawgService";
import controller from '../../resources/controller_white.jpg';


const GenresList = () => {
    const [genresData, setGenresData] = useState([]);
    const { getGenres } = useRawgService();

    useEffect(() => {
        onRequestGenres();
    }, []);

    const onRequestGenres = () => {
        getGenres()
            .then(data => {
                console.log(data);
                genresLoaded(data);
            })
    }

    const genresLoaded = (newData) => {
        setGenresData(newData);
    }

    const createGenresList = (arr) => {
        return arr.map(item => {
            const { id, image_background, name } = item;
            return (
                <li className="genres__item"
                    key={id}>
                    <div className="genres__item-box">
                        <img src={image_background} alt={name} className="genres__item-img" />
                    </div>
                    <h2 className="genres__item-title">{name}</h2>
                </li>
            )
        });
    }

    const genresList = createGenresList(genresData);
    const content = genresList ? genresList : null;
    return (
        <>
            <div className="genres__promo">
                <img className="genres__promo-img" src={controller} alt="controller" />
                <div className="genres__promo-info">
                    <p className="genres__promo-text">
                        {'Do you ask '}<q><i>{'What game should I play? '}</i></q>
                    </p>
                    <p className="genres__promo-text">
                        {`Choose `} <span>a genre</span> {' and explore the most popular games'}
                    </p>
                </div>
                <button className="button genres__promo-btn" type="button">{'Let`s start'}</button>
            </div>
            <ul className="genres__list">
                {genresList}
            </ul>
        </>
    )
}

export default GenresList;