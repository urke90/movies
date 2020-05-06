// render liked show to the UI
export const renderLikedShowHandler = (likedShow) => {
  console.log("liked show likesView", likedShow);
  const { id, img, name } = likedShow;
  const html = `
        <li>
            <a class="likes__link" href="#${id}">
                <div class="likes-img__wrapper">
                    <img src="${
                      img && img.original
                        ? img.original
                        : "assets/moviesDefaultLogo.jpeg"
                    }" alt="favorite show" />                
                </div>
                <div>
                    <h3>Title:</h3>
                    <span>${name}</span>
                </div>
            </a>
        </li>
    `;
  document.querySelector(".likes__list").insertAdjacentHTML("beforeend", html);
};

// removes the liked show from the UI
export const removeLikedShowHandler = (id) => {
  const elToRemove = document.querySelector(`.likes__link[href*="#${id}"]`)
    .parentElement;

  if (elToRemove) {
    elToRemove.parentElement.removeChild(elToRemove);
  }
};

// toggles likes menu if there is(not) already liked movies
export const toggleLikesManu = (numOfLikes) => {
  const likesMenu = document.querySelector(".likes__panel");
  likesMenu.style.visibility = numOfLikes > 0 ? "visible" : "hidden";
};
