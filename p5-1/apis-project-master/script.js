var map, city, infowindow;
var Locations = [];

// Google Maps API
function initMap() {
	'use strict'
    map = new google.maps.Map(document.getElementById('map-div'), {
        center: {
            lat: 40.7,
            lng: -74
        },
        zoom: 10
    });

    infowindow = new google.maps.InfoWindow();

    var marker = new google.maps.Marker({
        map: map,
        position: {
            lat: 39.168989,
            lng: -77.268745
        },
    });

    marker.addListener('click', function() {
        alert('I live in this area!');
    });
	
    startAPP();
};

function startAPP() {
    ko.applyBindings(new ViewModel());
}

// Application ViewModel
function ViewModel() {
    var self = this;

    //list of places
    self.fourSquares = ko.observableArray([]);

    //holds map markers
    self.mapMarkers = ko.observableArray([]);

    // Places List
    //self.placesList = ko.observableArray([]);

    // filtered list
    self.filteredList = ko.observableArray([]);

    // View Toggle
    self.viewToggle = ko.observable('hide');

    // Load Status
    self.loadStatus = ko.observable('');

    //search filter
    self.searchQuery = ko.observable('');

    //
    self.filteredResults = function() {
        var input = self.searchQuery().toLowerCase();
        var list = self.fourSquares();
        if (!input) {
            return;
        } else {
            self.filteredList([]);
            for (var i = 0; i < list.length; i++) {
                if (list[i].placeName.toLowerCase().indexOf(input) != -1) {
                    self.mapMarkers()[i].marker.setMap(map);
                    self.filteredList.push(list[i]);
                } else {
                    self.mapMarkers()[i].marker.setMap(null);
                }
            }
        }
    }

    // Reset List
    self.resetList = function() {
        self.filteredList(self.fourSquares());
        self.searchQuery('');
        for (var i = 0; i < self.mapMarkers().length; i++) {
            self.mapMarkers()[i].marker.setMap(map);
        }
    }

    self.listToggle = function() {
        if (self.viewToggle() === 'hide') {
            self.viewToggle('show');
        } else {
            self.viewToggle('hide');
        }
    };

    //   Adds Marker and Info Box
    self.addMarkers = function(array) {
        $.each(array, function(index, value) {
            var latitude = value.placeLat,
                longitude = value.placeLng,
                Loc = new google.maps.LatLng(latitude, longitude),
                thisName = value.placeName;

            var infoBox = '<div>' + '<h4>' + value.placeName + '</h4>' + '<p>' + value.placeAddress + '</p>' + '<p>' + value.placeCity + ', ' + value.placeState + ' ' + value.placeZip + '</p>' + '<p>' + value.placePhone + '</p>' + '<center>' + '<img src="' + value.placeImg + '"/>' + '</center>' +
                '<br>' + '<center>' + '<p>Brought to you by, <i>FourSquares!</i></p>' + '<img class="icon-one" src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/foursquare-128.png"/>' + '</center>' + '</div>';

            var marker = new google.maps.Marker({
                position: Loc,
                title: thisName,
                animation: google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function() {
                console.log('Marker Animation');
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                setTimeout(function() {
                    marker.setAnimation(null)
                }, 1500);
            });

            self.mapMarkers.push({
                marker: marker,
                content: infoBox
            });

            // adds to location array
            Locations.push({
                name: value.placeName,
                location: {
                    lat: value.placeLat,
                    lng: value.placeLng
                },
                marker: marker,
            });

            google.maps.event.addListener(marker, 'click', function() {
                console.log('click function working');
                self.loadStatus('');
                infowindow.setContent(infoBox);
                map.setZoom(12);
                map.setCenter(marker.position);
                infowindow.open(map, marker);
                map.panBy(0, -125);
            });
        });
    };

    // when list item is clicked, go to marker on map
    self.seeMarker = function(itemClick) {
        var clickedItem = itemClick.placeName;

        for (var key in self.mapMarkers()) {
            if (clickedItem === self.mapMarkers()[key].marker.title) {
                map.panTo(self.mapMarkers()[key].marker.position);
                map.setZoom(10);
                infowindow.setContent(self.mapMarkers()[key].content);
                infowindow.open(map, self.mapMarkers()[key].marker);
                map.panBy(0, 125);
            }
        }

    };

    // AJAX Request (FourSquare API)
    self.getAPI = function() {
        var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&ll=40.7,-74&query=shopping';

        $.ajax({
            url: apiURL,
            dataType: 'json',
            success: function(data) {
                console.log('FourSquares')
                console.log(data);
                var len = data.response.venues.length;

                for (var i = 0; i < len; i++) {
                    // Parse for easy access;
                    var venue = data.response.venues[i];

                    if (venue.location.address === undefined) continue;


                    var venueName = venue.name;
                    var venueAddress = venue.location.address;
                    var venueCity = venue.location.city;
                    var venueState = venue.location.state;
                    var venueZip = venue.location.postalCode;
                    var venuePhone = venue.contact.phone;
                    var venueLat = venue.location.lat;
                    var venueLng = venue.location.lng;
                    var venueImg = 'https://maps.googleapis.com/maps/api/streetview?size=100x100&location=' + venue.location.lat + ',' + venue.location.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyBWq_bL3W2U17sffyrBJdzsxeFT445s9EU';


                    if (venueZip === undefined) {
                        venueZip = ''
                    };
                    if (venuePhone === undefined) {
                        venuePhone = ''
                    };
                    self.fourSquares.push({
                        placeName: venueName,
                        placeAddress: venueAddress,
                        placeCity: venueCity,
                        placeState: venueState,
                        placeZip: venueZip,
                        placePhone: venuePhone,
                        placeLat: venueLat,
                        placeLng: venueLng,
                        placeImg: venueImg
                    });

                }

                self.filteredList(self.fourSquares());
                //self.placesList(self.fourSquares());
                self.addMarkers(self.fourSquares());

            },
            error: function() {
                self.loadStatus('Error');
            }
        })

    }

    // Google Maps API

    function eraseMarkers() {
        $.each(self.mapMarkers, function(key, value) {
            value.marker.setMap(null);
        })
        self.mapMarkers([]);
    }

    // New York Times Articles: API AJAX Request
    self.getNews = function() {
        var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q="SoHo, New York"&sort=newest&api-key=e3b29ee6890e39977d33529ea6eaff6e:12:73463344'
        var $nytHeaderElem = $('#nytimes-header');
        var $nytElem = $('#nytimes-articles');

        $.getJSON(nytURL, function(data) {
            console.log('NY Times')
            console.log(data);

            $nytHeaderElem.append('New York Times Articles about' + '<br>' + '<i>' + 'SoHo, New York' + '</i>');

            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                $nytElem.append('<li class="article">' +
                    '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                    '<p>' + article.snippet + '</p>' + '</li>'
                );
            };



        }).error(function() {
            $nytHeaderElem.text('New York Times Could Not Be Loaded');
        })
    }

    self.getAPI();
    self.getNews();

};
