import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion'

import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import GameSearch from '../gameSearch/GameSearch';
import ArrowBtn from '../arrowUp/ArrowUp';

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

    return (
        <HelmetProvider>
            <Helmet>
                <title>Games information portal</title>
                <meta name="description" content="Games information portal" />
            </Helmet>
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
                    {upArrow ? <ArrowBtn /> : null}
                </AnimatePresence>
            </motion.main>
        </HelmetProvider>

    )
}

export default MainPage;