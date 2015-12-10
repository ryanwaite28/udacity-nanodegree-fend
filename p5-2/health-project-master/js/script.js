// question alert
function Info() { 
	alert("You can search literally, any. kind. of. food! Restaurants, Grocery Items, Ingridients, you name it! just type it in and hit search!");
}

// for easy accessing
var App = App || {};

(function () {
	
	var foodList = new App.Collections.Foods([]);
	foodList.fetch();
	new App.Views.AddFood({collection: foodList});
	var foodListView = new App.Views.Foods({collection: foodList});
	new App.Views.Total({collection: foodList});
	new App.Views.searchResults();
	
	$(".foodsList").html(foodListView.render().el);
	
})();