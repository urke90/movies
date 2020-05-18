import axios from "axios";

export default class ActorSearch {
  constructor(query) {
    this.query = query;
  }

  async getActors() {
    try {
      const res = await axios(
        `http://api.tvmaze.com/search/people?q=${this.query}`
      );

      const data = res.data[0].person;

      // const {
      //   name,
      //   country: { name: country },
      //   birthday,
      //   gender,
      //   image: { original: imgOriginal },
      // } = data;

      this.name = data.name;
      this.country =
        data.country && data.country.name ? data.country.name : "No Info!";
      this.birthday = data.birthday ? data.birthday : "No info!";
      this.gender = data.gender ? data.gender : "No Info!";
      this.img =
        data.image && data.image.original
          ? data.image.original
          : "./assets/no-image.png";
    } catch (error) {
      console.log("error fetching actor model", error);
    }
  }
}

// {
// 	"score": 34.674767,
// 	"person": {
// 		"id": 172658,
// 		"url": "http://www.tvmaze.com/people/172658/lauren-bush-lauren",
// 		"name": "Lauren Bush Lauren",
// 		"country": {
// 			"name": "United States",
// 			"code": "US",
// 			"timezone": "America/New_York"
// 		},
// 		"birthday": "1984-06-25",
// 		"deathday": null,
// 		"gender": "Female",
// 		"image": {
// 			"medium": "http://static.tvmaze.com/uploads/images/medium_portrait/108/272410.jpg",
// 			"original": "http://static.tvmaze.com/uploads/images/original_untouched/108/272410.jpg"
// 		},
// 		"_links": {
// 			"self": {
// 				"href": "http://api.tvmaze.com/people/172658"
// 			}
// 		}
// 	}
// }
