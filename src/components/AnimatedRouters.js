import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainPage, GenresPage, Page404, SingleGamePage } from './pages';
import { AnimatePresence } from 'framer-motion'

function AnimatedRouters() {
    const location = useLocation(); //локація має бути всередині роутера для правильного відображення анімації
    //mode='wait' чекає поки всі анімації завершаться
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainPage />} />
                <Route path='/:gameId' element={<SingleGamePage />} />
                <Route path='/genres' element={<GenresPage />} />
                <Route path='/genres/:gameId' element={<SingleGamePage />} />

                <Route path='*' element={<Page404 />} />
            </Routes>
        </AnimatePresence>

    )
}

export default AnimatedRouters