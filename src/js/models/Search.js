import axios from "axios";

export default class SearchMovies {
  constructor(query) {
    this.query = query;
  }

  async getMovies() {
    try {
      const res = await axios(
        `http://api.tvmaze.com/search/shows?q=${this.query}`
      );
      this.results = res.data;
      console.log("results", this.results);
    } catch (error) {
      console.log("error fetching all movies", error);
    }
  }
}
