// Global App controller
import "../css/style.css";
import SeachMovies from "./models/Search";
import ShowSearch from "./models/ShowSearch";
import * as searchView from "./views/searchView";
import * as showView from "./views/showView";
import * as base from "./views/base";

// Global state of the app
const state = {};

// Multiple used querySelectors
const showContainer = document.querySelector(".show__container");

// Controller for searching movies
const searchController = async (e) => {
  e.preventDefault();

  // get value from search imput
  const query = document.querySelector(".search__input").value;
  // remove previous searched results before rendering new movies
  searchView.removeMoviesHandler();
  // hide fetched show/movie
  showContainer.style.display = "none";

  if (query) {
    state.movies = new SeachMovies(query);

    const searchContainer = document.querySelector(".movies__container");
    base.renderLoaderHandler(searchContainer);

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

// show search controller ( single movie ctrl)
const showSearchController = async () => {
  // get the id of clicked show/movie
  const hash = window.location.hash;
  const showId = hash.replace("#", "");

  searchView.removeMoviesHandler();
  showContainer.style.display = "flex";

  if (showId) {
    state.singleSearch = new ShowSearch(showId);
    showView.removeShowHandler();
    base.renderLoaderHandler(showContainer);

    try {
      await state.singleSearch.getSearchedShow();

      showView.renderShowHandler(state.singleSearch.show);
      base.removeLoaderHandler();
    } catch (error) {
      console.log("error fetching show", error);
    }
  }
};

window.addEventListener("hashchange", showSearchController);
