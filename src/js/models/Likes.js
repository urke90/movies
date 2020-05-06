export default class Likes {
  constructor() {
    this.likes = [];
  }
  // adds like object  to the likes array
  addLike(id, img, name) {
    const likedShow = {
      id,
      img,
      name,
    };
    this.likes.push(likedShow);
    this.saveData();
    return likedShow;
  }
  // removes like from the likes array
  removeLike(id) {
    // const likedItemIndex = this.likes.findIndex((elem) => elem.id === id);
    // this.likes.slice(likedItemIndex, likedItemIndex + 1);
    this.likes = this.likes.filter((elem) => elem.id !== id);
    this.saveData();
  }

  isLiked(id) {
    // if there is show alredy then return TRUE
    // else return FALSE
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  // returns likes array length used for toggling likes menu/list
  getNumLikes() {
    return this.likes.length;
  }

  // saves likes to the local storage
  saveData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }
  // loads the likes array from the local storage
  loadData() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
