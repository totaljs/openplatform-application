NEWSCHEMA('Setup', function(schema) {

	schema.define('name', String, true);
	schema.define('totalapi', String);
	schema.define('allow_tms', Boolean);
	schema.define('secret_tms', String);
	schema.define('op_reqtoken', String);
	schema.define('op_restoken', String);

	schema.action('save', {
		name: 'Save configuration',
		permissions: 'setup',
		action: function($, model) {
			COPY(model, MAIN.db.config);
			LOADCONFIG(model);
			MAIN.db.save();
			$.success();
		}
	});

	schema.action('read', {
		name: 'Read configuration',
		permissions: 'setup',
		action: function($) {
			$.callback(MAIN.db.config);
		}
	});

	schema.action('account', {
		name: 'Read account data',
		permissions: 'setup',
		action: async function($) {
			$.callback($.user.json ? $.user.json() : $.user);
		}
	});

});