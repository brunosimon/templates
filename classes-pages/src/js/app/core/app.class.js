(function(window)
{
    'use strict';

    APP.CORE.App = APP.CORE.Abstract.extend(
    {
        options:
        {
            page_name : 'home'
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.page    = null;
            this.ticker  = new APP.TOOLS.Ticker();
            this.browser = new APP.TOOLS.Browser();
            this.css     = new APP.TOOLS.Css();
            this.scroll  = new APP.TOOLS.Scroll();
            this.header  = new APP.COMPONENTS.Header();
            this.ajax    = null;

            this.animation_over = false;
            this.content_loaded = false;
            this.content        = false;

            this.$.title     = $('head title');
            this.$.container = $('.page-container');

            this.init_events();
            this.init_page(this.options.page_name);
        },

        /**
         * START
         */
        start: function()
        {
            this.browser.start();
            this.ticker.start();
        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            // Pop state
            window.onpopstate = function(e)
            {
                // that.load(window.location); // Be Careful with this one
            };
        },

        /**
         * LOAD
         */
        load: function(url)
        {
            var that = this;

            // Abort
            if(this.ajax)
                this.ajax.abort();

            // Load
            this.ajax = $.ajax({
                url     : url,// + '?ajax=1',
                success : function(res)
                {
                    that.content        = res;
                    that.content_loaded = true;
                    that.ajax           = null;

                    that.after_load_and_animate();
                },
                error : function(err)
                {
                    console.log('error');
                    console.log(err);
                    that.content_loaded = true;
                    that.ajax           = null;

                    // that.panels.open('.not-found',false,false);
                }
            });
        },

        /**
         * AFTER LOAD AND ANIMATE
         */
        after_load_and_animate: function()
        {
            // Loading over AND animation over
            if(this.animation_over && this.content_loaded)
            {
                // Show page
                this.$.container.html(this.content);

                // Url
                if(history.pushState)
                {
                    var title = this.$.container.find('input#title').val(),
                        url   = this.$.container.find('input#url').val();

                    this.$.title.html(title);
                    history.pushState({},title,url);
                }

                // Init page
                var page_name = this.$.container.find('input#page_name').val();
                this.init_page(page_name);

                // Trigger resize
                this.browser.trigger('resize');

                // Scroll top
                TweenLite.set(window,{scrollTo:{y:0}});

                // Reset values
                this.animation_over = false;
                this.content_loaded = false;
                this.content        = null;
            }
        },

        /**
         * LISTEN TO AJAX
         */
        listen_to_ajax: function(target)
        {
            target = target || $('body');

            var that  = this,
                links = target.find('a.ajax');

            // Ajax link click
            links.off('click.ajax').on('click.ajax',function()
            {
                var $link          = $(this),
                    url            = $link.attr('href'),
                    panel_selector = $link.data('panel');

                that.panels.open(panel_selector,true,false);

                // Show panel
                window.setTimeout(function()
                {
                    that.animation_over = true;
                    that.after_load_and_animate();
                },1400);

                // Load
                that.load(url);

                return false;
            });
        },

        /**
         * INIT PAGE
         */
        init_page: function(page_name)
        {
            var that = this,
                page = null;

            // Destroy old page
            if(this.page)
                this.page.destroy();

            switch(page_name)
            {
                case 'home':
                    page = new APP.PAGES.Home();
                    this.header.$.back.css({display:'none'});
                    break;
            }

            if(page)
            {
                // Assign new page
                this.page = page;

                // Listen to 'loaded' event
                this.page.on('loaded',function(elapsed_time)
                {
                    window.setTimeout(function()
                    {
                        that.panels.close_all();
                    },elapsed_time < 300 ? 300 : 0);
                });

                // Listen to ajax
                this.listen_to_ajax();

                // Start
                this.page.start();
            }
        }
    });
})(window);
