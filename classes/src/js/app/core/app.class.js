(function()
{
    'use strict';

    App.Core.App = App.Core.Abstract.extend(
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

            this.ticker   = new App.Tools.Ticker();
            this.browser  = new App.Tools.Browser();
            this.css      = new App.Tools.Css();
            this.keyboard = new App.Tools.Keyboard();
            this.mouse    = new App.Tools.Mouse();
            this.ga_tags  = new App.Tools.GA_Tags();
            this.header   = new App.Components.Header();

            this.keyboard.on( 'down', function( keycode, character )
            {
                console.log( keycode );
                console.log( character );
            } );

            this.keyboard.on( 'up', function( keycode, character )
            {
                console.log( keycode );
                console.log( character );
            } );

            this.browser.on( 'resize', function( viewport )
            {
                console.log( 'resize : ', viewport );
            } );

            this.browser.on( 'scroll', function( viewport )
            {
                console.log( 'scroll : ', viewport );
            } );

            this.mouse.on( 'down', function( position, target )
            {
                console.log( 'position : ', position.ratio );
            } );
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
