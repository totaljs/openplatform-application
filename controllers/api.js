exports.install = function() {

	ROUTE('+API  /api/    -account             *Account   --> read');
	ROUTE('+API  /api/    -tasks               *Tasks     --> list');
	ROUTE('+API  /api/    -tasks_read/{id}     *Tasks     --> read');

};
