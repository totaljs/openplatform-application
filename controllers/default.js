exports.install = function() {
	ROUTE('/*', ['authorize']);
};
