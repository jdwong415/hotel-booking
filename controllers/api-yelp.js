// REQUIRED PACKAGES
	var express = require("express");
	var router = express.Router();
	var yelpKeys = require("../config.js");
	var yelp = require("yelp-fusion");

		console.log("CLIENT ID: ", yelpKeys.clientId);
		console.log("CLIENT SECRET: ",  yelpKeys.clientSecret);

	



// YELP FUSION API CALL

router.get("/yelp", function(req, res) {
	console.log("YELP API GIT ROUTE SUCCESS");
	res.render("yelpsearch");
});



router.post("/api/yelp", function(req, res) {

	console.log("API POST ROUTE ACTIVE")

	// USER SEARCH TERMS
	var searchRequest = {

		term: req.body.term,
		location: req.body.location
	};
	

	// CREATING YELP ACCESS TOKEN
	yelp.accessToken(yelpKeys.clientId, yelpKeys.clientSecret)
	.then(response => {

		var client = yelp.client(response.jsonBody.access_token);

		// SEARCH REQUEST
		client.search(searchRequest)
		.then((response => {

			var yelpResponse = response.jsonBody.businesses;
			var newData = yelpResponse['business'];
			// console.log(yelpResponse.length)
			var results = []
			for (var i = 0; i < 3; i++){

				// console.log("FULL DATA OBJ: ", newData)
				
				var displayData = {

					name: yelpResponse[i].name,
					location: yelpResponse[i].location.display_address,
					phone: yelpResponse[i].display_phone,
					open: yelpResponse[i].is_closed,
					rating: yelpResponse[i].rating
				}
				results.push(displayData)
				console.log("DISPLAY DATA: ", displayData);
				// var handlebarsData = ;


			}// close for loop

			// Render Yelp Results
			return res.render("yelpsearch", {business: results});
		


		}));// close client search .then func
	})
	.catch(error => {

		console.log("ERROR w/ TOKEN & SEARCH: ", error);

	});// close access token error catch func
})// close post funct




// EXPORT FUNCTION
module.exports = router;




