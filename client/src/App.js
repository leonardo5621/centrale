import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import SignIn from "./components/Connection";
import MoviesList from './components/moviesList';
import MovieDisplay from './containers/MovieDisplay';
import MovieCreate from './containers/MovieCreate';
import MovieRec from './components/movieRec'

function App() {
  return (
    <Router>
      <div>
       
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
          <Route path="/movies/movieList/:userID" composant={MovieRec} />

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
