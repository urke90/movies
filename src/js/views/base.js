export const renderLoaderHandler = (parentEl) => {
  const loaderSpinner = `
    <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

`;
  parentEl.insertAdjacentHTML("afterbegin", loaderSpinner);
};

export const removeLoaderHandler = () => {
  const loader = document.querySelector(".lds-roller");
  loader.parentElement.removeChild(loader);
};
