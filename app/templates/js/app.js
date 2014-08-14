var app = (function() {

    'use strict';
    var privateVariable = 'App fired!',
        docElem = document.documentElement;

    return {
        publicFunction: function() {
            console.log(privateVariable);
        },
        userAgentInit: function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        }
    };

})();

(function($) {

    'use strict';

    //foundation init
    $(document).foundation();

    // Some examples
    app.publicFunction();
    app.userAgentInit();

})(jQuery);
