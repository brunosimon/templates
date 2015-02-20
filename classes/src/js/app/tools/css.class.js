(function()
{
    'use strict';

    B.Tools.Css = B.Core.Abstract.extend(
    {
        /**
         * STATIC INSTANTIATE (SINGLETON)
         */
        static_instantiate : function()
        {
            if( B.Tools.Css.prototype.instance === null )
                return null;
            else
                return B.Tools.Css.prototype.instance;
        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super( options );

            this.prefixes = [ 'webkit', 'moz', 'o', 'ms', '' ];
            this.browser  = new B.Tools.Browser();

            B.Tools.Css.prototype.instance = this;
        },

        /**
         * AppLY
         */
        apply : function( $target, property, value )
        {
            // Force array
            if( typeof $target.length === 'undefined' )
            {
                // console.log('ok');
                $target = [ $target ];
            }

            // Remove translateZ if necessary
            if( this.browser.is.IE && this.browser.version < 10 )
                value = value.replace( 'translateZ(0)', '' );

            // Add prefix
            for( var css = {}, i = 0, i_len = this.prefixes.length; i < i_len; i++ )
            {
                var updated_property = this.prefixes[ i ];

                if( updated_property !== '' )
                    updated_property += this.capitalize_first_letter( property );
                else
                    updated_property = property;

                css[ updated_property ] = value;
            }

            // Apply each CSS on each element
            var keys = Object.keys( css );
            for( var j = 0, j_len = $target.length; j < j_len; j++ )
            {
                var element = $target[ j ];

                for( var k = 0, k_len = keys.length; k < k_len; k++ )
                    element.style[ keys[ k ] ] = css[ keys[ k ] ];
            }
        },

        /**
         * CAPITALIZE FIRST LETTER
         */
        capitalize_first_letter : function( text )
        {
            return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
        }
    } );
} )();
