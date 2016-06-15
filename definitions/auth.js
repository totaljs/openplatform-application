F.onAuthorize = function(req, res, flags, callback ) {
	var user = OPENPLATFORM.session(req);
	callback(user ? true : false, user);
};