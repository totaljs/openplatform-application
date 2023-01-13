NEWSCHEMA('Tasks', function(schema) {

	schema.action('list', {
		name: 'List of tasks',
		action: function($) {

			if (UNAUTHORIZED($, 'read'))
				return;

			NOSQL('tasks').find().callback($.callback);
		}
	});

	schema.action('read', {
		name: 'Read task',
		params: '*id:UID',
		action: function($) {

			if (UNAUTHORIZED($, 'read'))
				return;

			var params = $.params;
			NOSQL('tasks').one().id(params.id).error('@(Task not found)').callback($.callback);
		}
	});

});