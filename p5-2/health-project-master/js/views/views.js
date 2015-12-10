// for easy accessing
var App = App || {};

(function () { 
	
	// New Food View
	App.Views.Food = Backbone.View.extend({
		
		tagName: 'li',
		className: 'selected-item',
		
		template: App.Helper.template('foodsListTemplate'),
		
		initialize: function() {
			this.model.on('destroy', this.remove, this);
		},
		
		events: {
			'click .delete': 'destroy'
		},
		
		destroy: function() {
			this.model.destroy();
		},
		
		remove: function() {
			if(this.$el.siblings().length === 0) {
				$('').show();
			}
			this.$el.remove();
		},
		
		render: function() {
			var template = this.template(this.model.toJSON());
			this.$el.html(template);
			return this;
		}
		
	});
	
	// Food Collection View
	App.Views.Foods = Backbone.View.extend({
		
		tagName: 'ul',
		className: 'user-list',
		
		initialize: function() {
			this.collection.on('add', this.addItem, this);
		},
		
		render: function() {
			this.collection.each(this.addItem, this);
			return this;
		},
		
		addItem: function(food) {
			var foodView = new App.Views.Food ({model: food});
			this.$el.append(foodView.render().el);
		}
		
	});
	
	// Add food View
	App.Views.AddFood = Backbone.View.extend({
		el: '#addFood',
		
		events: {
			'click #foodSubmit' : 'submit'
		},
		
		submit: function(e) {
			e.preventDefault();
			
			var newFoodName = $('#FoodName').text().toString();
			var newFoodCal = parseInt($('#FoodCal').text());
			
			if(isNaN(newFoodCal)) {
				return;
			}
			
			var food = new App.Models.Food({title: newFoodName, calories: newFoodCal}, {validate: true});
			this.collection.add(food);
			
			food.save();
			
		}
		
	});
	
	App.Views.Total = Backbone.View.extend({
		el: '#total',
		ell: '#totalNum',
		
		initialize: function() {
			this.render();
			this.collection.on('update', this.render, this);
		},
		
		render: function() {
			var total = 0;
			var totalNum = 0;
			var listItems = $("#user-list").children();
			var count = listItems.length;
			
			this.collection.each(function(elem) {
				total += parseInt(elem.get('calories'));
			}, this);
			
			for(var i = 0; i < listItems; i++) {
				totalNum++;
			}
			
			this.$el.text(total);
			
			return this;

		} 
		
	});
	
	App.Views.searchResults = Backbone.View.extend({
		element: {
			searchBtn: $('#searchBtn'),
			searchKey: $('#searchField'),
			searchFormAlert: $('#searchAlert')
		},
		
		initialize: function() {
			var self = this;
			this.element.searchBtn.on('click', function(e){
				e.preventDefault();
				
				var keyword = $.trim(self.element.searchKey.val()).toLowerCase();
				
				if(!keyword) {
					self.element.searchFormAlert.text('Not a Valid Keyword');
					return;
				}
				
				self.element.searchFormAlert.text('');
				
				self.getAjax(keyword);
				
			});
		},
		
		getAjax: function(keyword) {
			var self = this;
			var searchUL = $('.results-list');
			
			searchUL.html('');
			
			$.ajax({
				type: 'GET',
				dataType: 'json',
				cache: true,
				url: 'https://api.nutritionix.com/v1_1/search/' + keyword + '?results=0:10&fields=item_name,brand_name,item_id,nf_calories&appId=138d97a2&appKey=16dcfdb8ad18dd1af6382f5d2d0ea49d'
				
			}).done(function(data) {
				console.log(data);
				var food;
				var addBtn = $('#foodSubmit');
				var searchItemHTML = '';
				var results = data.hits;
				
				for(var i = 0; i < results.length; i++) {
					var result = data.hits[i];
					searchItemHTML += '<li class="searchItem">' + '<span class="searchName">' + result.fields.item_name + ', ' + result.fields.brand_name + '</span>' + '<br>' + '<span class="searchCal">' + result.fields.nf_calories + ' Cal. ' + '</span>' + '</li>';
				}
				
				searchUL.html(searchItemHTML);
				var searchItem = $('.searchItem');
				
				searchItem.on('click', function() {
					addBtn.prop('disabled', false)
					var name = $(this).find('.searchName').text();
					var cal = $(this).find('.searchCal').text();
					$('#FoodName').text(name);
					$('#FoodCal').text(cal);
				});
				
			})
		}
		
	});
	
})();