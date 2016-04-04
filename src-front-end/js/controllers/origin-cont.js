(function () {
    'use strict';
    var OriginCont = can.Control.extend({
        defaults: {
            
        }
    },{
        init: function (element, options) {
            this.renderElm();           
        },        

        renderElm: function () {
            var template = can.view(
                can.mustache(hwTemplates["../../views/origin.html"]), 
                this.options.observables
            );
            this.element.html(template);
        }

        
    });

    window.OriginCont = OriginCont;
})();