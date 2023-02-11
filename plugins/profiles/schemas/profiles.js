NEWSCHEMA('Profiles', function(schema) {

	schema.action('list', {
		name: 'List of profiles',
		permissions: 'profiles',
		action: function($) {

			var arr = [];
			for (var i = 0; i < 5; i++)
				arr.push(GUID());

			$.callback(arr);
		}
	});

});