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
// Removes loader from UI after fetching the data
export const removeLoaderHandler = () => {
  const loader = document.querySelector(".lds-roller");
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
