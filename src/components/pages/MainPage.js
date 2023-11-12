import { useState } from 'react';

import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const MainPage = () => {
    const [id, setId] = useState('');

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
        </>
    )
}

export default MainPage;