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
        initMap:function(){
            // create a map in the "map" div, set the view to a given place and zoom

            if ( this._map ) delete this._map;

                this._map = L.map('store-map')
            this.updateMap()
        },
        updateMap:function(){
            var _this = this;

            var locationIcon = L.icon({
                iconUrl: '../img/yoarehere.png',
//                iconRetinaUrl: 'my-icon@2x.png',
                iconSize: [22, 40],
                iconAnchor: [22, 40],
                popupAnchor: [-10, -40]
//                shadowUrl: 'my-icon-shadow.png',
//                shadowRetinaUrl: 'my-icon-shadow@2x.png',
//                shadowSize: [68, 95],
//                shadowAnchor: [22, 94]
            });


            this._map.setView([this.lat, this.long], 13);
            // add an OpenStreetMap tile layer - give them their credit.
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this._map);

            // add a marker in the given location, attach some popup content to it and open the popup
            L.marker([this.lat, this.long], {draggable:true, icon:locationIcon}).addTo(this._map)
                .bindPopup('Your location.')
                .openPopup();
            // Then add markers for all the Top Shops

            this._storesCollection.each(function(d){
                console.log(d.attributes.latitude, d.attributes.longitude)
                L.marker([d.attributes.latitude, d.attributes.longitude]).addTo(_this._map)
                    .bindPopup(d.attributes.storeName)
                    .openPopup();
            })


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
