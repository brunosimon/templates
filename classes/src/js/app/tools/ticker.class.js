(function()
{
    "use strict";

    App.Tools.Ticker = App.Core.Event_Emitter.extend(
    {
        /**
         * SINGLETON
         */
        staticInstantiate : function()
        {
            if( App.Tools.Ticker.prototype.instance === null )
                return null;
            else
                return App.Tools.Ticker.prototype.instance;
        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super(options);

            this.started      = false;
            this.running      = false;
            this.start_time   = 0;
            this.time         = 0;
            this.elapsed_time = 0;

            App.Tools.Ticker.prototype.instance = this;
        },

        /**
         * START
         */
        start : function(auto_run)
        {
            var that = this;

            this.started      = true;
            this.start_time   = + ( new Date() );
            this.time         = 0;
            this.elapsed_time = 0;

            if(auto_run)
                this.run();
        },

        /**
         * RUN
         */
        run : function()
        {
            var that     = this;
            this.running = true;

            var loop = function()
            {
                if(that.running)
                    window.requestAnimationFrame( loop );

                that.tick();
            };

            loop();
        },

        /**
         * STOP
         */
        stop : function()
        {
            this.running = false;
        },

        /**
         * TICK
         */
        tick : function()
        {
            if(!this.started)
                this.start();

            this.time         = + ( new Date() );
            this.delta        = this.time - this.start_time - this.elapsed_time;
            this.elapsed_time = this.time - this.start_time;

            this.trigger( 'tick', [ this.elapsed_time, this.time, this.start_time ] );
        }
    });
})();
