define([
    'jquery',
    'underscore',
    'leaflet',
    'enums',
    'backbone',
    'text!templates/modules/stores.html'
], function($, _, leaflet, enums,  Backbone, template) {

    var StoresView = Backbone.View.extend({
        el: '.content',
        storeData:null,
        lat:51.511,
        long:-0.1198,
        markers:[],
        requestStoreData:function(){
            var _this = this
            console.log(enums.getInstance().webserviceURL)
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
            this.storeData = data.stores.store;
            this.initMap();
            console.log( this.storeData );
        },
        onError:function(XHR, textStatus, errorThrown){
            console.log(XHR, textStatus, errorThrown);
        },
        getQueryString : function(){
            return enums.getInstance().webserviceURL+"?brand=12556&jsonp_callback=results&lat="+this.lat+"&long=0.1275&dist=50&res=5";
        },
        initMap:function(){
            // create a map in the "map" div, set the view to a given place and zoom
            if ( !this._map ) this._map = L.map('store-map').setView([this.lat, this.long], 13);

            // add an OpenStreetMap tile layer
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this._map);

        // add a marker in the given location, attach some popup content to it and open the popup
            L.marker([51.5, -0.09]).addTo(this._map)
                .bindPopup('Your location.')
                .openPopup();
        },
        updateMap:function(){



        },
        render: function() {
            var _this = this;
            $(this.el).html(template);

            $('#store_search').on('click',function(event)
            {
               _this.requestStoreData()

            });

        }
    });

    return StoresView;
});
