// for easy accessing
var App = App || {};

(function () {
	
	window.App = { 
		Models: {},
		Collections: {},
		Views: {},
		Helper: {}
	};
	
	App.Helper.template = function(id) {
		return _.template($('#' + id).html());
	}
	
})();