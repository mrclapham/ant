define([
    'lodash',
    'backbone',
    '../models/storeModel',
    'enums'
], function(_, Backbone, storeModel, enums) {

    var storesCollection = Backbone.Collection.extend({
        model : storeModel,
        initialize : function(models, options) {
            //this.options = options;
        },
        url : function() {
            return enums.getInstance().webserviceURL;
        }
//        parse : function(data) {
//            // Stores are in a 'results' array, not at
//            console.log(data)
//            return data.results;
//        },
//        sync: function (method, model, options) {
//            options.timeout = 10000; // required, or the application won't pick up on 404 responses
//            options.dataType = 'jsonp';
//            options.jsonpCallback = 'results';
//            options.cache = 'true';
//            return Backbone.sync(method, model, options);
//        }
    });

//    var TweetsView = Backbone.View.extend({
//        tagName : "ul",
//        className : "tweets",
//        render : function() {
//
//            // for each tweet, create a view and prepend it to the list.
//            this.collection.each(function(tweet) {
//                var tweetView = new TweetView({ model : tweet });
//                $(this.el).prepend(tweetView.render().el);
//            }, this);
//
//            return this;
//        }
//    });

    return storesCollection;
});



