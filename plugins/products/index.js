exports.icon = 'ti ti-box';
exports.name = '@(Products)';
exports.position = 1;
exports.permissions = [{ id: 'products', name: 'Products' }];
exports.visible = user => user.sa || user.permissions.includes('products');
// exports.hidden = true; // hides item in the menue
exports.routes = [
	{ url: '/products/{id}/', html: 'detail' }
];

exports.install = function() {

	// Profiles
	ROUTE('+API    /api/    -products    *Products   --> list');

};