can.fixture('POST http://innovation-day-lachlan.cloudapp.net/home/findall', function (data) {
    var db = [
        {
            city: 'Melbourne',
            date: '26 Sep 2015',
            journeyType: 'Round trip',
            price: 200,
            latLong: [-37.814107, 144.963280],
            cta: 'http://helloworld.com.au',
            img: 'http://www.minimovers.com.au/wp/wp-content/uploads/2014/02/removalists-sydney-city-minimovers.jpg'
        },
        {
            city: 'Brisbane',
            date: '27 Sep 2015',
            journeyType: 'Round trip',
            price: 300,
            latLong: [-27.471011, 153.023449],
            cta: 'http://helloworld.com.au',
            img: 'http://www.visionandimagination.com/Places/Wellington-Point-Brisbane/i-TPM3sp7/0/S/IMG_3301%20Brisbane_-S.jpg'
        },
        {
            city: 'Perth',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 500,
            latLong: [-31.953513, 115.857047],
            cta: 'http://helloworld.com.au',
            img: 'http://cdn.lifestyle.com.au/cache/400x200/factsheets/thumbnails/TRAVEL-Perth-Skyline-Swan-river.jpg'
        },
        {
            city: 'Kuala Lumpur',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 900,
            latLong: [3.139003, 101.686855],
            cta: 'http://helloworld.com.au',
            img: 'http://www.grandseasonshotel.com/pics/places2.jpg'
        },
        {
            city: 'Abu Dhabi',
            date: '28 Sep 2015',
            journeyType: 'One way',
            price: 1900,
            latLong: [24.299174, 54.697277],
            cta: 'http://helloworld.com.au',
            img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRNOGvJW_LSb7ruLoIB0qh0n9OvCr_71dpa46PMH1BCCtwGxhdbmQ'
        },
        {
            city: 'Munich',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 3000,
            latLong: [48.135125, 11.581981],
            cta: 'http://helloworld.com.au',
            img: 'https://www.explorica.com/~/media/Images/Tour%20Pictures/destinations/bpm.ashx'
        },
        {
            city: 'London',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 4500,
            latLong: [51.507351, -0.127758],
            cta: 'http://helloworld.com.au',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tower_Bridge_London_Feb_2006.jpg/400px-Tower_Bridge_London_Feb_2006.jpg'
        },
        {
            city: 'New York',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 6500,
            latLong: [40.712784, -74.005941],
            cta: 'http://helloworld.com.au',
            img: 'http://thumbs.dreamstime.com/x/new-york-harbor-twin-towers-1138773.jpg'
        },
        {
            city: 'Chicago',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 7000,
            latLong: [41.878114, -87.629798],
            cta: 'http://helloworld.com.au',
            img: 'http://adcstatic.com/imagenes/destinos/c/renta-autos-chicago.jpg'
        },
        {
            city: 'San Francisco',
            date: '28 Sep 2015',
            journeyType: 'Round trip',
            price: 7800,
            latLong: [37.774929, -122.419416],
            cta: 'http://helloworld.com.au',
            img: 'http://i0.wp.com/www.headforpoints.com/wp-content/uploads/2014/10/San-Francisco.jpg?resize=400%2C200'
        }
    ],

    rightPrices = [];

    can.each(db, function (val) {
        if (val.price <= data.data.budget) {
            rightPrices.push(val);
        }
    });

    return rightPrices;
});

(function () {
    'use strict';
    var SliderCont = can.Control.extend({
        init: function (element, options) {
            this.renderElm();            
            this.insertSlider();            
        },

        insertSlider: function () {
            var self = this,
                slider = document.getElementById('js-slider');
            
            noUiSlider.create(slider, {
                start: 0,
                animate: false,
                range: {
                    min: 0,
                    max: 8000
                }
            });

            slider.noUiSlider.on('update', function(a, b, c){
                self.options.observables.attr('budget', Math.round(c));
            });

            slider.noUiSlider.on('change', function(a, b, c){
                self.getList();
            });             
        },

        getList: function () {
            var self = this;
            can.ajax({
                data: {
                    origin: this.options.observables.attr('origin'),
                    budget: this.options.observables.attr('budget')
                },
                type: 'POST',
                url: 'http://innovation-day-lachlan.cloudapp.net/home/findall',
                success: function (data) {
                    self.options.observables.attr('products', data.reverse()); 
                }
            });
        },        

        renderElm: function () {
            var template = can.view(
                can.mustache(hwTemplates["../../views/slider.html"]), 
                this.options.observables
            );
            this.element.html(template);
        }

        
    });

    window.SliderCont = SliderCont;
})();