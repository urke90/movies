// markup and rednering searched actor
export const renderActorHandler = ({
  name,
  country,
  birthday,
  gender,
  img,
}) => {
  const markup = `
        <div class="modal-heading">
            <h2>${name}</h2>
            <img class="actor-img" src="${img}" alt="actor" />
        </div>
        <div class="modal-content">
            <p><b>Country:</b> ${country}</p>
            <p><b>Birthday:</b> ${birthday}</p>
            <p><b>Gender</b>: ${gender}</p>
        </div>
    `;
  document.querySelector(".modal-wrapper").innerHTML = markup;
};

// remove searched actor from UI
export const removeActorHandler = () =>
  (document.querySelector(".modal-wrapper").innerHTML = "");

// close modal function and hide backdrop
Array.from(
  document.querySelectorAll("#modal-backdrop, #close-actors-modal")
).forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector("#actors-modal").classList.toggle("visible");
    document.querySelector("#modal-backdrop").style.display = "none";
  });
});
