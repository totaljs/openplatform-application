// Initialization for each instance of OpenPlatform
// Checks if the OP is not blocked
OP.init = function(platform, next) {
	// Continue
	next();
};

OP.auth(function($, user, type, cached, raw) {

	// @$ {AuthOptions}
	// @user {Object} A user profile
	// @type {Number} 0: from session, 1: downloaded without meta, 2: downloaded with meta
	// @cached {Boolean} Means that meta data of OP has been downloaded before this call
	// @raw {Object} A raw downloaded data

	// Continue
	$.success(user);
});