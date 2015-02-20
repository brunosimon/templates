(function()
{
    "use strict";

    App.Tools.GA_Tags = App.Core.Event_Emitter.extend(
    {
        options :
        {
            send               : true,
            parse              : true,
            parse_selector     : '.tag',
            true_link_duration : 300,
            logs               :
            {
                warnings : true,
                send     : true
            }
        },

        /**
         * SINGLETON
         */
        staticInstantiate : function()
        {
            if( App.Tools.GA_Tags.prototype.instance === null )
                return null;
            else
                return App.Tools.GA_Tags.prototype.instance;
        },

        /**
         * INIT
         */
        init : function( options )
        {
            this._super(options);

            this.tagged = [];

            if( this.options.parse )
                this.parse();

            App.Tools.GA_Tags.prototype.instance = this;
        },

        /**
         * START
         */
        parse : function()
        {
            var that     = this,
                elements = document.querySelectorAll( this.options.parse_selector );

            function click_handle( e )
            {
                // Set variables
                var element   = e.target,
                    true_link = element.getAttribute( 'data-tag-true-link' ),
                    datas     = {};

                // Set options that will be sent
                datas.category = element.getAttribute( 'data-tag-category' );
                datas.action   = element.getAttribute( 'data-tag-action' );
                datas.label    = element.getAttribute( 'data-tag-label' );
                datas.value    = element.getAttribute( 'data-tag-value' );
                datas.unique   = element.getAttribute( 'data-tag-unique' );
                datas.name     = element.getAttribute( 'data-tag-name' );

                // Send
                that.send( datas );

                // True link that should act as a normal click
                if( true_link )
                {
                    // Set variables
                    var href   = element.getAttribute( 'href' ),
                        target = element.getAttribute( 'target' );

                    // Default target
                    if( !target )
                        target = '_self';

                    // Other than _blank, need to wait
                    if( target !== '_blank' )
                    {
                        // Wait
                        window.setTimeout( function()
                        {
                            window.open( href , target );
                        }, that.options.true_link_duration );

                        // Prevent default
                        e.preventDefault();
                    }
                }
            }

            // Listen
            for( var i = 0, len = elements.length; i < len; i++ )
                elements[ i ].onclick = click_handle;
        },

        /**
         * SEND
         */
        send : function( options )
        {
            // Err
                        // Listenor
            if( typeof options !== 'object' )
            {
                // Logs
                if( this.options.logs.warnings )
                    console.warn( 'tag wrong options' );

                return false;
            }

            // Unique
            if( options.unique && options.name && this.tagged.indexOf( options.name ) !== -1 )
            {
                // Logs
                if( this.options.logs.warnings )
                    console.warn( 'tag prevent : ' + options.name );

                return false;
            }

            // Send
            if( this.options.send )
            {
                var send = [ '_trackEvent' ];

                // Category
                if( typeof options.category !== 'undefined' )
                {
                    send.push( options.category );

                    // Action
                    if( typeof options.action !== 'undefined' )
                    {
                        send.push( options.action );

                        // Label
                        if( typeof options.label !== 'undefined' )
                        {
                            send.push( options.label );

                            // Value
                            if( typeof options.value !== 'undefined' )
                            {
                                send.push( options.value );
                            }
                        }

                        // Send only if category and action set
                        if( typeof _gaq !== 'undefined' )
                        {
                            _gaq.push( send );
                        }
                        else
                        {
                            // Logs
                            if( this.options.logs.warnings )
                                console.warn( 'tag _gaq not defined' );
                        }

                        // Logs
                        if( this.options.logs.send )
                            console.log( 'tag', send );
                    }
                    else
                    {
                        // Logs
                        if( this.options.logs.warnings )
                            console.warn( 'tag missing action' );
                    }
                }
                else
                {
                    // Logs
                    if( this.options.logs.warnings )
                        console.warn( 'tag missing category' );
                }
            }

            // Save as tagged
            if( options.unique )
                this.tagged.push( options.name );
        }
    } );
} )();
