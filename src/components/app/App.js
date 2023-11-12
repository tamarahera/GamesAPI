import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import './app.scss';

const App = () => {
  const [id, setId] = useState('');

  const updateCurrentId = (id) => {
    setId(id);
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path='/'>
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
            </Route>

            <Route exact path='/genres'>
              <section className="genres">
                <h1>Here will be games by genres</h1>
              </section>
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
