// querySelecotrs
const showContainer = document.querySelector(".show__container");

// toggles the like btn (full heart if liked, empty if not)
export const toggleLikeBtnHandler = (isLiked) => {
  const heart = isLiked ? "icon-heart" : "icon-heart-outlined";

  document
    .querySelector(".likes__icon--show use")
    .setAttribute("href", `assets/icons.svg#${heart}`);
  console.log("heart", heart);
};

// Create html markup for individual show
const showHtml = (show) => {
  // console.log("show", show);

  const { image, name, summary, genres, type } = show;

  const genre = genres.map((genre) => `<li>${genre}</li>`);

  let { premiered } = show;

  premiered = premiered ? premiered : "No info for this show!";

  const html = `
        <div class="show-img__wrapper">
            <img class="show__image" src="${
              image && image.original
                ? image.original
                : "./assets/moviesDefaultLogo.jpeg"
            }" alt="movie" 
            />
        </div>
        <div class="show-content__wrapper">
            <h3 class="movie__heading">title:</h3>
            <p class="movie__title">
            ${name}
            </p>
            <h3 class="show-description__heading">Description:</h3>
                ${summary}            
            <h3 class="show-description__heading">Genres:</h3>
            <ul>
                ${genre}
            </ul>
            <h3 class="show-description__heading">Type:</h3>
            <p><b>${type}</b></p>
            <h3 class="show-description__heading">Premiered:</h3>
            <p><b>${premiered}</b></p>
            <svg class="likes__icon  likes__icon--show">
               <use href="assets/icons.svg#icon-heart-outlined"></use>
            </svg>
        </div>
    `;
  showContainer.innerHTML = html;
};

// Remove show from the UI
export const removeShowHandler = () => (showContainer.innerHTML = "");

// render searched show on UI
export const renderShowHandler = (show) => {
  showHtml(show);
};
