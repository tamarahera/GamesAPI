import { useState, useEffect } from "react";
import './genresList.scss';
import useRawgService from "../services/RawgService";
import controller from '../../resources/controller_white.jpg';
import imageNotFound from '../../resources/image_not_found.jpg';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const GenresList = () => {
    const [genresData, setGenresData] = useState([]);
    const [genresDataLoading, setGenresDataLoading] = useState(false);
    const [openGames, setOpenGames] = useState(false);

    const { getGenres, getGameById, loading, error } = useRawgService();

    const onRequestGenres = () => {
        setOpenGames(false);
        setGenresDataLoading(true);
        if (genresData.length > 0) {
            return;
        } else {
        getGenres()
            .then(data => {
                console.log(data);
                    setGenresData(data);
            })
                .catch(() => {
                    setGenresDataLoading(false);
                })
        }
    }
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
        return (
            <>
                <ul className="genres__list">
                    {items}
                </ul>
            </>
        )
    }
    }

    const genresList = genresData.length && !openGames > 0 ? createGenresList(genresData) : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || genresList;
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
                <button
                    className="button genres__promo-btn"
                    type="button"
                    onClick={onRequestGenres}
                    disabled={genresDataLoading}>
                    {openGames ? 'Back to genres' : 'Let`s start'}
                </button>
            </div>
            {content}
        </>
    )
}

export default GenresList;