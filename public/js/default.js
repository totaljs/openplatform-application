UPTODATE('1 hour', function() {
	return !document.hasFocus();
});

function resizelayout() {
	var h = $(window).height();
	$('.scroller').each(function() {
		var el = $(this);
		var m = el.attrd('margin');

		if (m)
			m = +m;
		else
			m = 0;

		el.css('height', h - (el.offset().top + m));
	});
}

ON('ready', resizelayout);
$(document).ready(resizelayout);

OP.on('resize', resizelayout);

OP.init(function(err) {
	if (err) {
		document.body.innerHTML = '401';
		return;
	}
	SET('common.ready', true);
	SET('common.state', 'ready');
});

OP.on('menu', function() {
	$('.mainmenu').tclass('mainmenu-visible');
});

FUNC.success = function(msg) {
	OP.snackbar(msg, 'success', 'OK');
};

FUNC.warning = function(msg) {
	OP.snackbar(msg, 'warning', 'OK');
};

FUNC.loading = function(visible) {
	OP.loading(visible);
};