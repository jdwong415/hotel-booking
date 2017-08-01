// REQUIRED PACKAGES
	var yelpKeys = require("../config.js");
	var yelp = require("yelp-fusion");

		console.log("CLIENT ID: ", yelpKeys.clientId);
		console.log("CLIENT SECRET: ",  yelpKeys.clientSecret);

	// YELP CONNECTION TOKEN
	var token = yelp.accessToken(yelpKeys.clientId, yelpKeys.clientSecret)
	.then(response => {

		console.log(response.jsonBody.access_token);

	})
	// .catch(error => {

	// 	console.log("ERROR CONNETING TO YELP TOKEN: " + error);

	// });// close token var

	console.log("YELP TOKEN: ", token);



// CREATE CLIENT TOKEN
	var client = yelp.client(token);



// GET SEARCH TERMS FROM USER
	client.search({

		term: "Four Barrel Coffee",
		location: "san francisco, ca"

	}).then(response => {

		console.log(response.jsonBody.businesses[0].name);

	}).catch(error => {

		console.log("YELP SEARCH ERROR: ", error);

	});// close client search


