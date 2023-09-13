import Header from '../header/Header';
import Footer from '../footer/Footer';
import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
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

        <GameRandom />
        <section className="games">
          <div className="container">
            <div className="games__wrapper">
              <GameList updateCurrentId={updateCurrentId} />
              <GameInfo currentId={id}/>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
