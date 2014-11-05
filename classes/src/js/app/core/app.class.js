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
            this.ticker  = new APP.TOOLS.Ticker();
            this.browser = new APP.TOOLS.Browser({initial_triggers:['resize']});
            this.css     = new APP.TOOLS.Css();
            this.header  = new APP.COMPONENTS.Header();

            this.browser.on('resize',function(width,height)
            {
                console.log('resize : ' + width + ' x ' + height);
            });

            this.browser.on('scroll',function(direction,top,left)
            {
                console.log('scroll : ' + top + ' x ' + left);
            });

            this.browser.on('mouse_move',function(mouse)
            {
                console.log('mouse_move : ' + mouse.x + ' : ' + mouse.y);
            });
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            this.browser.start();
            this.ticker.start();
        }
    });
})(window);
