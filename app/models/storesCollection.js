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
    });

    return storesCollection;
});



