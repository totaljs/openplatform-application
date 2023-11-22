NEWACTION('Setup/save', {
	name: 'Save configuration',
	permissions: 'setup',
	input: '*name,totalapi,$tms:Boolean,secret_tms,op_reqtoken,op_restoken',
	action: function($, model) {
		COPY(model, MAIN.db.config);
		LOADCONFIG(model);
		MAIN.db.save();
		$.success();
	}
});

NEWACTION('Setup/read', {
	name: 'Read configuration',
	permissions: 'setup',
	action: function($) {
		$.callback(MAIN.db.config);
	}
});

NEWACTION('Setup/account', {
	name: 'Read account data',
	action: async function($) {
		$.callback($.user.json ? $.user.json() : $.user);
	}
});