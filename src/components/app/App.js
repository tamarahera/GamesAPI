import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './app.scss';
import { MainPage, GenresPage, Page404, SingleGamePage } from '../pages';
import { useEffect, useState } from 'react';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/:gameId' element={<SingleGamePage />} />
            <Route path='/genres' element={<GenresPage />} />
            <Route path='/genres/:gameId' element={<SingleGamePage />} />

            <Route path='*' element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
