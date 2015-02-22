define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/modules/stores/storeTemplate.html'
], function($, _, Backbone, template) {
    var storeView = Backbone.View.extend({
        tagName: 'li',
        className:'store-cell',

        render: function() {
            this._template = _.template(template)
            var _renderedContent = this._template(this.model.toJSON())

           return  $(this.el).html(_renderedContent);
        }
    });
    return storeView;
});
