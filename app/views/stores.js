define([
    'jquery',
    'underscore',
    'leaflet',
    'stamen',
    'enums',
    'backbone',
    '../models/storesCollection',
    '../views/storeView',
    'text!templates/modules/stores.html'
], function($, _, leaflet, stamen, enums,  Backbone, storesCollection, storeView, template) {

    var StoresView = Backbone.View.extend({
        el: '.content',
        initialize:function(){
            this._storesCollection = new storesCollection([], {brand:this.brand,lat:this.lat, long:this.long, dist:this.dist, res:this.res});
            _.bindAll(this, 'render')
        },
        storeData:null,
        latLongSet:false,
        latMin:-90,
        latMax:90,
        longMin:-180,
        longMax:180,
        lat:51.511,
        long:-0.1198,
        dist:50,
        res:5,
        zoom:12,
        brand:12556,
        markers:[],
        requestStoreData:function(){
            var _this = this
            this._storesCollection.reset();

            this.lat  = document.getElementById('store_lat').value
            this.long = document.getElementById('store_long').value

            $.ajax({
                type: 'GET',
                cache: false,
                url: _this.getQueryString(),
                dataType: 'jsonp',
                jsonpCallback: 'results',
                success: function(data){
                  _this.onSuccess(data)
                },
                error: function(XHR, textStatus, errorThrown) {
                   _this.onError(XHR, textStatus, errorThrown);
                }
            });
        },

        onSuccess:function(data){
            var _this = this;

            this._storesCollection.reset();
            _.forEach(data.stores.store, function(d){
                _this._storesCollection.push(d)
            })

            this.render();
        },
        onError:function(XHR, textStatus, errorThrown){
            console.log(XHR, textStatus, errorThrown);
        },
        getQueryString : function(){
            return enums.getInstance().webserviceURL+"?brand=12556&jsonp_callback=results&lat="+this.lat+"&long="+this.long+"&dist="+this.dist+"&res=5";
        },
        initGeoLocation:function(){
            var _this = this
            if (navigator.geolocation) {
                var timeoutVal = 10000; // keep it shortish
                // Fail silently - they don't need to know ou can't get the geolocation data
                var displayPosition = function(position) {
                    // I'm only going to set this once - when first entering
                    _this.latLongSet = true
                    _this.setLocation({lat:position.coords.latitude, lng:position.coords.longitude })
                }
                var displayGeoError = function(error) {
                    var errors = {
                        1: 'Permission denied',
                        2: 'Position unavailable',
                        3: 'Request timeout'
                    };
                    console.log("Error: " + errors[error.code]);
                }
                navigator.geolocation.getCurrentPosition(
                    displayPosition,
                    displayGeoError,
                    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
                );
            }
            else {
                console.log("Geolocation is not supported by this browser");
            }
        },
        initMap:function(){

           !this.latLongSet ? this.initGeoLocation() : console.log("geolocation set already.")
            // create a map in the "map" div, set the view to a given place and zoom
            if ( this._map ) delete this._map;

            this._map = L.map('store-map')
            this.updateMap()
        },
        updateMap:function(){
            var _this = this;

            var locationIcon = L.icon({
                iconUrl: '../img/yoarehere.png',
                iconSize: [22, 40],
                iconAnchor: [22, 40],
                popupAnchor: [-10, -40]
            });

            this._map.setView([this.lat, this.long], this.zoom);
            // The bog standard OSM tiles - if I need to fall back - otherwise use the Toner theme
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this._map);

               // This will make it look cool and high contrast - but there are some issues with the js loadinhg from their cdn
            /*
            var tonerLayer = new L.StamenTileLayer("toner");
            this._map.addLayer(tonerLayer);
            */

            //  add markers for all the Top Shops

            this._storesCollection.each(function(d){
                L.marker([d.attributes.latitude, d.attributes.longitude]).addTo(_this._map)
                    .bindPopup(d.attributes.storeName)
                    .openPopup();
            })

            // Then add a marker in the given location, attach some popup content to it and open the popup
            this.location = L.marker([this.lat, this.long], {draggable:true, icon:locationIcon}).addTo(this._map)
                .bindPopup('Your location.')
                .openPopup();

            this.location.on('dragend', function(e) {
                //alert(_this.location.getLatLng());
                _this.setLocation(_this.location.getLatLng())
            });
        },
        setLocation:function(latlang){

            console.log(latlang)
            this.lat  = latlang.lat;
            this.long = latlang.lng;

            document.getElementById('store_lat').value = this.lat;
            document.getElementById('store_long').value = this.long;

            this.location.setLatLng([this.lat, this.long]);
            this._map.setView([this.lat, this.long]);

        },

        render: function() {
            var _this = this;
            $(this.el).html(template);
            this.lat  = document.getElementById('store_lat').value = this.lat;
            this.long = document.getElementById('store_long').value = this.long;
            this._storeList = $('#stores-list');
            this._storesCollection.each(function(store){
                var sv = new storeView({model: store, collection:_this._storesCollection })
                _this._storeList.append( sv.render() );
            })

            //this._map  ? _this.updateMap() : this.initMap() ;

            this.initMap();

            $('#store_search').on('click',function(event)
            {
               _this.requestStoreData()

            });
        }
    });

    return StoresView;
});
