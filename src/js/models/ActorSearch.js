import axios from "axios";

export default class ActorSearch {
  constructor(query) {
    this.query = query;
  }

  async getActors() {
    const res = await axios(`http://api.tvmaze.com/search/people?q=${query}`);
    const bla = res.data;
    console.log("bla", bla);
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
