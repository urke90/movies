import axios from "axios";

export default class ShowSearch {
  constructor(tvId) {
    this.tvId = tvId;
  }

  async getSearchedShow() {
    try {
      const res = await axios(
        `https://cors-anywhere.herokuapp.com/http://api.tvmaze.com/shows/${this.tvId}`
      );

      this.show = res.data;
    } catch (error) {
      console.log("error fetching SINGLE movie", error);
    }
  }
}
