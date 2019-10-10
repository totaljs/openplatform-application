OP.init(function(err, meta) {

	if (err) {
		document.body.innerHTML = '401: <b>Unauthorized</b>';
		return;
	}

	DEF.dateformat = user.dateformat = meta.dateformat;
	user.timeformat = meta.timeformat;
	user.numberformat = meta.numberformat;

	switch (meta.numberformat) {
		case 1: // 1 000.12
			DEF.decimalseparator = '.';
			DEF.thousandsseparator = ' ';
			break;
		case 2: // 1 000,12
			DEF.decimalseparator = ',';
			DEF.thousandsseparator = ' ';
			break;
		case 3: // 1.000,12
			DEF.decimalseparator = ',';
			DEF.thousandsseparator = '.';
			break;
		case 4: // 1,000.12
			DEF.decimalseparator = '.';
			DEF.thousandsseparator = ',';
			break;
	}

	ENV('date', user.dateformat);

	var tokenize = function(opt) {
		if (opt.url && opt.url.lastIndexOf('.html') === -1)
			opt.url = OP.tokenizator(opt.url);
	};

	// Adds auth-token to each request
	ON('request', tokenize);
	SET('common.ready', true, 500);
});
