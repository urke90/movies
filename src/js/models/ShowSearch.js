import axios from "axios";

export default class ShowSearch {
  constructor(tvId) {
    this.tvId = tvId;
  }

  async getSearchedMovie() {
    try {
      const res = await axios(
        `https://cors-anywhere.herokuapp.com/http://api.tvmaze.com/shows/${this.tvId}`
      );
      console.log("res SINGLE movie", res);
    } catch (error) {
      console.log("error fetching SINGLE movie", error);
    }
  }
}
