import Header from '../header/Header';
import Footer from '../footer/Footer';
import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import { useState } from 'react';

import './app.scss';

const App = () => {
  const [id, setId] = useState('');

  const updateCurrentId = (id) => {
    setId(id);
  }

  return (
    <div className="app">
      <Header />
      <main>

        <ErrorBoundary>
          <GameRandom />
        </ErrorBoundary>
        {/*         <section className="games">
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
        </section> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
