COMPONENT('exec', function(self, config) {
	self.readonly();
	self.blind();
	self.make = function() {
		self.event('click', config.selector || '.exec', function(e) {
			var el = $(this);

			var attr = el.attrd('exec');
			var path = el.attrd('path');
			var href = el.attrd('href');
			var def = el.attrd('def');
			var reset = el.attrd('reset');

			if (el.attrd('prevent') === 'true') {
				e.preventDefault();
				e.stopPropagation();
			}

			attr && EXEC(attr, el, e);
			href && NAV.redirect(href);
			def && DEFAULT(def);
			reset && RESET(reset);

			if (path) {
				var val = el.attrd('value');
				if (val) {
					var v = GET(path);
					SET(path, new Function('value', 'return ' + val)(v), true);
				}
			}
		});
	};
});

COMPONENT('part', 'hide:true', function(self, config) {

	var init = false;
	var clid = null;

	self.readonly();
	self.setter = function(value) {

		if (config.if !== value) {
			config.hidden && !self.hclass('hidden') && EXEC(config.hidden);
			config.hide && self.aclass('hidden');
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		config.hide && self.rclass('hidden');

		if (self.element[0].hasChildNodes()) {

			if (clid) {
				clearTimeout(clid);
				clid = null;
			}

			config.reload && EXEC(config.reload);
			config.default && DEFAULT(config.default, true);

		} else {
			FUNC.loading(true);
			setTimeout(function() {
				self.import(config.url, function() {
					if (!init) {
						config.init && EXEC(config.init);
						init = true;
					}
					config.reload && EXEC(config.reload);
					config.default && DEFAULT(config.default, true);
					FUNC.loading(false, 500);
				});
			}, 10);
		}
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'if':
				config.if = value + '';
				break;
		}
	};

	self.clean = function() {
		if (self.hclass('hidden')) {
			config.clean && EXEC(config.clean);
			setTimeout(function() {
				self.empty();
				init = false;
				clid = null;
				setTimeout(FREE, 1000);
			}, 1000);
		}
	};
});

COMPONENT('importer', function(self, config) {

	var init = false;
	var clid = null;
	var content = '';

	self.readonly();

	self.make = function() {
		var scr = self.find('script');
		content = scr.length ? scr.html() : '';
	};

	self.reload = function(recompile) {
		config.reload && EXEC(config.reload);
		recompile && COMPILE();
	};

	self.setter = function(value) {

		if (config.if !== value) {
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		if (clid) {
			clearTimeout(clid);
			clid = null;
		}

		if (init) {
			self.reload();
			return;
		}

		init = true;

		if (content) {
			self.html(content);
			setTimeout(self.reload, 50, true);
		} else
			self.import(config.url, self.reload);
	};

	self.clean = function() {
		config.clean && EXEC(config.clean);
		setTimeout(function() {
			self.empty();
			init = false;
			clid = null;
		}, 1000);
	};
});

COMPONENT('viewbox', 'margin:0;scroll:true', function(self, config) {

	var eld;

	self.readonly();

	self.init = function() {
		OP.on('resize', function() {
			SETTER('viewbox', 'resize');
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				eld.tclass('hidden', !value);
				break;
			case 'scroll':
				self.tclass('ui-viewbox-scroll', !!value);
				break;
		}
	};

	self.make = function() {
		self.element.prepend('<div class="ui-viewbox-disabled hidden"></div>');
		eld = self.find('> .ui-viewbox-disabled').eq(0);
		self.aclass('ui-viewbox ui-viewbox-hidden');
		self.resize();
	};

	self.resize = function() {
		var el = config.selector ? self.element.closest(config.selector) : self.parent();
		var h = ((el.height() / 100) * config.height) - config.margin;
		eld.css({ height: h, width: self.element.width() });
		self.css('height', h);
		self.element.SETTER('*', 'resize');
		var cls = 'ui-viewbox-hidden';
		self.hclass(cls) && self.rclass(cls, 100);
	};

});

COMPONENT('navigation', function(self, config) {

	var current, items, skip;
	var clss = 'ui-navigation-show';
	var clsc = 'ui-navigation-selected';
	var clsi = '.ui-navigation-item';
	var clsl = 'ui-navigation-link';

	self.readonly();

	self.make = function() {

		self.aclass('ui-navigation');

		self.event('click', '.' + clsl, function() {

			var el = $(this);
			var parent = el.parent();

			if (el.hclass('ui-navigation-children')) {
				parent.tclass(clss);
			} else {
				current && current.rclass(clsc);
				current = parent;

				var tmp = parent.parent().closest(clsi);

				while (true) {
					if (tmp.length) {
						tmp.aclass(clss);
						tmp = tmp.parent().closest(clsi);
					} else
						break;
				}

				parent.aclass(clsc);
				!skip && self.set(current.attrd('id'));
			}
		});

		self.datasource(config.datasource, function(path, value) {

			if (!value || !value.length)
				return;

			items = {};

			// Root
			var render = function(children, level) {

				var builder = [];

				for (var i = 0; i < children.length; i++) {

					var item = children[i];
					var childs = item.children && item.children.length;
					var o = '<div class="ui-navigation-item ui-navigation-level-{0}{1}" title="{2}" data-id="{3}">'.format(level, childs && (item.collapsed != null && !item.collapsed) ? (' ' + clss) : '', item.title, item.id);
					o += '<span class="ui-navigation-link{1}"><i class="fa{2}"></i>{0}</span>'.format(item.name, childs ? ' ui-navigation-children' : '', childs ? '' : (item.icon ? (' fa-' + item.icon) : 'fa-file-o'));

					if (childs) {
						item.children.quicksort('treeorder');
						o += '<div class="ui-navigation-level">';
						o += render(item.children, level + 1);
						o += '</div>';
					} else
						items[item.id] = item;

					o += '</div>';
					builder.push(o);
				}

				return builder.join('');
			};

			current = null;
			self.html(render(value, 0));
			config.autoselect && self.find('.ui-navigation-item:first-child').eq(0).find('.' + clsl).trigger('click');
		});
	};

	self.setter = function(value) {
		if (value) {
			skip = true;
			self.find('.ui-navigation-item[data-id="{0}"]'.format(value)).find('span.' + clsl).trigger('click');
			skip = false;
		}
	};
});