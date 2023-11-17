import { useState, useEffect } from "react";
import useRawgService from "../services/RawgService";
import './genresList.scss'

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
    /* console.log(genresList(genresData)) */
    const genresList = createGenresList(genresData);
    const content = genresList ? genresList : null
    return (
        <>
            <ul className="genres__list">
                {genresList}
            </ul>
        </>
    )
}

export default GenresList;