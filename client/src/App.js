import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import SignIn from "./components/Connection";
import MoviesList from './components/moviesList';
import MovieDisplay from './containers/MovieDisplay';
import MovieCreate from './containers/MovieCreate';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">API Fetch demo</Link>
            </li>
          </ul>
        </nav> */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route  path="/demo">
            <PokemonDisplayer />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/connection">
            <SignIn />
          </Route>
          <Route exact path="/movies/movieList">
              <MoviesList />
          </Route>
          <Route path="/movies/:movieID" component={MovieDisplay} />

          <Route exact path="/movies/movieCreate">
            <MovieCreate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
