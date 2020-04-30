// Global App controller
import "../css/style.css";
import SeachMovies from "./models/Search";

const state = {};

// Controller for searching movies
const searchController = async (e) => {
  e.preventDefault();
  const query = document.querySelector(".search__input").value;

  if (query) {
    console.log("query", query);

    state.movies = new SeachMovies(query);

    await state.movies.getMovies();
    console.log(state.movies);
  }
};
document.querySelector(".search").addEventListener("submit", searchController);

window.state = state;
