const USER = { id: 'admin', sa: true, name: 'Admin' };

AUTH(function($) {
	if (CONF.op_reqtoken && CONF.op_restoken)
		OpenPlatform.auth($);
	else
		$.success(USER);
});