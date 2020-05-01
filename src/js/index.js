// Global App controller
import "../css/style.css";
import SeachMovies from "./models/Search";
import * as searchView from "./views/searchView";
import * as base from "./views/base";

// Global state of the app
const state = {};

// Controller for searching movies
const searchController = async (e) => {
  e.preventDefault();

  const query = document.querySelector(".search__input").value;
  searchView.removeMoviesHandler();

  if (query) {
    state.movies = new SeachMovies(query);

    const container = document.querySelector(".movies__container");
    base.renderLoaderHandler(container);

    try {
      searchView.clearInputValueHandler();

      await state.movies.getMovies();

      searchView.renderMoviesHandler(state.movies.results);
      base.removeLoaderHandler();
    } catch (error) {
      console.log("error fetching movies", error);
    }
  }
};
// get movies from search movies form
document.querySelector(".search").addEventListener("submit", searchController);

window.state = state;
