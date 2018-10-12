exports.install = function() {
	GROUP(['authorize'], function() {
		ROUTE('GET /api/logoff/', logoff);
	});
};

// Releases memory
function logoff() {
	var self = this;
	var session = MAIN.sessions[self.user.id];
	var keys = Object.keys(MAIN.sessions);
	for (var i = 0; i < keys.length; i++) {
		if (MAIN.sessions[keys[i]] === session)
			delete MAIN.sessions[keys[i]];
	}
	self.empty();
}