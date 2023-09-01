import Header from '../header/Header';
import Footer from '../footer/Footer';
import GameList from '../gameList/GameList';
import GameRandom from '../gameRandom/GameRandom';
import GameInfo from '../gameInfo/GameInfo';
import RawgService from '../services/RawgService';
import './app.scss';

const App = () => {


/*   const newData = new RawgService();


  newData.getAllGames()
    .then((res) => {
      console.log(res)
    }) */

  return (
    <div className="app">
      <Header />
      <main>

        <GameRandom />
        <section className="games">
          <div className="container">
            <div className="games__wrapper">
              <GameList />
              <GameInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
