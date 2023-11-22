exports.install = function() {
	ROUTE('+GET /*', index);
};

function index($) {

	var plugins = [];

	for (var key in F.plugins) {
		var item = F.plugins[key];
		if ($.user.sa || !item.visible || item.visible($.user)) {
			var obj = {};
			obj.id = item.id;
			obj.routes = item.routes;
			obj.position = item.position;
			obj.name = TRANSLATE($.user.language || '', item.name);
			obj.icon = item.icon;
			obj.import = item.import;
			obj.hidden = item.hidden;
			plugins.push(obj);
		}
	}

	plugins.quicksort('position');
	$.view('index', plugins);
}