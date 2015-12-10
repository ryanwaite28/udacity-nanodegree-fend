// for easy accessing
var App = App || {};

(function () { 
	
	//New Food Item Model
	App.Models.Food = Backbone.Model.extend({
		
		defaults: {
			title: '',
			calories: 0
		},
		
		validate: function(attrs) {
			if(! $.trim(attrs.title)) {
				return 'Name Required';
			}
			if(! $.trim(attrs.calories)) {
				return 'Calories Required';
			}
		}
		
	});
	
})();