(function()
{
    "use strict";

    APP.TOOLS.Scroll = APP.CORE.Event_Emitter.extend(
    {
        options:
        {
            classes :
            {
                anchors : 'anchor'
            }
        },

        /**
         * SINGLETON
         */
        staticInstantiate:function()
        {
            if(APP.TOOLS.Scroll.prototype.instance === null)
                return null;
            else
                return APP.TOOLS.Scroll.prototype.instance;
        },

        /**
         * INIT
         */
        init: function(options)
        {
            this._super(options);

            this.tops    = [];
            this.browser = new APP.TOOLS.Browser();
            this.$.body  = $( this.browser.is.FF ? 'html' : 'body');

            this.init_events();

            APP.TOOLS.Scroll.prototype.instance = this;
        },

        /**
         * START
         */
        start: function()
        {

        },

        /**
         * INIT EVENTS
         */
        init_events: function()
        {
            var that = this;

            this.browser.on('resize',function()
            {
                window.requestAnimationFrame(function()
                {
                    that.update_anchors();
                    that.update_tops();
                });
            });
        },

        /**
         * UPDATE ANCHORS
         */
        update_anchors: function()
        {
            this.$.anchors = $('.' + this.options.classes.anchors);
        },

        /**
         * UPDATE TOPS
         */
        update_tops: function()
        {
            var that   = this,
                offset = null;

            this.tops = [0];

            this.$.anchors.each(function()
            {
                var $anchor = $(this);

                if($anchor.is(':visible'))
                {
                    offset = $anchor.attr('data-anchor-offset') ? parseInt($anchor.attr('data-anchor-offset')) : 0;
                    that.tops.push(Math.round($anchor.offset().top + offset));
                }
            });

            that.tops.push(this.$.body.outerHeight() - this.browser.height);

            this.tops = this.tops.sort(function(a,b){return a - b;});
        },

        /**
         * GO DOWN
         */
        go_down: function(callback,duration)
        {
            var top = -1,
                i   = 0;

            duration = duration || 1;

            while(top === -1 && i < this.tops.length)
            {
                if(this.tops[i] > this.browser.top)
                    top = this.tops[i];
                i++;
            }

            if(top !== -1)
                TweenLite.to(this.$.body,duration,{scrollTo:top,ease:Power3.easeOut,onComplete:function()
                {
                    if(typeof callback === 'function')
                        callback.call();
                }});
        },

        /**
         * GO UP
         */
        go_up: function(callback,duration)
        {
            var top = -1,
                i   = 0;

            duration = duration || 1;

            i = this.tops.length - 1;

            while(top === -1 && i >= 0)
            {
                if(this.tops[i] < this.browser.top)
                    top = this.tops[i];
                i--;
            }

            if(top !== -1)
                TweenLite.to(this.$.body,duration,{scrollTo:top,ease:Power3.easeOut,onComplete:function()
                {
                    if(typeof callback === 'function')
                        callback.call();
                }});
        },

        /**
         * GO TO
         */
        go_to: function(target,callback,duration)
        {
            var top = null;

            duration = duration || 1;

            if(typeof target === 'number')
                top = target;
            else if(target.length)
                top = target.offset().top + (target.attr('data-anchor-offset') ? parseInt(target.attr('data-anchor-offset')) : 0);

            if(top !== null)
                TweenLite.to(this.$.body,duration,{scrollTo:top,ease:Power3.easeOut,onComplete:function()
                {
                    if(typeof callback === 'function')
                        callback.call();
                }});
        }
    });
})();
