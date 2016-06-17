exports.install = function() {
	F.route('/widgets/chartjs/', json_chartjs);
	F.route('/widgets/svg/', svg_image);
};

function json_chartjs() {
	var self = this;
	var openplatform = self.openplatform();

	if (openplatform.empty || (openplatform.secret && openplatform.secret !== CONFIG('openplatform.secret')))
		return self.throw404();

	// openplatform.openplatform   --> openplatform URL
	// openplatform.user           --> user id

	// Chart data:
	// http://www.chartjs.org/docs/
	var data = {
		labels: ['Red', 'Blue', 'Yellow'],
		datasets: [
			{
				data: [300, 50, 100],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}
		]
	};

	self.json({ type: 'doughnut', data: data });
}

function svg_image() {
	var self = this;
	var openplatform = self.openplatform();
	if (openplatform.empty || (openplatform.secret && openplatform.secret !== CONFIG('openplatform.secret')))
		return self.throw404();

	// openplatform.openplatform   --> openplatform URL
	// openplatform.user           --> user id
	self.content('<svg width="400" height="250"><rect x="0" y="0" width="100" height="100" fill="blue" /></svg>', U.getContentType('svg'));
}