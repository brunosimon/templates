(function()
{
    'use strict';

    B.Components.App = B.Core.Abstract.extend(
    {
        options:
        {

        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.ticker   = new B.Tools.Ticker();
            this.browser  = new B.Tools.Browser();
            this.css      = new B.Tools.Css();
            this.keyboard = new B.Tools.Keyboard();
            this.mouse    = new B.Tools.Mouse();
            this.ga_tags  = new B.Tools.GA_Tags();
            this.header   = new B.Components.Header();

            this.ticker.on( 'tick', function( time )
            {
                // console.log( time );
            } );

            // this.keyboard.on( 'down', function( keycode, character )
            // {
            //     console.log( keycode );
            //     console.log( character );
            // } );

            // this.keyboard.on( 'up', function( keycode, character )
            // {
            //     console.log( keycode );
            //     console.log( character );
            // } );

            // this.browser.on( 'resize', function( viewport )
            // {
            //     console.log( 'resize : ', viewport );
            // } );

            // this.browser.on( 'scroll', function( viewport )
            // {
            //     console.log( 'scroll : ', viewport );
            // } );

            // this.mouse.on( 'down', function( position, target )
            // {
            //     console.log( 'position : ', position.ratio );
            // } );
        },

        /**
         * START
         */
        start : function()
        {
            var that = this;

            this.browser.start();
            this.ticker.start( true );
        }
    } );
} )();
