NEWSCHEMA('Products', function(schema) {

	schema.action('list', {
		name: 'List of products',
		permissions: 'products',
		action: function($) {

			var arr = [];
			for (var i = 0; i < 5; i++)
				arr.push(GUID());

			$.callback(arr);
		}
	});

});