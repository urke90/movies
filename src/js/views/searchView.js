// Remove searched movies from the UI

// Multiple used querySelcector
const moviesContainer = document.querySelector(".movies__container");

export const removeMoviesHandler = () => (moviesContainer.innerHTML = "");

// Clear search input value after fetching movies
export const clearInputValueHandler = () =>
  (document.querySelector(".search__input").value = "");

// Create HTML markup for rendering the movies
const movieMarkup = (movie) => {
  const { id, name, image } = movie.show;
  const htmlMarkup = `
        <div class="movie__wrapper">
          <a href="#${id}">
            <img
            src="${
              image && image.original
                ? image.original
                : "./assets/moviesDefaultLogo.jpeg"
            }"
            alt="action movie"
            class="movie__picture"
            />
          </a>
          <h3 class="movie__heading">title:</h3>
          <p class="movie__title">
            ${name}
          </p>
        </div>
    `;
  moviesContainer.innerHTML += htmlMarkup;
};

// render movies to the UI
export const renderMoviesHandler = (movies) => {
  movies.map(movieMarkup);
};
