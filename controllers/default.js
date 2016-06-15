exports.install = function() {
	F.route('/', view_index, ['authorize']);
};

function view_index() {
	var self = this;

	// self.user ===> openplatform user

	// OPENPLATFORM.getApplications(self.user.openplatform, self.user.id, function(err, response) {
	// 	console.log(err, response);
	// });

	// OPENPLATFORM.getUsers(self.user.openplatform, self.user.id, function(err, response) {
	// 	console.log(err, response);
	// });

	// OPENPLATFORM.notify(self.user.openplatform, self.user.id, 'A message for the user', function(err, response) {
	// 	console.log(err, response);
	// });

	// OPENPLATFORM.getInfo(self.user.openplatform, function(err, response) {
	// 	console.log(err, response);
	// });

	// OPENPLATFORM.serviceworker(self.user.openplatform, self.user.id, 'order', { custom: 'values' }, function(err, response) {
	// 	console.log(err, response);
	// });

	self.view('index');
}