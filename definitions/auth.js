// Initialization for each instance of OpenPlatform
// Checks if the OP is not blocked
OP.init = function(platform, next) {
	// Continue
	next();
};

// Total.js Authorization
AUTH(function($) {

	var op = $.query.openplatform;
	if (!op || op.length < 20) {
		$.invalid();
		return;
	}

	$.query.openplatform = undefined;

	var opt = {};
	opt.url = op;

	OP.users.auth(opt, function(err, user, type, cached, raw) {

		// type 0 : from session
		// type 1 : profile downloaded from OP without OP meta data
		// type 2 : profile downloaded from OP with meta data
		// cached : means that meta data of OP has been downloaded before this call

		// A simple hack for quick synchronization of the current user

		if (type) {
			user.filter.push(user.id);
			user.admin = user.sa || user.roles.indexOf('admin') !== -1;
		}

		if (user) {
			user.language && ($.req.$language = user.language);
			$.success(user);
		} else
			$.invalid();
	});
});
