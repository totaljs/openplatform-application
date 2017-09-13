exports.install = function() {
	ROUTE('/');

	// Server-Side verification
	ROUTE('/verify/', json_verify);
};

function json_verify() {
	// Server-Side verification for OpenPlatform meta-data
	var self = this;

	if (!self.query.url)
		return self.invalid().push('Invalid URL address.');

	var builder = new RESTBuilder(self.query.url);
	builder.exec(function(err, response) {
		if (err)
			self.invalid().push(err);
		else
			self.json(response);
	});
}