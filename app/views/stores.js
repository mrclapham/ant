define([
    'jquery',
    'underscore',
    'leaflet',
    'enums',
    'backbone',
    '../models/storesCollection',
    '../views/storeView',
    'text!templates/modules/stores.html'
], function($, _, leaflet, enums,  Backbone, storesCollection, storeView, template) {

    var StoresView = Backbone.View.extend({
        el: '.content',
        initialize:function(){
            this._storesCollection = new storesCollection([], {brand:this.brand,lat:this.lat, long:this.long, dist:this.dist, res:this.res});
            _.bindAll(this, 'render')
        },
        storeData:null,
        latMin:-90,
        latMax:90,
        longMin:-180,
        longMax:180,
        lat:51.511,
        long:-0.1198,
        dist:50,
        res:5,
        brand:12556,
        markers:[],
        requestStoreData:function(){
            var _this = this

            this.lat  = document.getElementById('store_lat').value
            this.long = document.getElementById('store_long').value

            console.log("LATTITUDE ",this.lat)

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

            //this.storeData = data.stores.store;

            this._storesCollection.reset();
            _.forEach(data.stores.store, function(d){
                _this._storesCollection.push(d)
            })

            console.log( this._storesCollection );
            this.render();
        },
        onError:function(XHR, textStatus, errorThrown){
            console.log(XHR, textStatus, errorThrown);
        },
        getQueryString : function(){
            return enums.getInstance().webserviceURL+"?brand=12556&jsonp_callback=results&lat="+this.lat+"&long="+this.long+"&dist="+this.dist+"&res=5";
        },
        initMap:function(){
            // create a map in the "map" div, set the view to a given place and zoom
           // if ( !this._map )
                this._map = L.map('store-map').setView([this.lat, this.long], 13);

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
            //TODO:
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

            setTimeout(function(){_this.initMap()}, 2000)

            $('#store_search').on('click',function(event)
            {
               _this.requestStoreData()

            });
        }
    });

    return StoresView;
});
