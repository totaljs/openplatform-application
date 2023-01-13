NEWSCHEMA('Account', function(schema) {

	schema.action('read', {
		name: 'Read user account',
		action: function($) {
			$.callback($.user.json());
		}
	});

});