import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

import './app.scss';
import { MainPage, GenresPage } from '../pages';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path='/'>
              <MainPage />
            </Route>

            <Route exact path='/genres'>
              <GenresPage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
