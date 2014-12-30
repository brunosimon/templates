(function()
{
    "use strict";

    APP.TOOLS.Keyboard = APP.CORE.Event_Emitter.extend(
    {
        /**
         * SINGLETON
         */
        staticInstantiate:function()
        {
            if( APP.TOOLS.Keyboard.prototype.instance === null )
                return null;
            else
                return APP.TOOLS.Keyboard.prototype.instance;
        },

        /**
         * INIT
         */
        init: function( options )
        {
            this._super( options );

            this.ticker        = new APP.TOOLS.Ticker();
            this.browser       = new APP.TOOLS.Browser();
            this.shall_trigger = {};
            this.downs         = [];

            this.init_events();

            APP.TOOLS.Keyboard.prototype.instance = this;
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Ticker
            this.ticker.on( 'tick', function()
            {
                that.frame();
            } );

            // Down
            window.onkeydown = function( e )
            {
                var character = that.keycode_to_character( e.keyCode );

                if( that.downs.indexOf( character ) === -1 )
                    that.downs.push( character );

                that.shall_trigger.down = character;
            };

            // Up
            window.onkeyup = function( e )
            {
                var character = that.keycode_to_character( e.keyCode );

                if( that.downs.indexOf( character ) !== -1 )
                    that.downs.splice( that.downs.indexOf( character ), 1 );

                that.shall_trigger.up = character;
            };
        },

        /**
         * KEYCODE TO CHAR
         */
        keycode_to_character: function( keycode )
        {
            var character = null;

            switch( keycode )
            {
                // CMD
                case 91 :
                    character = 'cmd';
                    break;

                // CTRL
                case 17 :
                    character = 'ctrl';
                    break;

                // Default
                default :
                    character = String.fromCharCode( keycode ).toLowerCase();
                    break;
            }

            return character;
        },

        /**
         * ARE DOWN
         */
        are_down: function( keys )
        {
            var down = !!keys.length;

            for( var i = 0; i < keys.length; i++ )
            {
                // console.log(this.downs.indexOf( keys[ i ] ));
                if( this.downs.indexOf( keys[ i ] ) === -1 )
                    down = false;
            }

            return down;
        },

        /**
         * FRAME
         */
        frame: function()
        {
            var keys = Object.keys(this.shall_trigger);
            for( var i = 0; i < keys.length; i++ )
                this.trigger( keys[ i ] , [ this.shall_trigger[ keys[ i ]  ] ] );

            if( keys.length )
                this.shall_trigger = {};
        }
    });
})();
