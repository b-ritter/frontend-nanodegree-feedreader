$(function() {

    describe('RSS Feeds', function() {
        // Tests to make sure that the
        // allFeeds variable has been defined and that it is not
        // empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //  A test that loops through each feed
        //  in the allFeeds object and ensures it has a URL defined
        //  and that the URL is not empty.
        //
        it('have defined urls', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });

        //  A test that loops through each feed
        //  in the allFeeds object and ensures it has a name defined
        //  and that the name is not empty.
        it('have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });

    // A test suite named "The menu"
    describe('The Menu', function() {
        
        var body = $('body'),
            menuIcon = $('.menu-icon-link');

        //  Ensures the menu element is
        //  hidden by default.
        it ('is hidden by default', function(){
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // Tests visibility of menu after clicking
        describe('Clicking the menu', function(){
            //  Start the test off by triggering a click event
            //  on the menu  
            beforeEach(function(){
                menuIcon.click();
            });

            //  Ensures the menu becomes visible
            //  when the menu icon is clicked for the first time 
            it ('shows the menu on click', function() {
                expect(body.hasClass('menu-hidden')).toBe(false);
            }); 

            // beforeEach triggers another click on the menu
            // to test if it is hidden after a second click
            it ('hides the menu again', function() {
                expect(body.hasClass('menu-hidden')).toBe(true);
            });
        });
    });
    

    //  A new test suite named "Initial Entries"
    describe('Initial Entries', function(){
        var feed = $('.feed'),
            initialFeedContent;

        beforeEach(function(done){
            loadFeed(0, done);
        });

        //A test that ensures when the loadFeed
        //function is called and completes its work, there is at least
        //a single .entry element within the .feed container.
        it ('has at least one entry', function(done){
            // Load and store the content first set of RSS feed entries for
            // comparison in 'actually has new content' spec
            initialFeedContent = feed.find('.entry h2').map(function(){
                return this.innerHTML;
            });

            // If there is at least one entry in the .feed container
            // we pass the test
            expect(initialFeedContent.length).toBeGreaterThan(0);

            done();
        });

        //  A new test suite named "New Feed Selection" 
        //  Requires initialFeedContent from outside scope
        describe('New Feed Selection', function(){
            // Get the number of feeds available from the menu
            var numberOfFeeds = $('.feed-list').find('a').length;

            beforeEach(function(done){
                // Clear out the exisiting feeds from the DOM
                feed.empty();

                // Assuming feed 0 is loaded, choose a random feed from those remaining
                var randomFeed = Math.floor( 1 + Math.random() * (numberOfFeeds - 1) );

                // Load a new random feed
                loadFeed(randomFeed, done);
            });

            //A test that ensures when a new feed is loaded
            //by the loadFeed function that the content actually changes.
            it ('actually has new content', function(done){
                // Now that the content has loaded, map it to a new collection
                // which we will compare to the initialFeedContent
                var newFeedContent = feed.find('.entry h2').map(function(){
                        return this.innerHTML;
                    });

                // The comparison happens here
                newFeedContent.each(function(index){
                    expect(newFeedContent[index]).not.toEqual(initialFeedContent[index]);
                });
              
                done();
            });
        });
    });
}());
