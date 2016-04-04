(function () {
    'use strict';
    var AppCont = can.Control.extend({
        defaults: {
            observables: new can.Map({
                origin: 'sydney',
                budget: 0,
                products: []
            })
        }
    },{
        init: function (element, options) {
            this.renderElm();            
            this.populateProduct();            
        },

        populateProduct: function () {
            new PricesCont(this.element.find('.js-prices'), {
                observables: this.options.observables  
            });

            // new OriginCont(this.element.find('.js-origin'), {
            //     observables: this.options.observables         
            // });

            new SliderCont(this.element.find('.js-slider'), {
                observables: this.options.observables      
            });

            new MapCont(this.element.find('.js-map'), {
                observables: this.options.observables         
            });
            
        },        

        renderElm: function () {
            var template = can.view(
                can.mustache(hwTemplates["../../views/app.html"]), {
                    
                }
            );
            this.element.html(template);
        }

        
    });

    window.AppCont = AppCont;
})();