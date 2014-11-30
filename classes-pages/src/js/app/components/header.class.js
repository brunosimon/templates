(function()
{
    'use strict';

    APP.COMPONENTS.Header = APP.CORE.Abstract.extend(
    {
        options :
        {

        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.browser       = new APP.TOOLS.Browser();
            this.mode_expanded = true;

            this.$.main  = $('header.main-header');
            this.$.about = this.$.main.find('a.about');
            this.$.back  = this.$.main.find('a.back');
            this.$.logo  = this.$.main.find('h1 a');

            this.init_events();
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            this.browser.on('scroll',function()
            {
                if(that.browser.top > 40)
                {
                    if(that.mode_expanded)
                    {
                        that.mode_expanded = false;
                        that.$.main.removeClass('expanded');
                    }
                }
                else
                {
                    if(!that.mode_expanded)
                    {
                        that.mode_expanded = true;
                        that.$.main.addClass('expanded');
                    }
                }
            });
        },

        /**
         * START
         */
        start: function()
        {

        }
    });
})();




