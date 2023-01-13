NEWSCHEMA('Profiles', function(schema) {

	schema.action('permissions', {
		name: 'Check permissions',
		action: function($) {

			if (!UNAUTHORIZED($, 'profiles'))
				$.success();

		}
	});

	schema.action('list', {
		name: 'List of profiles',
		action: function($) {

			var arr = [];
			for (var i = 0; i < 5; i++)
				arr.push(GUID());

			$.callback(arr);
		}
	});

});