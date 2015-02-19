define([
    'jquery',
    'lodash',
    'backbone',
    'vm',
    'events',
    'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate) {
    // The dependencies were declared in the wrong order

    var AppView = Backbone.View.extend({
        el: '.container',
        initialize: function() {

        },
        render: function() {

            var that = this;

            $(this.el).html(layoutTemplate);

        }
    });

    return AppView;


});
