import { useEffect, useState } from 'react';
import { Link as HashLink } from 'react-scroll';

import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import UpArrowImg from '../../resources/circle-chevron-up-solid.svg';

const MainPage = () => {
    const [id, setId] = useState('');
    const [upArrow, setUpArrow] = useState(null);

    const updateCurrentId = (id) => {
        setId(id);
    }

    useEffect(() => {
        window.addEventListener('scroll', showUpArrow);
        return () => {
            window.removeEventListener('scroll', showUpArrow);
        }
    }, []);

    const showUpArrow = () => {
        if (document.documentElement.clientHeight < window.scrollY) {
            setUpArrow(true);
        } else {
            setUpArrow(false);
        }
    }

    const ArrowBtn = () => {
        return (
            <HashLink className='up' to='header'>
                <img src={UpArrowImg} alt="up" className='up__img' />
            </HashLink>
        )
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
            {upArrow ? <ArrowBtn /> : null}
        </>
    )
}

export default MainPage;