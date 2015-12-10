// for easy accessing
var App = App || {};

(function () {
	
	// Create Foods Collection 
	App.Collections.Foods = Backbone.Collection.extend({
		model: App.Models.Food,
		// Implement localstorage
		localStorage: new Backbone.LocalStorage('FoodsLocal')
	});
	
})();