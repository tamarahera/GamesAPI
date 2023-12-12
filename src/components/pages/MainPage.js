import { useEffect, useState } from 'react';
import { Link as HashLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion'

import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import GameSearch from '../gameSearch/GameSearch';
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
                <motion.img
                    src={UpArrowImg}
                    alt="up"
                    className='up__img'
                    key="arrow"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }} />
            </HashLink>
        )
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <ErrorBoundary>
                <GameRandom />
            </ErrorBoundary>
            <ErrorBoundary>
                <GameSearch />
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
            <AnimatePresence>
                {upArrow ? <ArrowBtn upArrow={upArrow} /> : null}
            </AnimatePresence>
        </motion.main>
    )
}

export default MainPage;