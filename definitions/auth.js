// Initialization for each instance of OpenPlatform
// Checks if the OP is not blocked
OP.init = function(platform, next) {
	// Continue
	next();
};

// Total.js Authorization
OP.auth(function($, user, type, cached) {

	// $      : AuthOptions
	// type 0 : from session
	// type 1 : profile downloaded from OP without OP meta data
	// type 2 : profile downloaded from OP with meta data
	// cached : means that meta data of OP has been downloaded before this call

	$.success(user);
});