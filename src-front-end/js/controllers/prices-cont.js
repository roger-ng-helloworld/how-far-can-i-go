(function () {
    'use strict';
    var PricesCont = can.Control.extend({
        defaults: {
            
        }
    },{
        init: function (element, options) {
            this.renderElm();           
        },

        '{observables} products': function () {
            this.element.velocity("fadeIn", { duration: 500 })
        },

        renderElm: function () {
            var template = can.view(
                can.mustache(hwTemplates["../../views/prices.html"]), 
                this.options.observables
            );
            this.element.html(template);
        }

        
    });

    window.PricesCont = PricesCont;
})();