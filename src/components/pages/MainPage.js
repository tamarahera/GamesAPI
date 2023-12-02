import { useState } from 'react';

import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import UpArrow from '../../resources/circle-chevron-up-solid.svg';

const MainPage = () => {
    const [id, setId] = useState('');
    const [up, setUp] = useState(null);

    const updateCurrentId = (id) => {
        setId(id);
    }

    return (
        <>
            <ErrorBoundary>
                <GameRandom />
            </ErrorBoundary>
            <section className="games">
                <div className="container">
                    <div className="games__wrapper">
                        <ErrorBoundary>
                            <GameList updateCurrentId={updateCurrentId} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <GameInfo currentId={id} />
                        </ErrorBoundary>
                    </div>
                </div>
            </section>
            <button type="button" className='up'>
                <img src={UpArrow} alt="up" className='up__img' />
            </button>
        </>
    )
}

export default MainPage;