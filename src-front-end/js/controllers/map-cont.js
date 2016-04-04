(function () {
    'use strict';
    var MapCont = can.Control.extend({
        init: function (element, options) {
            this.renderElement();
            google.maps.event.addDomListener(window, 'load', this.enableGoogleMaps());
            
        },

        '{observables} products': function () {
            this.setMarkers();
        },
        
        enableGoogleMaps: function () {
            var mapOptions = {
                zoom: 2,
                center: new google.maps.LatLng(0, 0)
            };

            this.options.googleMarkers = [];

            this.options.map = new google.maps.Map(document.getElementById('js-google-maps'),
                                mapOptions);

            this.options.map.setCenter(new google.maps.LatLng(-23.241346, 133.989258));

        },
        
        setMarkers: function () {
            var self = this,
                image = {
                    url: 'img/helloworld-marker.png',
                    size: new google.maps.Size(19, 23),
                    origin: new google.maps.Point(0,0),
                    anchor: new google.maps.Point(9, 11)
                },
                shape = {
                    coords: [0, 0, 0, 23, 19, 23, 19 , 0],
                    type: 'poly'
                };
            
            can.each(this.options.googleMarkers, function (val, ind) {
                val.setMap(null);
            });

            this.options.googleMarkers = [];
              

            can.each(this.options.observables.products, function (val, ind){

                var infoWindowContent = 
                '<div>' +                    
                    '<div class="gs-city">' + val.city  + '</div>' +
                    '<div class="gs-date">' + val.date + ' | ' + val.journeyType + '</div>' +
                    '<div class="gs-price">$' + val.price + '</div>' +
                    '<div class="gs-cta"><a class="btn full" href="' + val.cta + '" target="_blank">View</a></div>' +                 
                '</div>';
                var infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                    maxWidth: 250.0
                });    
                var myLatLng = new google.maps.LatLng(val.latLong[0], val.latLong[1]);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: self.options.map,
                    icon: image,
                    shape: shape,
                    title: val.city,
                    zIndex: ind,
                    animation: google.maps.Animation.DROP
                });

                self.options.googleMarkers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    infoWindow.open(self.options.map, marker);
                });
            })
            
        },
        
        renderElement: function () {
            var template = can.view(
                can.mustache(hwTemplates["../../views/map.html"]), 
                this.options.observables
            );
            this.element.html(template);
        }
    })

    window.MapCont = MapCont;
})();