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

// Hide likes manu when we first load the page
// document.querySelector(".likes__panel").style.visibility = "hidden";

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
      console.log("state.singleSearch.show", state.singleSearch.show);
      base.removeLoaderHandler();
    } catch (error) {
      console.log("error fetching show", error);
    }
  }
};

window.addEventListener("hashchange", showSearchController);

// Likes controller
const likesContorller = () => {
  // console.log("event.target", e.target);
  if (!state.likedShow) state.likedShow = new Likes();

  const { id, image, name } = state.singleSearch.show;

  // get the id of the searched show/movie
  const currentShowId = state.singleSearch.show.id;

  // check if the show/movie is already liked
  if (!state.likedShow.isLiked(currentShowId)) {
    // show is not liked
    const likedShow = state.likedShow.addLike(id, image, name);
    showView.toggleLikeBtnHandler(true);
    likesView.renderLikedShowHandler(likedShow);
  } else {
    // show is liked
    // console.log("nece da moze");
    state.likedShow.removeLike(currentShowId);
    showView.toggleLikeBtnHandler(false);
    likesView.removeLikedShowHandler(currentShowId);
  }
  console.log("state.likedShow", state.likedShow);
  likesView.toggleLikesManu(state.likedShow.getNumLikes());
};

// add click event on signle show/movie container
showContainer.addEventListener("click", (event) => {
  if (event.target.matches(".likes__icon, .likes__icon *")) {
    likesContorller();
  }
});

const init = () => {
  // likesView.toggleLikesManu(state.likedShow.getNumLikes());
};

window.addEventListener("load", init);

window.state = state;
