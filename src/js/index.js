// Global App controller
import "../css/style.css";
import SeachMovies from "./models/Search";
import * as searchView from "./views/searchView";

// Global state of the app
const state = {};

// Controller for searching movies
const searchController = async (e) => {
  e.preventDefault();
  const query = document.querySelector(".search__input").value;

  if (query) {
    state.movies = new SeachMovies(query);

    await state.movies.getMovies();
    searchView.renderMoviesHandler(state.movies.results);
  }
};
// get movies from search movies form
document.querySelector(".search").addEventListener("submit", searchController);

window.state = state;
