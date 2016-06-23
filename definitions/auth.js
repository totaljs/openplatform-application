F.onAuthorize = function(req, res, flags, callback ) {

	if (F.config['openplatform.testmode']) {
		// OPENPLATFORM.testuser([roles], [settings])
		return callback(true, OPENPLATFORM.testuser());
	}

	var user = OPENPLATFORM.session(req);
	callback(user ? true : false, user);
};