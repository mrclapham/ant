define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/modules/stores.html'
], function($, _, Backbone, template) {

    var StoresView = Backbone.View.extend({
        el: '.content',
        storeData:null,
        lat:51.511,
        long:-0.1198,
        requestStoreData:function(){
            var _this = this
            console.log(this)
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
            console.log("Success ",data.stores.store)
        },
        onError:function(XHR, textStatus, errorThrown){
            console.log(XHR, textStatus, errorThrown);
        },
        getQueryString : function(){
            return "http://cloudservices.arcadiagroup.co.uk/storestock/storestock?brand=12556&jsonp_callback=results&lat="+this.lat+"&long=0.1275&dist=50&res=5"
            // return "http://cloudservices.arcadiagroup.co.uk/storestock/storestock?brand=12556&jsonp_callback=results&lat='errorme'&long=0.1275&dist=50&res=5"
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
