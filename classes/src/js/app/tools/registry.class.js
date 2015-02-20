(function()
{
    'use strict';

    B.Tools.Registry = B.Core.Abstract.extend(
    {
        /**
         * STATIC INSTANTIATE (SINGLETON)
         */
        static_instantiate : function()
        {
            if( B.Tools.Registry.prototype.instance === null )
                return null;
            else
                return B.Tools.Registry.prototype.instance;
        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.items = {};

            B.Tools.Registry.prototype.instance = this;
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
