(function(window)
{
    "use strict";

    APP.PAGES.Page = APP.CORE.Event_Emitter.extend(
    {
        init: function(options)
        {
            this._super(options);

            this.name = 'default';
        }
    });
})(window);
