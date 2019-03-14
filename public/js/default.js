function resizelayout() {
	$('.scroller,.body').each(function() {

		var el = $(this);
		var m = el.attrd('margin');

		if (m)
			m = +m;
		else
			m = 0;

		el.css('height', WH - (el.offset().top + m));
		el.SETTER('viewbox', 'resize');
	});
}

function resizebody() {
	$('.body .scroller').each(function() {

		if (!this.offsetParent)
			return;

		var el = $(this);
		var m = el.attrd('margin');

		if (m)
			m = +m;
		else
			m = 0;

		el.css('height', WH - (el.offset().top + m));
		el.SETTER('viewbox', 'resize');
	});
}

ON('ready', resizelayout);
$(document).ready(resizelayout);

ON('component', function() {
	// Small delay
	setTimeout2('resize', resizebody, 500);
});

// Initializes
OP.init(function(err) {
	if (err) {
		document.body.innerHTML = '401';
		return;
	}
	ON('request', function() {
		// Sets cookie
		COOKIES.set('openplatform', OP.token, '5 days', 'lax');
	});
	SET('common.ready', true);
	SET('common.state', 'ready');
});

// Releases session
OP.on('close', function() {
	AJAX('GET /api/logoff/');
});

// Window is resized
OP.on('resize', function() {
	setTimeout2('resizelayout', resizelayout, 200);
});

// Toggles menu for mobile devices
OP.on('menu', function() {
	$('.mainmenu').tclass('mainmenu-visible');
});

FUNC.success = function(msg) {
	OP.snackbar(msg, 'success', 'OK');
};

FUNC.info = function(msg) {
	OP.snackbar(msg, 'info', 'OK');
};

FUNC.warning = function(msg) {
	OP.snackbar(msg, 'warning', 'OK');
};

FUNC.confirm = function(msg, buttons, callback) {
	OP.confirm(msg, buttons, callback);
};

FUNC.loading = function(visible, sleep) {
	OP.loading(visible, sleep);
};

FUNC.loading2 = function(visible) {
	OP.loading2(visible);
};