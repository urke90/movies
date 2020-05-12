// Multiple used querySelcector
const moviesContainer = document.querySelector(".movies__container");
const paginationContainer = document.querySelector(".pagination__container");
// Removes searched movies from UI
export const removeMoviesHandler = () => (moviesContainer.innerHTML = "");

// Removes pagination from UI
export const removePaginationHandler = () =>
  (paginationContainer.innerHTML = "");

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

// func za html structure paginacije
// func za odredjivanje koliko el paginacije ce biti

// PAGINATION IMPLEMENTATION
// 1. movies = state.movies.results ==> all moveies fetched when searcing
// 2. currentPage = 1 by default
// 3. itemsPerPage = 3 by default
// 4. total pages = 4 by calculation

// render movies to the UI
export const renderMoviesHandler = (
  fetchedMovies,
  currentPage = 1,
  itemsPerPage = 3
) => {
  console.log("currentPage", currentPage);
  const startSlice = currentPage * itemsPerPage - itemsPerPage;
  const endSlice = currentPage * itemsPerPage;

  // select which movies to display based on currentPage
  fetchedMovies.slice(startSlice, endSlice).map(movieMarkup);

  // display movies on screen

  renderPaginationBtnsHandler(fetchedMovies, currentPage, itemsPerPage);
};

// Check how many pages we need for pagination and create that much btns
export const renderPaginationBtnsHandler = (
  fetchedMovies,
  currPage,
  itemsPerPage
) => {
  // how many pages do we need
  const pageCount = Math.ceil(fetchedMovies.length / itemsPerPage);

  let prevNextPagiBtn;

  const pageNumber = countPagiBtnsHandler(pageCount);

  // logic for showing prev/next btns
  if (currPage === 1 && pageCount > 1) {
    prevNextPagiBtn = `
      ${pageNumber.map(paginationBtns).join("")}
      ${paginationBtnsPrevNext("next", currPage)}
    `;
  } else if (currPage < pageCount) {
    prevNextPagiBtn = `
      ${paginationBtnsPrevNext("prev", currPage)}
      ${pageNumber.map(paginationBtns).join("")}  
      ${paginationBtnsPrevNext("next", currPage)}
    `;
  } else if (currPage === pageCount && pageCount > 1) {
    prevNextPagiBtn = `
      ${paginationBtnsPrevNext("prev", currPage)}
      ${pageNumber.map(paginationBtns).join("")}
    `;
  }
  paginationContainer.innerHTML = prevNextPagiBtn;
};

// Count how many pagi btns we need
const countPagiBtnsHandler = (pageCount) => {
  let pageIndex = [];
  for (let i = 1; i <= pageCount; i++) {
    pageIndex.push(i);
  }
  return pageIndex;
};

// pagi btn-num markup
const paginationBtns = (page) => `
  <button data-goToPage=${page} class="pagi__btn-num">${page}</button>
`;

// create HTML structure for prev/next btns
const paginationBtnsPrevNext = (type, currPage) => `
  <button data-gotopage=${
    type === "prev" ? currPage - 1 : currPage + 1
  } class="pagi-btn-next-prev ${type === "prev" ? "btn-prev" : "btn-next"}">    
    <svg class="search__icon">
      <use href="/assets/icons.svg#icon-triangle-${
        type === "prev" ? "left" : "right"
      }"></use>
    </svg>
    <span>${type === "prev" ? currPage - 1 : currPage + 1}</span>
  </button>
`;

////////////////////////////////////////////////INITIAL MY SETUP////////////////////////////////////////////
// export const renderMoviesHandler = (
//   movies,
//   currentPage = 1,
//   itemsPerPage = 3
// ) => {
//   // for movies to be displayed we need
//   // all fetched movies (movies)
//   // current page (currentPage)
//   // items per page (itemsPerPage)

//   // 1. write down how to slice array example: slice (0,3), slice (3,6), slice (6,9), slice (9,12)
//   // 2. write current page, items per page, start slice and do the math
//   // 3. write current page, items per page, end slice and do the math

//   // page 1 - pocetna array od 0 do 2 znaci slice (0,3) startSlice = 0, endSlice = 3
//   // page 2 array 3 do 5 znaci slice (3,6) startSlice = 3, endSlice = 6
//   // page 3 array 6 do 8 znaci slice (6,9) startSlice = 6, endSlice = 9
//   // page 4 array od 8 do 10 znaci slice (9,12) startSlice = 9 endSlice = 12

//   // page 1 itemsPerPage = 3 startSlice = 0
//   // page 2 itemsPerPage = 3 startSlice = 3
//   // page 3 itemsPerPage = 3 startSlice = 6
//   // page 4 itemsPerPage = 3 startSlice = 9

//   // page 1  itemsPerPage = 3 endSlice = 3
//   // page 2  itemsPerPage = 3 endSlice = 6
//   // page 3  itemsPerPage = 3 endSlice = 9
//   // page 4  itemsPerPage = 3 endSlice = 12

//   // const startSlice = (currentPage - 1) * itemsPerPage; ==> same as lower const logic
//   const startSlice = currentPage * itemsPerPage - itemsPerPage;
//   const endSlice = currentPage * itemsPerPage;

//   movies.slice(startSlice, endSlice).map(movieMarkup);

//   // movies.map(movieMarkup);
// };
