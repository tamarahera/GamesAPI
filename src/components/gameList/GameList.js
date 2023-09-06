import RawgService from '../services/RawgService';
import './gameList.scss';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const GameList = ({updateCurrentId}) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        onLoading();

        onUpdateGames();
    }, [])

    const onUpdateGames = () => {
        const gamesData = new RawgService();

        gamesData.getAllGames()
            .then(data => {setGames(data)})
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

    const createList = (arr) => {
        const items = arr.map(item => {
            const { name, img, id } = item;

            return (
                <li className="games__item" tabIndex="0" key={id} onClick={() => updateCurrentId(id)}>
                    <div className="games__item-box">
                        <img src={img} alt={name} className="games__item-img" />
                    </div>
                    <h2 className="games__item-title">{name}</h2>
                </li>
            )
        });
        return (
            <ul className="games__list">
                {items}
            </ul>
        )
    }

    const list = createList(games);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = spinner || errorMessage || list

    return (
        <div className="games__content">
            {content}
            <button className="button games__content-btn" type="button">LOAD MORE</button>
        </div>
    )
}

export default GameList;