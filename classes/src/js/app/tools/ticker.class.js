(function(window)
{
    "use strict";

    APP.TOOLS.Ticker = APP.CORE.Event_Emitter.extend(
    {
        /**
         * SINGLETON
         */
        staticInstantiate:function()
        {
            if(APP.TOOLS.Ticker.prototype.instance === null)
                return null;
            else
                return APP.TOOLS.Ticker.prototype.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.running      = false;
            this.start_time   = 0;
            this.time         = 0;
            this.elapsed_time = 0;


            APP.TOOLS.Ticker.prototype.instance = this;
        },

        /**
         * START
         */
        start: function()
        {
            var that = this;

            this.start_time   = + (new Date());
            this.time         = 0;
            this.elapsed_time = 0;
            this.running      = true;

            var loop = function()
            {
                if(that.running)
                    window.requestAnimationFrame(loop);

                that.trigger('tick',[that.elapsed_time,that.time,that.start_time]);
            };

            loop();
        },

        /**
         * STOP
         */
        stop: function()
        {
            this.running = false;
        }
    });
})(window);
