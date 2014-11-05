(function(window)
{
    'use strict';

    APP.CORE.App = APP.CORE.Abstract.extend(
    {
        options:
        {

        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.page    = null;
            this.browser = new APP.TOOLS.Browser();
            this.css     = new APP.TOOLS.Css();
            this.header  = new APP.COMPONENTS.Header();

            this.init_events();
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            this.browser.start();

            window.setTimeout(function()
            {
                that.browser.trigger('resize');
            },300);
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;
        },

        /**
         * FRAME
         */
        frame: function()
        {
            this.browser.frame();
        }
    });
})(window);
