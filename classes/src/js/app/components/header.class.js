(function()
{
    'use strict';

    B.Components.Header = B.Core.Abstract.extend(
    {
        options :
        {

        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.$.main = document.querySelector('header');

            this.init_events();
        },

        /**
         * INIT EVENTS
         */
        init_events : function()
        {
            var that = this;
        },

        /**
         * START
         */
        start : function()
        {

        }
    } );
} )();




