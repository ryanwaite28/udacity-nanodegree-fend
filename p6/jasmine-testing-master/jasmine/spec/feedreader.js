/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
        */
		
        it('Are Defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        }); 

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
        */
		
		it('Should Have a URL', function() {
			var feed;
			
			for(var i = 0; i < allFeeds.length; i++) {
				feed = allFeeds[i];
				
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
		});

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
        */
		
		it('Should Have a Name', function() {
			var feed;
			
			for(var i = 0; i < allFeeds.length; i++) {
				feed = allFeeds[i];
				
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');
			}
		});
    });


    /* TODO: Write a new test suite named "The menu" */
	
	describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
        */
		
		var bodyTag = $('body');
		var menuDiv = $('.menu');
		var menuIcon = $('.menu-icon-link');
		
		it('Should Be Hidden by Default', function() {
			expect(bodyTag.hasClass('menu-hidden')).toBe(true);
			
		});

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
        */
		
		it('Should Show When Icon is Clicked', function() {
			
			menuIcon.trigger('click');
			expect(bodyTag.hasClass('menu-hidden')).toBe(false);
			menuIcon.trigger('click');
			expect(bodyTag.hasClass('menu-hidden')).toBe(true);
			
		});
		
	});

    /* TODO: Write a new test suite named "Initial Entries" */
	
	describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */
		
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		
		it('Has at least 1 Entry', function(done) {
			var items = $('.feed').find('.entry');
			expect(items.length >= 1).toBe(true);
			done();
		});
		
	});
	
    /* TODO: Write a new test suite named "New Feed Selection" */
	
	describe('New Feed Selection', function() {
		
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
        */
		
		var feedCount = allFeeds.length;
		var before, after;
		
		beforeEach(function(done) {
			expect(feedCount >= 2).toBe(true);
			
			loadFeed(0, function() {
				before = $('.header-text').text() + $('.feed').find('.entry').text().replace(/ +/g, ' ');
				
				loadFeed(1, function() {
					after = $('.header-text').text() + $('.feed').find('.entry').text().replace(/ +/g, ' ');
					done();
				
				});
				
			});
			
			
			
		});
		
		it('Should Change Contents when Loaded', function(done) {
			expect(before != after).toBe(true);
			done();
		});
		
	});
}());