import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import AnimatedRouters from '../AnimatedRouters';

import './app.scss';

const App = () => {

  return (
    <Router>
      <div className="app">
        <Header />
        <AnimatedRouters />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
