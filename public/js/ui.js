COMPONENT('exec', function(self, config) {
	self.readonly();
	self.blind();
	self.make = function() {

		var scope = null;

		var scopepath = function(el, val) {
			if (!scope)
				scope = el.scope();
			return scope ? scope.makepath ? scope.makepath(val) : val.replace(/\?/g, el.scope().path) : val;
		};

		var fn = function(plus) {
			return function(e) {

				var el = $(this);
				var attr = el.attrd('exec' + plus);
				var path = el.attrd('path' + plus);
				var href = el.attrd('href' + plus);
				var def = el.attrd('def' + plus);
				var reset = el.attrd('reset' + plus);

				scope = null;

				if (el.attrd('prevent' + plus) === 'true') {
					e.preventDefault();
					e.stopPropagation();
				}

				if (attr) {
					if (attr.indexOf('?') !== -1)
						attr = scopepath(el, attr);
					EXEC(attr, el, e);
				}

				href && NAV.redirect(href);

				if (def) {
					if (def.indexOf('?') !== -1)
						def = scopepath(el, def);
					DEFAULT(def);
				}

				if (reset) {
					if (reset.indexOf('?') !== -1)
						reset = scopepath(el, reset);
					RESET(reset);
				}

				if (path) {
					var val = el.attrd('value');
					if (val) {
						if (path.indexOf('?') !== -1)
							path = scopepath(el, path);
						var v = GET(path);
						SET(path, new Function('value', 'return ' + val)(v), true);
					}
				}
			};
		};

		self.event('dblclick', config.selector2 || '.exec2', fn('2'));
		self.event('click', config.selector || '.exec', fn(''));
	};
});

COMPONENT('part', 'hide:true', function(self, config) {

	var init = false;
	var clid = null;
	var downloading = false;

	self.releasemode && self.releasemode('true');
	self.readonly();

	self.setter = function(value) {

		if (config.if !== value) {

			if (!self.hclass('hidden')) {
				config.hidden && EXEC(config.hidden);
				config.hide && self.aclass('hidden');
				self.release(true);
			}

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

			self.release(false);
			config.reload && EXEC(config.reload);
			config.default && DEFAULT(config.default, true);

			setTimeout(function() {
				self.element.SETTER('*', 'resize');
			}, 200);

		} else {

			if (downloading)
				return;

			SETTER('loading', 'show');
			downloading = true;
			setTimeout(function() {
				self.import(config.url, function() {
					downloading = false;

					if (!init) {
						config.init && EXEC(config.init);
						init = true;
					}

					self.release(false);
					config.reload && EXEC(config.reload);
					config.default && DEFAULT(config.default, true);
					SETTER('loading', 'hide', 500);

					setTimeout(function() {
						self.element.SETTER('*', 'resize');
					}, 200);
				});
			}, 200);
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

COMPONENT('viewbox', 'margin:0;scroll:true;delay:100;scrollbar:false;visibleY:true', function(self, config) {

	var eld, elb;
	var scrollbar;
	var cls = 'ui-viewbox';
	var cls2 = '.' + cls;
	var sw = SCROLLBARWIDTH();

	self.readonly();

	self.init = function() {
		var obj;
		if (W.OP)
			obj = W.OP;
		else
			obj = $(W);
		obj.on('resize', function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'viewbox' && com.dom.offsetParent && com.$ready && !com.$removed)
					com.resize();
			}
		});
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				eld.tclass('hidden', !value);
				break;
			case 'minheight':
				!init && self.resize();
				break;
			case 'selector': // backward compatibility
				config.parent = value;
				self.resize();
				break;
		}
	};

	self.scrollbottom = function(val) {
		if (val == null)
			return elb[0].scrollTop;
		elb[0].scrollTop = (elb[0].scrollHeight - self.dom.clientHeight) - (val || 0);
		return elb[0].scrollTop;
	};

	self.scrolltop = function(val) {
		if (val == null)
			return elb[0].scrollTop;
		elb[0].scrollTop = (val || 0);
		return elb[0].scrollTop;
	};

	self.make = function() {
		config.scroll && MAIN.version > 17 && self.element.wrapInner('<div class="ui-viewbox-body"></div>');
		self.element.prepend('<div class="ui-viewbox-disabled hidden"></div>');
		eld = self.find('> .{0}-disabled'.format(cls)).eq(0);
		elb = self.find('> .{0}-body'.format(cls)).eq(0);
		self.aclass('{0} {0}-hidden'.format(cls));
		if (config.scroll) {
			if (config.scrollbar) {
				if (MAIN.version > 17) {
					scrollbar = window.SCROLLBAR(self.find(cls2 + '-body'), { visibleY: config.visibleY, visibleX: config.visibleX, parent: self.element });
					self.scrolltop = scrollbar.scrollTop;
					self.scrollbottom = scrollbar.scrollBottom;
				} else
					self.aclass(cls + '-scroll');
			} else {
				self.aclass(cls + '-scroll');
				sw && self.find(cls2 + '-body').css('padding-right', sw);
			}
		}
		self.resize();
	};

	self.released = function(is) {
		!is && self.resize();
	};

	var css = {};

	self.resize = function() {

		if (self.release())
			return;

		var el = config.parent ? config.parent === 'window' ? $(window) : self.element.closest(config.parent) : self.parent();
		var h = el.height();
		var w = el.width();

		if (h === 0 || w === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		h = ((h / 100) * config.height) - config.margin;


		if (config.minheight && h < config.minheight)
			h = config.minheight;

		css.height = h;
		css.width = self.element.width();
		eld.css(css);

		css.width = null;
		self.css(css);

		if (config.scroll && !config.scrollbar)
			css.width = w + sw;

		elb.length && elb.css(css);
		self.element.SETTER('*', 'resize');
		var c = cls + '-hidden';
		self.hclass(c) && self.rclass(c, 100);

		if (scrollbar)
			scrollbar.resize();
	};

	self.setter = function() {
		setTimeout(self.resize, config.delay);
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