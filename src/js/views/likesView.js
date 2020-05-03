// render liked show to the UI
export const renderLikedShow = (likedShow) => {
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
  document.querySelector(".likes__list").insertAdjacentHTML("afterbegin", html);
};
