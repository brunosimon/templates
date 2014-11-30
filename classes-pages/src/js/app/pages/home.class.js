(function()
{
    "use strict";

    APP.PAGES.Home = APP.PAGES.Page.extend(
    {
        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.browser  = new APP.TOOLS.Browser();
            this.images   = new APP.TOOLS.Images();
            this.name     = 'home';
            this.time     = + new Date();

            this.load();
            this.init_events();
        },

        /**
         * LOAD
         */
        load: function()
        {
            var that = this;

            this.trigger('loaded',[(+ new Date()) - this.time]);
        },

        /**
         * START
         */
        start: function()
        {

        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Resize
            this.browser.on('resize.home',function()
            {

            });
        },

        /**
         * DESTROY
         */
        destroy: function()
        {
            this.browser.off('resize.home');
        }
    });
})();
