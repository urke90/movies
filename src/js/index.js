// Global App controller
import "../css/style.css";
import SeachMovies from "./models/Search";
import ShowSearch from "./models/ShowSearch";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as showView from "./views/showView";
import * as likesView from "./views/likesView";
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
    // load spinner before we render movies/shows on UI
    base.renderLoaderHandler(searchContainer);

    try {
      searchView.clearInputValueHandler();

      await state.movies.getMovies();

      // render searched movies/shows on UI
      searchView.renderMoviesHandler(state.movies.results);

      // remove spinner(loader) after rendering movies
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
  // get the id of clicked show/movie form hash
  const hash = window.location.hash;
  const showId = hash.replace("#", "");

  // Removes previous search results before rendering new ones
  searchView.removeMoviesHandler();
  showContainer.style.display = "flex";

  if (showId) {
    state.singleSearch = new ShowSearch(showId);

    // remove previous searched show/movie before rendering new one
    showView.removeShowHandler();

    // render spinner(loader) before fetching single movie/show
    base.renderLoaderHandler(showContainer);

    try {
      await state.singleSearch.getSearchedShow();

      // render searched single show/movie on UI
      showView.renderShowHandler(state.singleSearch.show);

      // remove spinner(loader) on UI after rendering single show/movie
      base.removeLoaderHandler();
    } catch (error) {
      console.log("error fetching show", error);
    }
  }
};

window.addEventListener("hashchange", showSearchController);

// Likes controller
const likesContorller = () => {
  // if there weren't liked shows before, create new likes array
  if (!state.likedShow) state.likedShow = new Likes();

  const { id, image, name } = state.singleSearch.show;

  // check if the show/movie is already liked
  if (!state.likedShow.isLiked(id)) {
    // SHOW IS NOT LIKED

    // Add liked show to likes array
    const likedShow = state.likedShow.addLike(id, image, name);

    // changes like(heart) icon to be filled when single show/movie is liked
    showView.toggleLikeBtnHandler(true);

    // Renders liked single show/movie to UI to the likes list(panel)
    likesView.renderLikedShowHandler(likedShow);
  } else {
    // SHOW IS LIKED

    // Removes liked single show/movie from likes array
    state.likedShow.removeLike(id);

    // changes like(heart) icon to be just outlined when single show/movie is liked
    showView.toggleLikeBtnHandler(false);

    // removes liked single show/movie from UI from liks list(panel)
    likesView.removeLikedShowHandler(id);
  }
  // display/hide likes panel(menu) UI if there are liked movies
  likesView.toggleLikesManu(state.likedShow.getNumLikes());
};

// add click event on single show/movie container
showContainer.addEventListener("click", (event) => {
  if (event.target.matches(".likes__icon, .likes__icon *")) {
    likesContorller();
  }
});

// function called on page load
const init = () => {
  // likesView.toggleLikesManu(state.likedShow.getNumLikes());
  // create new likes array when page loads
  state.likedShow = new Likes();
  // load liked shows from local storage
  state.likedShow.loadData();
  // if there are liked shows display likes menu(panel)
  likesView.toggleLikesManu(state.likedShow.getNumLikes());
  // render liked shows in likes menu
  state.likedShow.likes.map(likesView.renderLikedShowHandler);
};

// call the function when page loads
window.addEventListener("load", init);

window.state = state;
