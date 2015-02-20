(function()
{
    "use strict";

    App.Tools.Registry = App.Core.Abstract.extend(
    {
        /**
         * SINGLETON
         */
        staticInstantiate : function()
        {
            if( App.Tools.Registry.prototype.instance === null )
                return null;
            else
                return App.Tools.Registry.prototype.instance;
        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.items = {};

            App.Tools.Registry.prototype.instance = this;
        },

        /**
         * GET
         */
        get : function( key )
        {
            if( this.items[ key ] )
                return this.items[ key ];

            return false;
        },

        /**
         * SET
         */
        set : function( key, value )
        {
            this.items[ key ] = value;

            return value;
        }
    } );
} )();
