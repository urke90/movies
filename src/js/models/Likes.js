export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, img, name) {
    const likedShow = {
      id,
      img,
      name,
    };
    this.likes.push(likedShow);
    return likedShow;
  }

  removeLike() {}

  isLiked() {}

  saveData() {}

  loadData() {}
}
