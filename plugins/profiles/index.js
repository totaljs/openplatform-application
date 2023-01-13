exports.icon = 'ti ti-totaljs';
exports.name = '@(Profiles)';
exports.position = 1;
exports.permissions = [{ id: 'profiles', name: 'Profiles' }];
exports.visible = user => user.sa || user.permissions.includes('profiles');
exports.routes = [
	{ url: '/profiles/{id}/', html: 'detail' }
];

exports.install = function() {

	// Profiles
	ROUTE('+API    /api/    -profiles    *Profiles   --> permissions list (response)');

};