AUTH(function(req, res, flags, next) {

	var op = req.query.openplatform;

	if (!op || op.length < 20) {
		next(false);
		return;
	}

	var id = op.hash();

	if (MAIN.sessions[id] && MAIN.sessions[id].nextreload > NOW) {
		next(true, MAIN.sessions[id]);
		return;
	}

	RESTBuilder.make(function(builder) {
		builder.url(op);
		builder.exec(function(err, user) {
			if (user.id) {
				var tmp = user.profile;
				tmp.expire = NOW.add('1 day');
				tmp.openplatformid = user.openplatformid;
				tmp.sessions = 0;
				MAIN.sessions[tmp.id] = tmp;
				MAIN.sessions[id] = tmp;
				tmp.nextreload = NOW.add('5 minutes');
			} else
				next(false);

		});
	});

});

// Clears expired sessions
ON('service', function(counter) {

	// Each 10 minutes
	if (counter % 10 !== 0)
		return;

	var keys = Object.keys(MAIN.sessions);
	for (var i = 0; i < keys.length; i++) {
		var session = MAIN.sessions[keys[i]];
		if (session.expire < NOW)
			delete MAIN.sessions[keys[i]];
	}
});
